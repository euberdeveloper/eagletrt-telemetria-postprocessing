#!/usr/bin/env node
import * as yargs from 'yargs';

import { processLogsForTest, processLogsToJson, processLogsToCsv } from '../lib';

yargs
    .scriptName('eagletrt-process')
    .command(
        'csv',
        'Generate csv files from a can and/or gps log',
        () => {
            return {};
        },
        argv => {
            const args: any = argv;

            const canLogPath = args.can;
            const gpsLogPath = args.gps;
            const outputPath = args.out;
            const throwError = args.strict;

            processLogsToCsv(canLogPath, gpsLogPath, outputPath, throwError);
        }
    )
    .command(
        'json',
        'Generate a json file from a can and/or gps log',
        () => {
            return {};
        },
        argv => {
            const args: any = argv;

            const canLogPath = args.can;
            const gpsLogPath = args.gps;
            const outputPath = args.out;
            const throwError = args.strict;

            processLogsToJson(canLogPath, gpsLogPath, outputPath, throwError);
        }
    )
    .command(
        'test',
        'Generate a .expected.json file to be used from the telemetry general test from a can and/or gps log',
        () => {
            return {};
        },
        argv => {
            const args: any = argv;

            const canLogPath = args.can;
            const gpsLogPath = args.gps;
            const outputPath = args.out;
            const throwError = args.strict;

            processLogsForTest(canLogPath, gpsLogPath, outputPath, throwError);
        }
    )
    .option({
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
    })
    .demandCommand(1, 'You must enter a command')
    .epilogue(
        'For more information, find our manual at https://github.com/eagletrt/eagletrt-telemetria-postprocessing#readme'
    ).argv;
