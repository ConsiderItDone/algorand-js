import {opcodesByName} from "./opcodes";
import {OpSpec} from "./types";

export class Assembler {
    private version: number;
    private sourceLine: number;
    
    constructor(version: number) {
        this.version = version;
    }
    
    public assemble (data: string)  {
        this.sourceLine = 0;
        
        const lines = data.split('\n');
        for (let line of lines) {
            this.sourceLine++;
            
            line = line.trim();
            if (line.length == 0) {
                continue;
            }
            
            // console.log(`line: ${this.sourceLine} - ${line}`);

            const fields = this.fieldsFromLine(line);
            // console.log(fields);
            if (fields.length == 0) {
                continue;
            }
            
            const opStr = fields[0];
            // console.log(opStr);

            let spec: OpSpec;
            if (opcodesByName.has(opStr)) {
                spec = opcodesByName.get(opStr);
            } else {
                
            }

        }
    }

    private fieldsFromLine(line: string): string[] {
        const isSpace = (elem: string) => elem == '\t' || elem == ' ';
        
        const fields: string[] = [];
        
        let i;
        for (i=0; i<line.length && isSpace(line[i]); i++) {
            // nop
        }
        
        let start = i;
        let inString = false;
        let inBase64 = false;
        
        for (; i<line.length;) {
            const elem = line[i];
            if (!isSpace(elem)) {
                // is a string literal?
                if (elem == '"') {
                    if (!inString) {
                        if (i == 0 || i > 0 && isSpace(line[i-1])) {
                            inString = true
                        }
                    } else {
                        // if not escape symbol
                        if (line[i-1] != '\\') { 
                            inString = false
                        }
                    }
                }
                // is a comment?
                else if (elem == '/') {
                    
                }


                i++
                continue;
            }

            if (!inString) {
                const field = line.slice(start, i);
                fields.push(field);
                // if field == "base64" || field == "b64" {
                //     inBase64 = true
                // } else if inBase64 {
                //     inBase64 = false
                // }
            }
            i++

            if (!inString) {
                for (;i < line.length && isSpace(line[i]); i++) {
                    // nop
                }
                start = i
            }
        }

        // add rest of the string if any
        if (start < line.length) {
            fields.push(line.slice(start, i));
        }

        return fields
        
    }
}
