import * as fs from 'fs'
import * as path from 'path'
import parseCan from '../parser/parse-can'
import parseGps from '../parser/parse-gps'
import parseDate from '../parser/parse-date'


function parseCallback(result: any, props: string[], value: any, flat: boolean, timestamp: number | undefined = undefined) {
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

function parseValue(value: any, timestamp: number | undefined = undefined) {
    if (timestamp) {
        return {
            timestamp: timestamp,
            value: value
        }
    } else {
        return value;
    }
}

export function exportTest(canInputFilename: string | undefined, gpsInputFilename: string | undefined, outputFilename: string) {
    const result: { [id: string]: any[] } = {}
    if (canInputFilename) {
        const lines = fs.readFileSync(canInputFilename).toString().split('\n');
        for (const line of lines) {
            parseCan(line, (p, v) => parseCallback(result, p, v, true))
        }
    }
    if (gpsInputFilename) {
        const lines = fs.readFileSync(gpsInputFilename).toString().split('\n');
        for (const line of lines) {
            parseGps(line, (p, v) => parseCallback(result, p, v, true))
        }
    }

    const output: { message: string, values: any[] }[] = []
    for (const key in result) {
        output.push({
            message: key,
            values: result[key]
        })
    }
    fs.writeFileSync(outputFilename, JSON.stringify(output, null, 4));
}

export function exportJSON(canInputFilename: string | undefined, gpsInputFilename: string | undefined, outputFilename: string) {
    const result: object = {}
    if (canInputFilename) {
        const lines = fs.readFileSync(canInputFilename).toString().split('\n');
        for (const line of lines) {
            const timestamp = parseDate(line, ' ');
            parseCan(line, (p, v) => parseCallback(result, p, v, false, timestamp));
        }
    }
    if (gpsInputFilename) {
        const lines = fs.readFileSync(gpsInputFilename).toString().split('\n');
        for (const line of lines) {
            const timestamp = parseDate(line, '\t');
            parseGps(line, (p, v) => parseCallback(result, p, v, false, timestamp));
        }
    }
    fs.writeFileSync(outputFilename, JSON.stringify(result, null, 4));
}

export function exportCSV(canInputFilename: string | undefined, gpsInputFilename: string | undefined, outputPath: string) {
    const result: object = {}
    if (canInputFilename) {
        const lines = fs.readFileSync(canInputFilename).toString().split('\n');
        for (const line of lines) {
            const timestamp = parseDate(line, ' ');
            parseCan(line, (p, v) => parseCallback(result, p, v, false, timestamp));
        }
    }
    if (gpsInputFilename) {
        const lines = fs.readFileSync(gpsInputFilename).toString().split('\n');
        for (const line of lines) {
            const timestamp = parseDate(line, '\t');
            parseGps(line, (p, v) => parseCallback(result, p, v, false, timestamp));
        }
    }

    recursiveCreateCSV(outputPath, result);
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