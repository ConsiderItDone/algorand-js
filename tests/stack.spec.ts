import {StackType, StackValue} from "../src/stack";

describe("Stack Value", () => {
    let sv: StackValue;
    beforeEach(() => {
        sv = new StackValue();
    });
    
    describe("ArgType", () => {
        it("empty StackValue", () => {
            expect(sv.argType()).toEqual(StackType.StackUint64);
        });
        it("empty string", async () => {
            sv.bytes = Buffer.from("");
            expect(sv.argType()).toEqual(StackType.StackBytes);
        });
        it("empty string and int", async () => {
            sv.bytes = Buffer.from("");
            sv.uint = 1;
            expect(sv.argType()).toEqual(StackType.StackBytes);
        });
        it("bytes null", async () => {
            sv.bytes = null;
            expect(sv.argType()).toEqual(StackType.StackUint64);
        });
    });

   
    it("get uint for bytes", async () => {
        sv.bytes = Buffer.from("deadbeef", "hex");
        
        expect(() => sv.uint).toThrow('StackValue is not uint64');
    });
});
