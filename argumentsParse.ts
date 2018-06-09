import * as fs from 'fs';

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

    if (input.length == 1) {
        switch (argTypeCheck(input[0])) {
            case 1:
                
                break;

            case 2:
                break;

            case 3:
                break;

            default:
                console.error('Error: Input sourse is not exists')
        }
    }
    else {
        // if it has many args
    }
    
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
