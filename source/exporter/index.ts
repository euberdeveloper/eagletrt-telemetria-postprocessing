import * as fs from 'fs'
import * as path from 'path'
import parseCan from '../parser/parse-can'
import parseGps from '../parser/parse-gps'
import parseDate from '../parser/parse-date'


function parseCallback(result: any, props: string[], value: any, flat: boolean, timestamp?: number) {
    if (flat) {
        if (result[props.join('.')]) {
            result[props.join('.')].push(parseValue(value, timestamp));
        } else {
            result[props.join('.')] = [parseValue(value, timestamp)];
        }
    } else {

        let tempRes: any = result;
        let key = props.pop()!;
        for (const p of props) {
            if (tempRes[p] === undefined) {
                tempRes[p] = {} as any;
            }
            tempRes = tempRes[p];
        }

        if (tempRes[key]) {
            tempRes[key].push(parseValue(value, timestamp));
        } else {
            tempRes[key] = [parseValue(value, timestamp)];
        }
    }
}

function parseValue(value: any, timestamp?: number) {
    if (timestamp) {
        return {
            timestamp: timestamp,
            value: value
        }
    } else {
        return value;
    }
}

function recursiveCreateCSV(partialPath: string, partialResult: any) {
    for (const k in partialResult) {
        if (Array.isArray(partialResult[k])) {
            let header = undefined as string | undefined;
            const lines: string[] = partialResult[k].map((l: { timestamp: Date, value: any }) => {
                if (typeof l.value === 'object') {
                    if (!header) {
                        header = `timestamp\t${Object.keys(l.value).join('\t')}`;
                    }
                    return `${l.timestamp}\t${Object.keys(l.value).map(k => l.value[k]).join('\t')}`

                } else {
                    if (!header) {
                        header = 'timestamp\tvalue';
                    }
                    return `${l.timestamp}\t${l.value}`;
                }
            })
            if (header) {
                lines.unshift(header);
                fs.writeFileSync(path.join(partialPath, `${k}.csv`), lines.join('\n'));
            }

        } else if (typeof partialResult[k] === 'object') {
            let dir = path.join(partialPath, k);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            recursiveCreateCSV(dir, partialResult[k]);
        }
    }
}

export function exportTest(canLogPath?: string, gpsLogPath?: string, outputFilename: string = 'processed') {
    const result: { [id: string]: any[] } = {}
    if (canLogPath) {
        canLogPath = path.resolve(canLogPath);
        const lines = fs.readFileSync(canLogPath, 'utf-8').split('\n');
        for (const line of lines) {
            parseCan(line, (p, v) => parseCallback(result, p, v, true))
        }
    }

    if (gpsLogPath) {
        gpsLogPath = path.resolve(gpsLogPath);
        const lines = fs.readFileSync(gpsLogPath, 'utf-8').split('\n');
        for (const line of lines) {
            parseGps(line, (p, v) => parseCallback(result, p, v, true))
        }
    }

    const output: { message: string, values: any[] }[] = []
    for (const key in result) {
        output.push({
            message: key,
            values: result[key]
        });
    }

    const outputPath = path.resolve(`${outputFilename}.expected.json`);
    const outputText = JSON.stringify(output, null, 4);
    fs.writeFileSync(outputPath, outputText);
}

export function exportJSON(canLogPath?: string, gpsLogPath?: string, outputFilename: string = 'processed') {
    const result: object = {}

    if (canLogPath) {
        canLogPath = path.resolve(canLogPath);
        const lines = fs.readFileSync(canLogPath, 'utf-8').split('\n');
        for (const line of lines) {
            const timestamp = parseDate(line, ' ');
            parseCan(line, (p, v) => parseCallback(result, p, v, false, timestamp));
        }
    }

    if (gpsLogPath) {
        gpsLogPath = path.resolve(gpsLogPath);
        const lines = fs.readFileSync(gpsLogPath, 'utf-8').split('\n');
        for (const line of lines) {
            const timestamp = parseDate(line, '\t');
            parseGps(line, (p, v) => parseCallback(result, p, v, false, timestamp));
        }
    }
    
    const outputPath = path.resolve(`${outputFilename}.json`);
    const outputText = JSON.stringify(result, null, 4);
    fs.writeFileSync(outputPath, outputText);
}

export function exportCSV(canLogPath?: string, gpsLogPath?: string, outputPath: string = 'processed') {
    const result: object = {}

    if (canLogPath) {
        canLogPath = path.resolve(canLogPath);
        const lines = fs.readFileSync(canLogPath, 'utf-8').split('\n');
        for (const line of lines) {
            const timestamp = parseDate(line, ' ');
            parseCan(line, (p, v) => parseCallback(result, p, v, false, timestamp));
        }
    }

    if (gpsLogPath) {
        gpsLogPath = path.resolve(gpsLogPath);
        const lines = fs.readFileSync(gpsLogPath, 'utf-8').split('\n');
        for (const line of lines) {
            const timestamp = parseDate(line, '\t');
            parseGps(line, (p, v) => parseCallback(result, p, v, false, timestamp));
        }
    }

    outputPath = path.resolve(outputPath);
    recursiveCreateCSV(outputPath, result);
}