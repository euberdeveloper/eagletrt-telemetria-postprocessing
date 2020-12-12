#!/usr/bin/env node

import * as yargs from 'yargs'
import generater from '../index'
import { EType } from '../types';

function defaulFilename(type: EType) {
    switch (type) {
        case EType.JSON: return 'resul.json';
        case EType.CSV: return 'resul';
        case EType.Test: return 'test-result.json';
    }
}

function launchGenerator(argv: any, type: EType) {
    const fileCan = argv.can as string | undefined;
    const fileGps = argv.gps as string | undefined;
    const outFile = (argv.out as string | undefined) ?? defaulFilename(type);
    if (fileCan || fileGps)
        generater(type, fileCan, fileGps, outFile)
}

yargs
    .scriptName('eagletst-process')
    .command(
        'csv',
        'Generate csv',
        () => { return {}; },
        (argv) => launchGenerator(argv, EType.CSV)
    )
    .command(
        'json',
        'Generate json',
        () => { return {}; },
        (argv) => launchGenerator(argv, EType.JSON)

    )
    .command(
        'test',
        'Generate test',
        () => { return {}; },
        (argv) => launchGenerator(argv, EType.Test)
    )
    .option({
        'can': {
            alias: 'l',
            describe: 'Log file',
            type: 'string',
        },
        'gps': {
            alias: 'g',
            describe: 'Gps file',
            type: 'string',
        },
        'out': {
            alias: 'o',
            describe: 'Output file or directory',
            type: 'string',
            default: undefined,
        }
    })
    .epilogue('For more information, find our manual at https://github.com/euberdeveloper/eagletrt-code-generator#readme')
    .argv;
