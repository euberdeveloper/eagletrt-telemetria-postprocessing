import { processLogsToCsv } from '@/lib';
import { Command } from '@bin/types';
import { options } from '@bin/utils/options';

export const command: Command = {
    command: 'csv',
    description: 'Generate csv files from a can and/or gps log',
    options,
    handler: args => {
        const canLogPath = args.can;
        const gpsLogPath = args.gps;
        const outputPath = args.out;
        const throwError = args.strict;

        processLogsToCsv(canLogPath, gpsLogPath, outputPath, throwError);
    }
};
