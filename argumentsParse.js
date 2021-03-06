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
    const inputRaw = input.slice(0);
    const outputRaw = output.slice(0);
    const dataRaw = data.slice(0);
    //console.log('initial args: ' + [...arguments]);
    input = expandArgs(input);
    //console.log('expanded input: ' + input);
    data = expandArgs(data);
    //console.log('expanded data: ' + data);
    if (output == undefined || output.length == 0) {
        if (input.length == 1) {
            if (data.length == 1) {
                output = expandFilenames(inputRaw.slice(0));
                if (output == null) {
                    output = expandFilenames(dataRaw.slice(0));
                    if (output == null) {
                        output = generateOutputNames(input.length);
                    }
                }
                for (let i = 0; i < output.length; i++) {
                    output[i] = output[i] + '.hbs';
                }
            }
            else {
                output = expandFilenames(dataRaw.slice(0));
                if (output == null) {
                    output = generateOutputNames(data.length);
                }
                for (let i = 0; i < output.length; i++) {
                    output[i] = output[i] + '.hbs';
                }
                putArgInAll(input, output.length);
            }
        }
        else {
            if (data.length == 1) {
                output = expandFilenames(inputRaw.slice(0));
                if (output == null) {
                    output = generateOutputNames(input.length);
                }
                for (let i = 0; i < output.length; i++) {
                    output[i] = output[i] + '.hbs';
                }
                putArgInAll(data, output.length);
            }
            else if (input.length == data.length) {
                output = expandFilenames(inputRaw.slice(0));
                if (output == null) {
                    output = expandFilenames(dataRaw.slice(0));
                    if (output == null) {
                        output = generateOutputNames(input.length);
                    }
                }
                for (let i = 0; i < output.length; i++) {
                    output[i] = output[i] + '.hbs';
                }
            }
            else {
                console.error('Error: The number of arguments does not match any of the patterns.');
                process.exit();
            }
        }
    }
    else {
        output = expandArgs(output, true);
        //console.log('expanded output: ' + output);
        if (input.length == 1) {
            if (data.length == 1) {
                if (output.length == 1) {
                    // ok
                }
                else {
                    console.error('Error: The number of arguments does not match any of the patterns.');
                    process.exit();
                }
            }
            else {
                if (data.length == output.length) {
                    // ok
                }
                else {
                    console.error('Error: The number of arguments does not match any of the patterns.');
                    process.exit();
                }
            }
        }
        else {
            if (data.length == 1) {
                if (input.length == output.length) {
                    // ok
                }
                else {
                    console.error('Error: The number of arguments does not match any of the patterns.');
                    process.exit();
                }
            }
            else {
                if (output.length == data.length) {
                    // ok
                }
                else {
                    console.error('Error: The number of arguments does not match any of the patterns.');
                    process.exit();
                }
            }
        }
    }
    return { input: input, output: output, data: data };
}
exports.parseArgs = parseArgs;
function expandArgs(args, isOutput = false) {
    let typeCheck;
    if (!isOutput) {
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
                //console.log('it is a string');
                //console.log('string: ' + arg);
                args[i] = arg;
            }
            else if (arg.includes('/')) {
                if (fs.existsSync(arg) && fs.lstatSync(arg).isDirectory()) {
                    //console.log('it is a directory');
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
                    //console.log('its mask');
                    args = maskParse(arg).slice(0);
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
                    //console.log('it is file');
                    //console.log('file: ' + arg);
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
                    //console.log('it is a directory');
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
                    //console.log('it is file');
                    //console.log('file: ' + arg);
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
    return args;
}
function fileParse(file) {
    return fs.readFileSync(file).toString();
}
function dirParse(dir) {
    dir = fs.realpathSync(dir);
    //console.log(dir);
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
        //console.log(args);
        for (let i = 0; i < args.length; i++) {
            args[i] = fs.readFileSync(args[i]).toString();
        }
    }
    else {
        console.error('Error: chosen directory doesnt contains any files');
    }
    //console.log(args);
    return args;
}
function maskParse(mask) {
    let args = glob.sync(mask, { nodir: true });
    //console.log(args);
    for (let i = 0; i < args.length; i++) {
        args[i] = fileParse(args[i]);
        //console.log(args[i]);
    }
    return args;
}
function expandFilenames(args) {
    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        if (arg.startsWith('\'')) {
            return null;
        }
        else if (arg.includes('/')) {
            if (fs.existsSync(arg) && fs.lstatSync(arg).isDirectory()) {
                arg = fs.realpathSync(arg);
                let args = fs.readdirSync(arg);
                for (let i = 0; i < args.length; i++) {
                    args[i] = arg + '\\' + args[i];
                }
                args = args.filter(el => {
                    if (fs.lstatSync(el).isFile()) {
                        return el;
                    }
                });
                return args;
            }
        }
        else if (arg.includes('*')) {
            let args = glob.sync(arg, { nodir: true });
            return args;
        }
        else if (arg.includes('.') && fs.existsSync(arg)) {
            if (fs.lstatSync(arg).isFile()) {
                return args;
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
function generateOutputNames(count) {
    let output = new Array();
    for (let i = 0; i < count; i++) {
        output[i] = 'result' + i;
    }
    return output;
}
function putArgInAll(args, count) {
    for (let i = 1; i < count; i++) {
        args[i] = args[0];
    }
}
//# sourceMappingURL=argumentsParse.js.map