import * as fs from 'fs'
import * as path from 'path'
import { EType } from '../types';
import parseCan from '../parser/parse-can'
import parseGps from '../parser/parse-gps'
import { type } from 'os';


export function exportTest(canInputFilename: string | undefined, gpsInputFilename: string | undefined, outputFilename: string) {
    const result: { [id: string]: any[] } = {}
    if (canInputFilename) {
        const lines = fs.readFileSync(canInputFilename).toString().split('\n');
        for (const line of lines) {
            parseCan(line, (p, v) => parseCallback(result, p, v, false))
        }
    }
    if (gpsInputFilename) {
        const lines = fs.readFileSync(gpsInputFilename).toString().split('\n');
        for (const line of lines) {
            parseGps(line, (p, v) => parseCallback(result, p, v, false))
        }
    }

    const output: { message: string, values: any[] }[] = []
    for (const key in result) {
        output.push({
            message: key,
            values: result[key]
        })
    }
    fs.writeFileSync(outputFilename, JSON.stringify(output));
}

export function exportJSON(canInputFilename: string | undefined, gpsInputFilename: string | undefined, outputFilename: string) {
    const result: object = {}
    if (canInputFilename) {
        const lines = fs.readFileSync(canInputFilename).toString().split('\n');
        for (const line of lines) {
            parseCan(line, (p, v) => parseCallback(result, p, v, false, new Date()));
        }
    }
    if (gpsInputFilename) {
        const lines = fs.readFileSync(gpsInputFilename).toString().split('\n');
        for (const line of lines) {
            parseGps(line, (p, v) => parseCallback(result, p, v, false, new Date()));
        }
    }
    fs.writeFileSync(outputFilename, JSON.stringify(result));
}

export function exportCSV(canInputFilename: string | undefined, gpsInputFilename: string | undefined, outputPath: string) {
    const result: object = {}
    if (canInputFilename) {
        const lines = fs.readFileSync(canInputFilename).toString().split('\n');
        for (const line of lines) {
            parseCan(line, (p, v) => parseCallback(result, p, v, false, new Date()));
        }
    }
    if (gpsInputFilename) {
        const lines = fs.readFileSync(gpsInputFilename).toString().split('\n');
        for (const line of lines) {
            parseGps(line, (p, v) => parseCallback(result, p, v, false, new Date()));
        }
    }

    recursiveCreateCSV(outputPath, result);
}

function parseCallback(result: any, props: string[], value: any, flat: boolean, timestamp: Date | undefined = undefined) {
    // Test
    if (flat) {
        if (result[props.join('.')]) {
            result[props.join('.')].push(parseValue(value, timestamp));
        } else {
            result[props.join('.')] = [parseValue(value, timestamp)];
        }
    } else {
        //JSON
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

function parseValue(value: any, timestamp: Date | undefined = undefined) {
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