#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandLineArgs = require("command-line-args");
const ap = require("./argumentsParse");
const optionDefinitions = [
    { name: 'input', alias: 'i', multiple: true },
    { name: 'output', alias: 'o', multiple: true },
    { name: 'data', alias: 'd', multiple: true }
];
function main() {
    let options = commandLineArgs(optionDefinitions);
    ap.parseArgs(options.input, options.output, options.data);
    // let templateContents = fs.readFileSync(options.input).toString();
    // let template = handlebars.compile(templateContents);
    // let jsonData = JSON.parse(options.data);
    // let result = template(jsonData);
    // fs.writeFileSync(options.output, result)
}
main();
//# sourceMappingURL=index.js.map