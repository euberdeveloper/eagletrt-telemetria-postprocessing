import * as fs from 'fs'
import { EType } from '../types';
import parseCan from '../parser/parse-can'
import parseGps from '../parser/parse-gps'


export function exportTest(canInputFilename: string | undefined, gpsInputFilename: string | undefined, outputFilename: string, type: EType) {
    const result: { [id: string]: any[] } = {}
    const callback = (props: string[], value: any) => {
        if (result[props.join('.')]) {
            result[props.join('.')].push(value);
        } else {
            result[props.join('.')] = [value];
        }
    };

    if (canInputFilename) {
        const lines = fs.readFileSync(canInputFilename).toString().split('\n');
        for (const line of lines) {
            parseCan(line, callback)
        }
    }
    if (gpsInputFilename) {
        const lines = fs.readFileSync(gpsInputFilename).toString().split('\n');
        for (const line of lines) {
            parseGps(line, callback)
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

export function exportJSON(canInputFilename: string | undefined, gpsInputFilename: string | undefined, outputFilename: string, type: EType) {
    const result: object = {}
    const callback = (props: string[], value: any, timestamp: Date) => {
        let tempRes: any = result;
        let key = props.pop()!;
        for (const p of props) {
            if (tempRes[p] === undefined) {
                tempRes[p] = {} as any;
            }
            tempRes = tempRes[p];
        }

        if (tempRes[key]) {
            tempRes[key].push({
                timestamp: timestamp,
                value: value
            });
        } else {
            tempRes[key] = [{
                timestamp: timestamp,
                value: value
            }];
        }

    };

    if (canInputFilename) {
        const lines = fs.readFileSync(canInputFilename).toString().split('\n');
        for (const line of lines) {
            parseCan(line, (p, v) => callback(p,v, new Date()));
        }
    }
    if (gpsInputFilename) {
        const lines = fs.readFileSync(gpsInputFilename).toString().split('\n');
        for (const line of lines) {
            parseGps(line, (p, v) => callback(p,v, new Date()));
        }
    }
    fs.writeFileSync(outputFilename, JSON.stringify(result));
}