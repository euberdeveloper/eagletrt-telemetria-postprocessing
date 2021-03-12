import * as structureModel from '@lib/model/structure.model.json';
import { CanMessageParser, PARSERS } from './parsers';

// Types

type CanMessage = {
    message: string;
    id: number;
    fb?: number;
    parser: CanMessageParser;
};

type ModelDefinition = {
    type: 'can' | 'gps';
    id: string;
    fb?: string;
    parser: string;
};

// Transform structure model to can messages

function getCanMessagesFromModel(model: any, keys: string[], messages: CanMessage[]): void {
    for (const key in model) {
        if ('parser' in model[key]) {
            const md: ModelDefinition = model[key];
            keys.push(key);

            if (md.type === 'can') {
                messages.push({
                    message: keys.join('.'),
                    id: +md.id,
                    fb: md.fb ? +md.fb : undefined,
                    parser: PARSERS[md.parser]
                });
            }

            keys.pop();
        } else {
            const md: any = model[key];
            getCanMessagesFromModel(md, [...keys, key], messages);
        }
    }
}

// Export can messages

const MESSAGES: CanMessage[] = [];
getCanMessagesFromModel(structureModel, [], MESSAGES);
export default MESSAGES;
