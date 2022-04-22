export enum StackType {
    // StackNone in an OpSpec shows that the op pops or yields nothing
    StackNone,

    // StackAny in an OpSpec shows that the op pops or yield any type
    StackAny,

    // StackUint64 in an OpSpec shows that the op pops or yields a uint64
    StackUint64,

    // StackBytes in an OpSpec shows that the op pops or yields a []byte
    StackBytes,
}

export class StackValue {
    private _uint: number;
    private _bytes: Buffer;

    argType = (): StackType => {
        if (this._bytes != undefined) {
            return StackType.StackBytes;
        }
        
        return StackType.StackUint64;
    }

    typeName = (): string => {
        if (this._bytes != undefined) {
            return "[]byte";
        }

        return "uint64";
    }

    public get uint() {
        if (this._bytes != undefined) {
            throw Error("StackValue is not uint64");
        }

        return this._uint;
    }

    public set uint(value: number) {
        this._uint = value;
    }
    
    public get bytes() {
        return this._bytes;
    }

    public set bytes(value: Buffer) {
        this._bytes = value;
    }
}

