import { Options } from 'yargs';

export const options: Record<string, Options> = {
    can: {
        alias: 'c',
        describe: 'The can log file',
        type: 'string',
        default: undefined
    },
    gps: {
        alias: 'g',
        describe: 'The gps log file',
        type: 'string',
        default: undefined
    },
    out: {
        alias: 'o',
        describe: 'The path of the output file or directory',
        type: 'string',
        default: 'result'
    },
    strict: {
        alias: 's',
        describe: 'If the command will fail in case of invalid log rows',
        type: 'boolean',
        default: false
    }
};
