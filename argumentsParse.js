"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const glob = require("glob");
function parseArgs(input, output, data) {
    //do we have an input?
    if ((input == undefined) || (input.length == 0)) {
        console.error('Error: Input (-i) is missed.');
        process.exit(-1);
    }
    // do we have a data?
    if ((data == undefined) || (data.length == 0)) {
        console.error('Error: Data (-d) is missed.');
        process.exit(-2);
    }
    console.log('initial args: ' + [...arguments]);
    input = expandArgs(input);
    console.log('expanded input: ' + input);
    if (output != undefined && output.length != 0) {
        output = expandArgs(output);
        console.log('expanded output: ' + input);
    }
    data = expandArgs(data);
    console.log('expanded data: ' + input);
    return { input: input, output: output, data: data };
}
exports.parseArgs = parseArgs;
;
function expandArgs(args) {
    let typeCheck;
    args.forEach(arg => {
        if (fs.existsSync(arg)) {
            if (fs.lstatSync(arg).isFile()) {
                if (typeCheck == undefined) {
                    typeCheck = 'file';
                }
                else if (typeCheck != 'file') {
                    console.log('Error');
                    process.exit(-3);
                }
                console.log('it is file');
                console.log('file: ' + arg);
                return fileParse(arg);
                let w = 2;
            }
            else if (fs.lstatSync(arg).isDirectory()) {
                if (typeCheck == undefined) {
                    typeCheck = 'directory';
                }
                else if (typeCheck != 'directory') {
                    console.log('Error');
                    process.exit(-4);
                }
                console.log('it is a directory');
                console.log('dir: ' + arg);
                dirParse(arg);
            }
        }
        else if (arg.endsWith('*.ext') || glob.sync(arg, { nodir: true }).length != 0) {
            if (typeCheck == undefined) {
                typeCheck = 'mask';
            }
            else if (typeCheck != 'mask') {
                console.log('Error');
                process.exit(-5);
            }
            console.log(glob.sync(arg, { nodir: true }));
            //return 3; // mask
        }
        else {
            if (typeCheck == undefined) {
                typeCheck = 'string';
            }
            else if (typeCheck != 'string') {
                console.log('Error');
                process.exit(-6);
            }
            console.log('it is a string');
            console.log('string: ' + arg);
            //return 4; // string
        }
    });
    return args;
}
function fileParse(file) {
    return fs.readFileSync(file).toString();
}
function dirParse(dir) {
    return glob.sync(dir).forEach(file => {
        fileParse(file);
    });
}
function maskParse(file) {
}
//# sourceMappingURL=argumentsParse.js.map