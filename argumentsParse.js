"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function parseArgs(input, output, data) {
    if ((input == undefined) || (input.length == 0)) {
        console.error('Error: Input (-i) is missed.');
        process.exit(-1);
    }
    if ((data == undefined) || (data.length == 0)) {
        console.error('Error: Data (-d) is missed.');
        process.exit(-2);
    }
    if (input.length == 1) { // it's file, mask or dir?
        if (!fs.existsSync(input[0])) { // if it's dir or file does it even exist?
            if (input[0].startsWith('*')) { // maybe it's mask?
            }
            else {
                console.error('Error: Input is not valid.');
                process.exit(-3);
            }
        }
    }
    else {
        // it's file
    }
    // if ((output == undefined) || (output.length == 0)) {
    //     let lengthElement;
    //     if (input.length >= data.length) {
    //         lengthElement = input;
    //     }
    //     else {
    //         lengthElement = data;
    //     }
    //     output = input.map(el => {
    //         return el.concat('.test'); // TODO: change extension
    //     })
    //     console.log('You don\'t specify output names. Output files will have these names: ' + output);
    // }
    // if (output.length < input.length) {
    //     console.error('Error: You must pass as many or more outputs as there are inputs.');
    //     process.exit(-3);
    // }
    // if (output.length < data.length) {
    //     console.error('Error: You must pass as many or more outputs as there are data.');
    //     process.exit(-4);
    // }
}
exports.parseArgs = parseArgs;
//# sourceMappingURL=argumentsParse.js.map