import * as clu from 'command-line-usage';

const sections = [
    {
        header: 'Handlebars CLI Tool',
        content: 'Accepts the handlebars template and data; returns the html page.'
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'help',
                alias: 'h',
                description: 'Show this page.',
            },
            {
                name: 'input',
                alias: 'i',
                description: 'Input handlebars template. Can be path, mask (e.g. *.txt) or string (string must be separated by \"\'\'\").',
                multiple: true
            },
            {
                name: 'output',
                alias: 'o',
                description: 'Output file. Can be directory or file(s).',
                multiple: true
            },
            {
                name: 'data',
                alias: 'd',
                description: 'A JSON data that will be processed with template. Can be path, mask (e.g. *.txt) or string (string must be separated by \"\'\'\").',
                multiple: true
            },
            {
                name: 'force',
                alias: 'f',
                description: 'Force writing. Use it if you want to overwrite output file if it already exists.'
            }
        ]
    }
];

const usage = clu(sections);

export function showInfo() {
    console.log(usage);
}