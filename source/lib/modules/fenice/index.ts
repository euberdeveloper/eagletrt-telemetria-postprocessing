import * as fs from 'fs';
import * as path from 'path';
import { parseCanLog } from '@lib/utils/parsers';
import { convertMessage } from '@lib/utils/cancicd';

export function processLogsToFenice(
    canLogPath: string,
    outputPathPrimary = 'result_primary',
    outputPathSecondary = 'result_secondary',
    throwError = false
): void {
    let resultPrimary: string[] = [];
    let resultSecondary: string[] = [];

    canLogPath = path.resolve(canLogPath);

    let text = fs.readFileSync(canLogPath, 'utf-8');
    let messages = parseCanLog(text, true, throwError);
    text = '';
    for (const message of messages) {
        const [resPrimary, resSecondary] = convertMessage(message);
        if (resPrimary) {
            resultPrimary.push(resPrimary);
        }
        if (resSecondary) {
            resultSecondary.push(resSecondary);
        }
    }

    messages = [];

    const resultPrimaryText = resultPrimary.join('\n');
    resultPrimary = [];

    const resultSecondaryText = resultSecondary.join('\n');
    resultSecondary = [];

    outputPathPrimary = path.resolve(`${outputPathPrimary}.log`);
    outputPathSecondary = path.resolve(`${outputPathSecondary}.log`);

    fs.writeFileSync(outputPathPrimary, resultPrimaryText);
    fs.writeFileSync(outputPathSecondary, resultSecondaryText);
}
