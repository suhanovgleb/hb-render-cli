import * as fs from 'fs';
import * as handlebars from 'handlebars';

export function makeResult(input: string[], output: string[], data: string[], isForce: boolean) {
    for (let i = 0; i < output.length; i++) {
        let templateContents = input[i];
        let template, jsonData, result;
        try {
            template = handlebars.compile(templateContents);
        }
        catch (e) {
            console.error('Error: handlebars template is not valid');
            process.exit();
        }
        try {
            jsonData = JSON.parse(data[i]);
        }
        catch (e) {
            console.error('Error: JSON data is not valid');
            process.exit();
        }
        try {
            result = template(jsonData);
            
        }
        catch (e) {
            console.error('Error: cannot process data with template');
            process.exit();
        }

        if (fs.existsSync(output[i]) && !isForce) {
            console.error('Error: output file already exists. Use -f (Force) to replace existing file');
            process.exit();
        }
        else {
            fs.writeFileSync(output[i], result);
        }

    }
}
