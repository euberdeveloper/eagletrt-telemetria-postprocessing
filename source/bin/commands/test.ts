import { processLogsForTest } from '@/lib';
import { Command } from '@bin/types';
import { options } from '@bin/utils/options';

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
