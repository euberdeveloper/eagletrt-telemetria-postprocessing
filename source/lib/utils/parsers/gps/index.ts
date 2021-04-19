import { Logger } from 'euberlog';

import {
    EagletrtPostProcessingInvalidGpsRowError,
    EagletrtPostProcessingInvalidGpsRowTimestampError
} from '@lib/errors';
import { extractTimestamp } from '@lib/utils/timestamp';

import { Message } from '..';
import MESSAGES from './messages/messages';

const logger = new Logger();

function parseMessage(type: string, msg: string[]): Message | null {
    const message = MESSAGES.find(m => m.type === type) ?? null;

    return message
        ? {
            message: message.message,
            value: message.parser(msg)
        }
        : null;
}

function parseLine(line: string, index: number, keepTimestamps: boolean, throwError: boolean): Message | null {
    const pattern = /\$\w{2}(?<type>\w{3}),(?<body>.*)/;
    const patternResult = pattern.exec(line)?.groups;

    if (patternResult) {
        const type = patternResult.type;
        const body = patternResult.body;
        const msg = body.split(',');
        let message = parseMessage(type, msg);

        if (message?.value === null) {
            message = null;
        }

        if (message && keepTimestamps) {
            const timestamp = extractTimestamp(line);

            if (timestamp) {
                message.timestamp = timestamp;
            } else {
                logger.warning('Line without timestamp', { line, index });
                if (throwError) {
                    throw new EagletrtPostProcessingInvalidGpsRowTimestampError(undefined, line, index);
                }
                return null;
            }
        }

        return message;
    } else {
        if (!!line) {
            logger.warning('Invalid line', { line, index });
            if (throwError) {
                throw new EagletrtPostProcessingInvalidGpsRowError(undefined, line, index);
            }
        }
        return null;
    }
}

export function parseGpsLog(text: string, keepTimestamps: boolean, throwError: boolean): Message[] {
    const lines = text.split('\n');
    const messages: Message[] = [];

    for (const [index, line] of lines.entries()) {
        const message = parseLine(line, index, keepTimestamps, throwError);

        if (message) {
            messages.push(message);
        }
    }

    return messages;
}
