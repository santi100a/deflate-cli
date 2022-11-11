// @ts-check
const { Command } = require('commander');
const { textSync } = require('figlet');
const { resolve, dirname } = require('node:path');
const { readFile, writeFile, stat } = require('node:fs').promises;
const { inflateSync, deflateSync } = require('node:zlib');

const CLI_NAME = 'Deflater';
const VERSION = 'v1.0.0';
const program = (new Command)
.version(VERSION)
.description('Deflates a file, inflates a deflated file, or prints the ratio.')
.arguments('<input> [output]')
.option('-i, --inflate', 'Inflate the specified file.')
.option('-r, --ratio', 'Print the compression ratio.')
.parse(process.argv);



const [ input, out ] = program.args;

const output = out ? resolve(dirname(process.cwd()), out) : null;
const options = program.opts();

console.clear();
console.log('\x1b[31m%s\x1b[0m', textSync(CLI_NAME));    
(async function () {
    
    if (!input) {
        console.log('\x1b[1;31m%s\x1b[0m', '✗ Input file required.');
        process.exit(1);
    }
    try {
        const filename = './'.concat(input);
        const deflated = await readFile(filename);
        if (options.inflate) {
            const DEFAULT_OUT = input.replace('.zz', '');
            const inflated = inflateSync(deflated);
            await writeFile(output || 
                resolve(dirname(process.cwd()), DEFAULT_OUT), inflated);
            console.log('\x1b[32m%s\x1b[0m', '✓ Successfully inflated '.concat(output || DEFAULT_OUT, '.'));
        }
        else if (options.ratio) {
            const { size: inputSize } = await stat(input);
            const { length: outputSize } = inflateSync(deflated);
            console.table({ 
                difference: outputSize - inputSize,
                percentage: (outputSize - inputSize) / inputSize * 100
            });
        }
        else {
            const file = await readFile(input);
            const deflated = deflateSync(file);
            const DEFAULT_OUT = input.concat('.zz');
            const defaultName = resolve(process.cwd(), DEFAULT_OUT);

            const filename = output || 
            defaultName;
            await writeFile(filename
            , deflated);
            console.log('\x1b[32m%s\x1b[0m', '✓ Successfully deflated '.concat(filename, '.'));
        }
    } catch (err) {
        const error = new Error(err);
        if (error.message.includes('no such file or directory')) {
            console.log('\x1b[31m%s\x1b[0m', '✗ Input file not found.'.concat(' ', error.toString(), 
            String(error.stack)));
        } else {
            console.log('\x1b[31m%s\x1b[0m', '✗ An error has occurred. '.concat(error.toString(), '.'));
        }
        process.exit(1);
    }
})();
