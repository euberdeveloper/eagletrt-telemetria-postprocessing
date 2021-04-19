import * as fs from 'fs';
import * as path from 'path';
import { Message, parseCanLog, parseGpsLog } from '@lib/utils/parsers';

type CsvResult = Record<string, any>;
type CsvMessage = {
    timestamp: number;
    value: 'string' | 'number' | 'boolean' | Record<string, any>[];
};

function addMessage(result: CsvResult, message: Message): void {
    const keys = message.message.split('.');

    while (keys.length > 0) {
        const key = keys.shift() as string;

        if (!(key in result)) {
            result[key] = keys.length === 0 ? [] : {};
        }

        result = result[key];
    }

    result.push({ timestamp: message.timestamp, value: message.value });
}

function writeCsvFile(csvPath: string, messages: CsvMessage[]): void {
    const messageKeys = typeof messages[0].value === 'object' ? Object.keys(messages[0].value) : ['value'];

    const header = ['timestamp', ...messageKeys];
    const values = messages.map(message => [
        message.timestamp,
        ...(messageKeys.length === 1 ? [message.value] : messageKeys.map(key => message.value[key]))
    ]);

    const text = [header, ...values].map(line => line.join('\t')).join('\n');

    const parentDir = path.dirname(csvPath);
    if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
    }

    fs.writeFileSync(csvPath, text);
}

function writeCsvFiles(outPath: string, obj: CsvResult): void {
    for (const key in obj) {
        const message = obj[key];

        if (Array.isArray(message)) {
            const csvPath = path.join(outPath, `${key}.csv`);
            writeCsvFile(csvPath, message);
        } else {
            const csvPath = path.join(outPath, key);
            writeCsvFiles(csvPath, message);
        }
    }
}

export function processLogsToCsv(
    canLogPath: string | null,
    gpsLogPath: string | null,
    outputPath = 'result',
    throwError = false
): void {
    let result: CsvResult = {};

    if (canLogPath) {
        canLogPath = path.resolve(canLogPath);

        let text = fs.readFileSync(canLogPath, 'utf-8');
        let messages = parseCanLog(text, true, throwError);
        text = '';
        for (const message of messages) {
            addMessage(result, message);
        }
        messages = [];
    }

    if (gpsLogPath) {
        gpsLogPath = path.resolve(gpsLogPath);

        let text = fs.readFileSync(gpsLogPath, 'utf-8');
        let messages = parseGpsLog(text, true, throwError);
        text = '';
        for (const message of messages) {
            addMessage(result, message);
        }
        messages = [];
    }

    outputPath = path.resolve(outputPath);
    writeCsvFiles(outputPath, result);
}
