import {StackValue} from "../src/stack";
import {opEq} from "../src/opcodes";
import {Assembler} from "../src/assembler";

describe("Assembler", () => {
    let assembler: Assembler;
    beforeEach(() => {
        assembler = new Assembler(5);
    });

    it("test 1", () => {
        const code = `
            int 1
            int 1
            ==
        `;
        assembler.assemble(code);
    });

});
