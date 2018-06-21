#! /usr/bin/env node

import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as commandLineArgs from 'command-line-args';
import {OptionDefinition} from 'command-line-args';
import * as ap from './argumentsParse';
import * as glob from 'glob';

const optionDefinitions: OptionDefinition[] = [
    { name: 'input', alias: 'i', multiple: true, type: String },
    { name: 'output', alias: 'o', multiple: true, type: String },
    { name: 'data', alias: 'd', multiple: true, type: String },
    { name: 'force', alias: 'f', defaultValue: false, type: Boolean}
];

function main(){
    let options = commandLineArgs(optionDefinitions);
    ap.parseArgs(options.input, options.output, options.data, options.force);
    
    // let templateContents = fs.readFileSync(options.input).toString();
    // let template = handlebars.compile(templateContents);
    // let jsonData = JSON.parse(options.data);
    // let result = template(jsonData);
    // fs.writeFileSync(options.output, result)
}

main();
