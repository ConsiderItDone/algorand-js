// ImmKind describes the immediate arguments to an opcode
import {AssembleFunc, EvalContext, OpEvalFunc, OpSpec, TxnField, TxnFieldSpec} from "./types";
import {StackType, StackValue} from "./stack";
import {Assembler} from "./assembler";

enum ImmKind {
    immByte,
    immLabel,
    immInt,
    immBytes,
    immInts,
    // "ss" not a typo.  Multiple "bytes"
    immBytess,
}

type Immediate = {
    name: string
    kind: ImmKind
};

export const opEq = (ctx: EvalContext) => {
    const lastIndex = ctx.stack.length - 1;
    const prevIndex = lastIndex - 1;
    
    const last: StackValue = ctx.stack[lastIndex];
    const prev: StackValue = ctx.stack[prevIndex];
    
    const lastArg = last.argType();
    const prevArg = prev.argType();
    
    if (lastArg != prevArg) {
        throw Error(`cannot compare (${prev.typeName()} to ${last.typeName()})`);
    }
    
    let result: boolean;
    if (lastArg == StackType.StackBytes) {
        const compare = last.bytes.compare(prev.bytes);
        result = (compare == 0);
    } else {
        result = last.uint == prev.uint;
    }
    
    ctx.stack.pop();
    ctx.stack[ctx.stack.length - 1].uint = (result ? 1 : 0);
    ctx.stack[ctx.stack.length - 1].bytes = null;
}

const NewOpSpec = (opcode: Buffer, name: string, op: OpEvalFunc, asm: AssembleFunc): OpSpec => {
    return {
        opcode,
        name,
        op,
        asm,
    }
}

const assembleInt = (stream: Assembler, opSpec: OpSpec, args: string[]): void => {
    if (args.length != 1) {
        throw Error("zzz")
    }
}

export const opcodesByName: Map<string, OpSpec> = new Map<string, OpSpec>();
opcodesByName.set("==", NewOpSpec(Buffer.from("0x12", "hex"), "==", opEq, null));

export const keywords: Map<string, OpSpec> = new Map<string, OpSpec>();
keywords.set("int", NewOpSpec(Buffer.from("0"), "int", null, null))
