import * as structureModel from '@lib/model/structure.model.json';
import { GpsMessageParser, PARSERS } from './parsers';

// Define types

type GpsMessage = {
    message: string;
    type: string;
    parser: GpsMessageParser;
};

type ModelDefinition = {
    type: 'can' | 'gps';
    id: string;
    fb?: string;
    parser: string;
};

// Transform structure model to gps messages

function getGpsMessagesFromModel(model: any, keys: string[], messages: GpsMessage[]): void {
    for (const key in model) {
        if ('parser' in model[key]) {
            const md: ModelDefinition = model[key];
            keys.push(key);

            if (md.type === 'gps') {
                messages.push({
                    message: keys.join('.'),
                    type: md.id,
                    parser: PARSERS[md.parser]
                });
            }

            keys.pop();
        } else {
            const md: any = model[key];
            getGpsMessagesFromModel(md, [...keys, key], messages);
        }
    }
}

// Export gps messages

const MESSAGES: GpsMessage[] = [];
getGpsMessagesFromModel(structureModel, [], MESSAGES);
export default MESSAGES;
