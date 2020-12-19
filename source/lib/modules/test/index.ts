import * as fs from 'fs';
import * as path from 'path';
import { Message, parseCanLog, parseGpsLog } from '../../utils/parsers';

type TempTestResult = Record<string, any[]>;
type TestResult = {
    message: string;
    values: any[];
}[];

function addMessage(result: TempTestResult, message: Message): void {
    if (!(message.message in result)) {
        result[message.message] = [];
    }

    result[message.message].push(message.value);
}

function tempResultToResult(tempResult: TempTestResult): TestResult {
    return Object.keys(tempResult).map(key => ({
        message: key,
        values: tempResult[key]
    }));
}

export function processLogsForTest(
    canLogPath: string | null,
    gpsLogPath: string | null,
    outputPath = 'result',
    throwError = false
): void {
    let tempResult: TempTestResult = {};

    if (canLogPath) {
        canLogPath = path.resolve(canLogPath);

        let text = fs.readFileSync(canLogPath, 'utf-8');
        let messages = parseCanLog(text, false, throwError);
        text = '';
        messages.forEach(message => addMessage(tempResult, message));
        messages = [];
    }

    if (gpsLogPath) {
        gpsLogPath = path.resolve(gpsLogPath);

        let text = fs.readFileSync(gpsLogPath, 'utf-8');
        let messages = parseGpsLog(text, false, throwError);
        text = '';
        messages.forEach(message => addMessage(tempResult, message));
        messages = [];
    }

    let result = tempResultToResult(tempResult);
    tempResult = {};
    const resultText = JSON.stringify(result);
    result = [];

    outputPath = path.resolve(`${outputPath}.expected.json`);
    fs.writeFileSync(outputPath, resultText);
}
