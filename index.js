#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandLineArgs = require("command-line-args");
const optionDefinitions = [
    { name: 'input', alias: 'i', lazyMultiple: true, type: String },
    { name: 'output', alias: 'o', multiple: true, type: String },
    { name: 'data', alias: 'd', multiple: true, type: String },
    { name: 'force', alias: 'f', defaultValue: false, type: Boolean }
];
function main() {
    let options = commandLineArgs(optionDefinitions);
    // ap.parseArgs(options.input, options.output, options.data);
    console.log(options.force);
    // let templateContents = fs.readFileSync(options.input).toString();
    // let template = handlebars.compile(templateContents);
    // let jsonData = JSON.parse(options.data);
    // let result = template(jsonData);
    // fs.writeFileSync(options.output, result)
}
main();
//# sourceMappingURL=index.js.map