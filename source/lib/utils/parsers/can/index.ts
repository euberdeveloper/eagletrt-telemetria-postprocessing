import {
    EagletrtPostProcessingInvalidCanRowError,
    EagletrtPostProcessingInvalidCanRowTimestampError
} from '@lib/errors';

import { extractTimestamp } from '@lib/utils/timestamp';

import { Message } from '..';
import MESSAGES from './messages/messages';

function parseMessage(id: number, fb: number, msg: number[]): Message | null {
    const message = MESSAGES.find(m => m.id === id && (!m.fb || m.fb === fb)) ?? null;

    return message
        ? {
              message: message.message,
              value: message.parser(msg)
          }
        : null;
}

function getMsg(body: string): number[] {
    return body
        .padEnd(16, '0')
        .split('')
        .reduce<string[][]>((acc, curr, i) => {
            if (i % 2 === 0) {
                acc.push([curr]);
            } else {
                acc[Math.floor(i / 2)].push(curr);
            }
            return acc;
        }, [])
        .map(couple => couple.join(''))
        .map(couple => parseInt(couple, 16));
}

function parseLine(line: string, keepTimestamps: boolean, throwError: boolean): Message | null {
    const pattern = /(?<id>[a-zA-Z0-9]{3})#(?<body>[a-zA-Z0-9]{2,16})/;
    const patternResult = pattern.exec(line)?.groups;

    if (patternResult) {
        const id = parseInt(patternResult.id, 16);
        const body = patternResult.body;
        const msg = getMsg(body);
        const message = parseMessage(id, msg[0], msg);

        if (message && keepTimestamps) {
            const timestamp = extractTimestamp(line);

            if (timestamp) {
                message.timestamp = timestamp;
            } else {
                console.log('warning timestapm', line);
                if (throwError) {
                    throw new EagletrtPostProcessingInvalidCanRowTimestampError(undefined, line);
                }
                return null;
            }
        }

        return message;
    } else {
        if (!!line.trim()) {
            console.log('warning', line);
            if (throwError) {
                throw new EagletrtPostProcessingInvalidCanRowError(undefined, line);
            }
        }
        return null;
    }
}

export function parseCanLog(text: string, keepTimestamps: boolean, throwError: boolean): Message[] {
    const lines = text.split('\n');
    const messages: Message[] = [];

    for (const line of lines) {
        const message = parseLine(line, keepTimestamps, throwError);

        if (message) {
            messages.push(message);
        }
    }

    return messages;
}
