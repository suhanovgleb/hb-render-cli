"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const glob = require("glob");
function parseArgs(input, output, data) {
    // let inputik = input.slice();
    // inputik[0] = 'blah-blah';
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
        output = expandArgs(output, true);
        console.log('expanded output: ' + output);
    }
    data = expandArgs(data);
    console.log('expanded data: ' + data);
    if (input.length != data.length) {
    }
    else {
        if (output.length < input.length) {
        }
    }
}
exports.parseArgs = parseArgs;
;
function expandArgs(args, isOutput = false) {
    let typeCheck;
    if (isOutput) {
        for (let i = 0; i < args.length; i++) {
            let arg = args[i];
            if (arg.startsWith('\'')) {
                if (typeCheck == undefined) {
                    typeCheck = 'string';
                }
                else if (typeCheck != 'string') {
                    console.error('Error, all arguments must be of the same type.');
                    process.exit(-6);
                }
                console.log('it is a string');
                console.log('string: ' + arg);
                args[i] = arg;
            }
            else if (arg.includes('/')) {
                if (fs.existsSync(arg) && fs.lstatSync(arg).isDirectory()) {
                    if (typeCheck == undefined) {
                        typeCheck = 'directory';
                    }
                    else if (typeCheck != 'directory') {
                        console.error('Error, all arguments must be of the same type.');
                        process.exit(-4);
                    }
                    console.log('it is a directory');
                    //console.log('dir: ' + arg);
                    args = dirParse(arg);
                    return args;
                }
                else {
                    console.error('cant find dir');
                    process.exit(-1);
                }
            }
            else if (arg.includes('*')) {
                if (glob.sync(arg, { nodir: true }).length != 0) {
                    if (typeCheck == undefined) {
                        typeCheck = 'mask';
                    }
                    else if (typeCheck != 'mask') {
                        console.error('Error, all arguments must be of the same type.');
                        process.exit(-5);
                    }
                    console.log('its mask');
                    args = maskParse(arg);
                    return args;
                }
                else {
                    console.error('Error, nothing was found by mask.');
                    process.exit(-8);
                }
            }
            else if (arg.includes('.') && fs.existsSync(arg)) {
                if (fs.lstatSync(arg).isFile()) {
                    if (typeCheck == undefined) {
                        typeCheck = 'file';
                    }
                    else if (typeCheck != 'file') {
                        console.error('Error, all arguments must be of the same type.');
                        process.exit(-3);
                    }
                    console.log('it is file');
                    console.log('file: ' + arg);
                    args[i] = fileParse(arg);
                }
                else {
                    console.error('file not found');
                    process.exit(-1);
                }
            }
            else {
                console.error('file not found');
                process.exit(-1);
            }
        }
    }
    else { // TODO: change output logic
        for (let i = 0; i < args.length; i++) {
            let arg = args[i];
            if (arg.includes('/')) {
                if (fs.existsSync(arg) && fs.lstatSync(arg).isDirectory()) {
                    if (typeCheck == undefined) {
                        typeCheck = 'directory';
                    }
                    else if (typeCheck != 'directory') {
                        console.error('Error, all arguments must be of the same type.');
                        process.exit(-4);
                    }
                    console.log('it is a directory');
                    //console.log('dir: ' + arg);
                    args = dirParse(arg);
                    return args;
                }
                else {
                    console.error('cant find dir');
                    process.exit(-1);
                }
            }
            else if (arg.includes('.') && fs.existsSync(arg)) {
                if (fs.lstatSync(arg).isFile()) {
                    if (typeCheck == undefined) {
                        typeCheck = 'file';
                    }
                    else if (typeCheck != 'file') {
                        console.error('Error, all arguments must be of the same type.');
                        process.exit(-3);
                    }
                    console.log('it is file');
                    console.log('file: ' + arg);
                    args[i] = fileParse(arg);
                }
                else {
                    console.error('file not found');
                    process.exit(-1);
                }
            }
            else {
                console.error('file not found');
                process.exit(-1);
            }
        }
    }
    //     if (fs.existsSync(arg)) {
    //         if (fs.lstatSync(arg).isFile()) {
    //             if (typeCheck == undefined) {
    //                 typeCheck = 'file';
    //             }
    //             else if (typeCheck != 'file') {
    //                 console.log('Error');
    //                 process.exit(-3);
    //             }
    //             console.log('it is file');
    //             console.log('file: ' + arg);
    //             args[i] = fileParse(arg);
    //         }
    //         else if (fs.lstatSync(arg).isDirectory()) {
    //             if (typeCheck == undefined) {
    //                 typeCheck = 'directory';
    //             }
    //             else if (typeCheck != 'directory') {
    //                 console.log('Error');
    //                 process.exit(-4);
    //             }
    //             console.log('it is a directory');
    //             console.log('dir: ' + arg);
    //             args = dirParse(arg);
    //             return;
    //         }
    //     }
    //     else if (arg.endsWith('*.ext')) {
    //         if (glob.sync(arg, { nodir: true }).length != 0) {
    //             if (typeCheck == undefined) {
    //                 typeCheck = 'mask';
    //             }
    //             else if (typeCheck != 'mask') {
    //                 console.log('Error');
    //                 process.exit(-5);
    //             }
    //             args = maskParse(arg);
    //             return;
    //             // console.log(glob.sync(arg, { nodir: true }));
    //         }
    //         else {
    //             console.log('Error');
    //             process.exit(-8);
    //         }
    //     }
    //     else if (arg.startsWith('\'')) {
    //         if (typeCheck == undefined) {
    //             typeCheck = 'string';
    //         }
    //         else if (typeCheck != 'string') {
    //             console.log('Error');
    //             process.exit(-6);
    //         }
    //         console.log('it is a string');
    //         console.log('string: ' + arg);
    //         args[i] = arg;
    //     }
    //     else {
    //         console.log('file name is valid, but not found');
    //     }
    // }
    return args;
}
function fileParse(file) {
    return fs.readFileSync(file).toString();
}
function dirParse(dir) {
    dir = fs.realpathSync(dir);
    console.log(dir);
    let args = fs.readdirSync(dir);
    for (let i = 0; i < args.length; i++) {
        args[i] = dir + '\\' + args[i];
    }
    if (args.length != 0) {
        args = args.filter(el => {
            if (fs.lstatSync(el).isFile()) {
                return el;
            }
        });
        console.log(args);
        for (let i = 0; i < args.length; i++) {
            args[i] = fs.readFileSync(args[i]).toString();
        }
    }
    else {
        console.error('Error: chosen directory doesnt contains any files');
    }
    //console.log(fs.readdirSync(dir));
    console.log(args);
    return args;
}
function maskParse(mask) {
    let args = glob.sync(mask, { nodir: true });
    console.log(args);
    for (let i = 0; i < args.length; i++) {
        args[i] = fileParse(args[i]);
        console.log(args[i]);
    }
    return args;
}
//function dirParse(dir: string): string[] { 
//     // // let args: string[] = fs.readdirSync(dir).filter(el => {
//     // //     if (fs.lstatSync(dir + '/' + el).isFile()) {
//     // //         console.log(dir + '/' + el);
//     // //         return dir + '/' + el;
//     // //     }
//     // // });
//     // // for (let i = 0; i < args.length; i++) {
//     // //     args[i] = fileParse(args[i]);
//     // // }
//     // let realPath = fs.realpathSync(dir); //problem /notes!!!!!!
//     // console.log('realpath' + realPath);
//     // if (fs.existsSync(dir)) {
//     //     //console.log(fs.lstatSync(dir));
//     // }
//     // let args: string[] = fs.readdirSync(dir).filter(el => {
//     //     if (fs.lstatSync(el).isFile)
//     //     {
//     //         return el;
//     //     }
//     // }).map(file => {
//     //     return path.format({
//     //         dir: realPath, // problem still here
//     //         base: file
//     //     });
//     // });
//     // console.log(args);
//     // for (let i = 0; i < args.length; i++) {
//     //     console.log('LOOKATME!!! '+args[i]);
//     //     args[i] = fileParse(args[i]);
//     // }
//     return args;
// }
//# sourceMappingURL=argumentsParse.js.map