import * as fs from 'fs';
import * as path from 'path';
import { parseCanLog } from '@lib/utils/parsers';
import { convertMessage } from '@lib/utils/cancicd';

export function processLogsToFenice(canLogPath: string, outputPath = 'result', throwError = false): void {
    let result: string[] = [];

    canLogPath = path.resolve(canLogPath);

    let text = fs.readFileSync(canLogPath, 'utf-8');
    let messages = parseCanLog(text, true, throwError);
    text = '';
    for (const message of messages) {
        const res = convertMessage(message);
        if (res) {
            result.push(res);
        }
    }

    messages = [];

    const resultText = result.join('\n');
    result = [];

    outputPath = path.resolve(`${outputPath}.log`);
    fs.writeFileSync(outputPath, resultText);
}
