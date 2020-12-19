import * as fs from 'fs';
import * as path from 'path';
import { Message, parseCanLog, parseGpsLog } from '../../utils/parsers';

type JsonResult = Record<string, any>;

function addMessage(result: JsonResult, message: Message): void {
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

export function processLogsToJson(
    canLogPath: string | null,
    gpsLogPath: string | null,
    outputPath = 'result',
    throwError = false
): void {
    let result: JsonResult = {};

    if (canLogPath) {
        canLogPath = path.resolve(canLogPath);

        let text = fs.readFileSync(canLogPath, 'utf-8');
        let messages = parseCanLog(text, true, throwError);
        text = '';
        messages.forEach(message => addMessage(result, message));
        messages = [];
    }

    if (gpsLogPath) {
        gpsLogPath = path.resolve(gpsLogPath);

        let text = fs.readFileSync(gpsLogPath, 'utf-8');
        let messages = parseGpsLog(text, true, throwError);
        text = '';
        messages.forEach(message => addMessage(result, message));
        messages = [];
    }

    const resultText = JSON.stringify(result);
    result = {};

    outputPath = path.resolve(`${outputPath}.json`);
    fs.writeFileSync(outputPath, resultText);
}
