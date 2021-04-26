import { processLogsForTest } from '@lib';
import { options } from '@bin/utils/options';
import { Command } from '@bin/commands/types';

export const command: Command = {
    command: 'test',
    description: 'Generate a .expected.json file to be used from the telemetry general test from a can and/or gps log',
    options,
    handler: args => {
        const canLogPath = args.can;
        const gpsLogPath = args.gps;
        const outputPath = args.out;
        const throwError = args.strict;

        processLogsForTest(canLogPath, gpsLogPath, outputPath, throwError);
    }
};
