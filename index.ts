#! /usr/bin/env node

import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as commandLineArgs from 'command-line-args';
import {OptionDefinition} from 'command-line-args';
import * as ap from './argumentsParse';
import * as glob from 'glob';
import * as res from './resultMaker';
import * as clu from './commandLineUsage';

const optionDefinitions: OptionDefinition[] = [
    { name: 'input', alias: 'i', multiple: true, type: String },
    { name: 'output', alias: 'o', multiple: true, type: String },
    { name: 'data', alias: 'd', multiple: true, type: String },
    { name: 'force', alias: 'f', defaultValue: false, type: Boolean},
    { name: 'help', alias: 'h', defaultValue: false, type: Boolean}
];

function main(){
    let options;
    try {
        options = commandLineArgs(optionDefinitions);
    }
    catch {
        console.error('Error: Something wrong with the options.');
        process.exit();
    }
    if (options.help) { clu.showInfo(); process.exit(); }
    let parsedArgs = ap.parseArgs(options.input, options.output, options.data);
    let input = parsedArgs.input;
    let output = parsedArgs.output;
    let data = parsedArgs.data;
    res.makeResult(input, output, data, options.force);
    console.log('\nSuccessfully done');

    // let templateContents = fs.readFileSync(options.input).toString();
    // let template = handlebars.compile(templateContents);
    // let jsonData = JSON.parse(options.data);
    // let result = template(jsonData);
    // fs.writeFileSync(options.output, result)
}

main();
