import {StackType, StackValue} from "../src/stack";
import {EvalContext} from "../src/types";
import {opEq} from "../src/opcodes";

describe("Opcodes", () => {
    let ctx: EvalContext;
    beforeEach(() => {
        ctx = {
            stack: [],
            callstack: []
        }
    });

    describe("opEq", () => {
        it("same uint", () => {
            const sv1 = new StackValue();
            sv1.uint = 10;
            
            const sv2 = new StackValue();
            sv2.uint = 10;
            
            ctx.stack.push(sv1);
            ctx.stack.push(sv2);

            opEq(ctx);
            
            expect(ctx.stack.length).toEqual(1);
            expect(ctx.stack[0].uint).toEqual(1);
        });
        it("different uint", () => {
            const sv1 = new StackValue();
            sv1.uint = 1;
            
            const sv2 = new StackValue();
            sv2.uint = 10;
            
            ctx.stack.push(sv1);
            ctx.stack.push(sv2);

            opEq(ctx);
            
            expect(ctx.stack.length).toEqual(1);
            expect(ctx.stack[0].uint).toEqual(0);
        });

        it("same bytes", () => {
            const sv1 = new StackValue();
            sv1.bytes = Buffer.from('deadbeef', 'hex');

            const sv2 = new StackValue();
            sv2.bytes = Buffer.from('deadbeef', 'hex');

            ctx.stack.push(sv1);
            ctx.stack.push(sv2);

            opEq(ctx);

            expect(ctx.stack.length).toEqual(1);
            expect(ctx.stack[0].uint).toEqual(1);
        });
        it("different bytes", () => {
            const sv1 = new StackValue();
            sv1.bytes = Buffer.from('deadbeef', 'hex');

            const sv2 = new StackValue();
            sv2.bytes = Buffer.from('deadbeea', 'hex');

            ctx.stack.push(sv1);
            ctx.stack.push(sv2);

            opEq(ctx);

            expect(ctx.stack.length).toEqual(1);
            expect(ctx.stack[0].uint).toEqual(0);
        });
        it("different data types", () => {
            const sv1 = new StackValue();
            sv1.uint = 1;

            const sv2 = new StackValue();
            sv2.bytes = Buffer.from('deadbeea', 'hex');

            ctx.stack.push(sv1);
            ctx.stack.push(sv2);

            expect(() => opEq(ctx)).toThrow('cannot compare (uint64 to []byte)');
        });
    });
    
});
