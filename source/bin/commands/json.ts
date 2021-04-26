import { processLogsToJson } from '@/lib';
import { Command } from '@bin/types';
import { options } from '@bin/utils/options';

export const command: Command = {
    command: 'json',
    description: 'Generate a json file from a can and/or gps log',
    options,
    handler: args => {
        const canLogPath = args.can;
        const gpsLogPath = args.gps;
        const outputPath = args.out;
        const throwError = args.strict;

        processLogsToJson(canLogPath, gpsLogPath, outputPath, throwError);
    }
};
