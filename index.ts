#! /usr/bin/env node

import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as commandLineArgs from 'command-line-args';
import {OptionDefinition} from 'command-line-args';
import { parseArgs } from './argumentsParse';

const optionDefinitions: OptionDefinition[] = [
    { name: 'input', alias: 'i', multiple: true },
    { name: 'output', alias: 'o', multiple: true },
    { name: 'data', alias: 'd', multiple: true }
];

function main(){
    let options = commandLineArgs(optionDefinitions);
    parseArgs(options.input, options.output, options.data);
    //let templateContents = fs.readFileSync(options.input).toString();
    //let template = handlebars.compile(templateContents);
    //let jsonData = JSON.parse(options.data);
    //let result = template(jsonData);
    //fs.writeFileSync(options.output, result)
}

main();