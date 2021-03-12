import { Logger } from 'euberlog';

import {
    EagletrtPostProcessingInvalidCanRowError,
    EagletrtPostProcessingInvalidCanRowTimestampError
} from '@lib/errors';

import { extractTimestamp } from '@lib/utils/timestamp';

import { Message } from '..';
import MESSAGES from './messages/messages';

const logger = new Logger();

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

function parseLine(line: string, index: number, keepTimestamps: boolean, throwError: boolean): Message | null {
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
                logger.warning('Line without timestamp', { line, index });
                if (throwError) {
                    throw new EagletrtPostProcessingInvalidCanRowTimestampError(undefined, line, index);
                }
                return null;
            }
        }

        return message;
    } else {
        if (!!line.trim()) {
            logger.warning('Invalid line', { line, index });
            if (throwError) {
                throw new EagletrtPostProcessingInvalidCanRowError(undefined, line, index);
            }
        }
        return null;
    }
}

export function parseCanLog(text: string, keepTimestamps: boolean, throwError: boolean): Message[] {
    const lines = text.split('\n');
    const messages: Message[] = [];

    lines.forEach((line, index) => {
        const message = parseLine(line, index, keepTimestamps, throwError);

        if (message) {
            messages.push(message);
        }
    });

    return messages;
}
