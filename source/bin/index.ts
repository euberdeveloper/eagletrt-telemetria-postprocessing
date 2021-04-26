#!/usr/bin/env node
import * as yargs from 'yargs';

if (!process.env.IS_WEBPACK) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('module-alias/register');
}

import { csvCommand, jsonCommand, testCommand } from '@bin/commands';
export * from '@bin/commands';

if (require.main === module) {
    yargs
        .scriptName('eagletrt-process')
        .command(
            csvCommand.command,
            csvCommand.description,
            yargs => {
                yargs.options(csvCommand.options);
            },
            args => {
                csvCommand.handler(args);
            }
        )
        .command(
            jsonCommand.command,
            jsonCommand.description,
            yargs => {
                yargs.options(jsonCommand.options);
            },
            args => {
                jsonCommand.handler(args);
            }
        )
        .command(
            testCommand.command,
            testCommand.description,
            yargs => {
                yargs.options(testCommand.options);
            },
            args => {
                testCommand.handler(args);
            }
        )
        .demandCommand(1, 'You must enter a command')
        .epilogue(
            'For more information, find our manual at https://github.com/eagletrt/telemetria-postprocessing#readme'
        ).argv;
}
