import {StackType, TxnField, TxnFieldSpec} from "./types";

const NewTxnFieldSpec = (field: TxnField, ftype: StackType, version: number, itxVersion: number, effects: boolean): TxnFieldSpec => {
    return {
        field,
        ftype,
        version,
        itxVersion,
        effects,
    }
}

export const txnFieldSpecs: TxnFieldSpec[] = [
    NewTxnFieldSpec(TxnField.Sender, StackType.StackBytes, 0, 5, false),
    NewTxnFieldSpec(TxnField.Fee, StackType.StackUint64, 0, 5, false),
    NewTxnFieldSpec(TxnField.FirstValid, StackType.StackUint64, 0, 5, false),
];