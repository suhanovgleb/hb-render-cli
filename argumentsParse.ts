import * as fs from 'fs';
import * as path from 'path';

export function parseArgs(input: string[], output: string[], data: string[]) {

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

    if (input.length = 1) {
        if ((input[0].startsWith('\'')) || input[0].startsWith('"')) {
            console.log('input is string...');
            // string processing
        }
        else if (input[0].includes('*') || input[0].includes('/')){
            fromDir(input[0]);
        }
        else {
            console.log('input contains one raw filename');
        }
    }
    else {
        console.log('input are contains ' + input.length + 'raw filenames...')
        // filenames 
    }
    
    


    // if (input.length == 1) {
    //     switch (argTypeCheck(input[0])) {
    //         case 1:
                
    //             break;

    //         case 2:
    //             break;

    //         case 3:
    //             break;

    //         default:
    //             console.error('Error: Input sourse is not exists')
    //     }
    // }
    // else {
    //     // if it has many args
    // }
    
}

function argTypeCheck(arg: string): number {
    if (arg.includes('*')) {
        // that's mask
        return 1;
    }
    else if (arg.includes('/')) {
        //that's dir
        return 2;
    }
    else if (fs.existsSync(arg)) {
        // that's file
        return 3;
    }
    else {
        return 0;
    }
}

export function fromDir(mask: string){

    if (mask.includes('*')) {

        let filter = mask.substr(mask.lastIndexOf('/') + 1);
        let startPath = mask.substr(0, mask.length - filter.length - 1);
        if (!filter.startsWith('*')) {
            console.error('Error: file mask should starts with *');
            process.exit(-3);
        }
        else if (filter.split('*').length - 1 > 1) {
            console.error('Error: file mask can\'t contain more than one *');
            process.exit(-4);
        }
        else if (filter.startsWith('*')) {
            filter = filter.slice(1);
        }

        if (startPath.length != 0) {
            console.log('Starting from dir ' + startPath + '/');

            if (!fs.existsSync(startPath)) {
                console.log("no dir ", startPath);
                return;
            }

            var files = fs.readdirSync(startPath);
            for (var i = 0; i < files.length; i++) {
                var filename = path.join(startPath, files[i]);
                var stat = fs.lstatSync(filename);
                if (stat.isDirectory()) {
                    fromDir(mask); //recurse
                }
                else if (filename.includes(filter)) {
                    console.log('-- found: ', filename);
                };
            };
        }
        else {
            var files = fs.readdirSync(__dirname);
            for (var i = 0; i < files.length; i++) {
                var filename = path.join(startPath, files[i]);
                var stat = fs.lstatSync(filename);
                if (filename.includes(filter)) {
                    console.log('-- found: ', filename);
                };
            };
        }
    }
    else {
        if (mask.length != 0) {
            console.log('Starting from dir ' + mask + '/');

            if (!fs.existsSync(mask)) {
                console.log("no dir ", mask);
                return;
            }

            var files = fs.readdirSync(mask);
            for (var i = 0; i < files.length; i++) {
                var filename = path.join(mask, files[i]);
                var stat = fs.lstatSync(filename);
                if (stat.isDirectory()) {
                    fromDir(filename); //recurse
                }
                
                console.log('-- found: ', filename);
            };
        }
    }
};






    // if ((output == undefined) || (output.length == 0)) {
    //     let lengthElement;
    //     if (input.length >= data.length) {
    //         lengthElement = input;
    //     }
    //     else {
    //         lengthElement = data;
    //     }
    //     output = input.map(el => {
    //         return el.concat('.test'); // TODO: change extension
    //     })
    //     console.log('You don\'t specify output names. Output files will have these names: ' + output);
    // }
    
    // if (output.length < input.length) {
    //     console.error('Error: You must pass as many or more outputs as there are inputs.');
    //     process.exit(-3);
    // }

    // if (output.length < data.length) {
    //     console.error('Error: You must pass as many or more outputs as there are data.');
    //     process.exit(-4);
    // }
