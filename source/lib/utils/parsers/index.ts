export * from './can';
export * from './gps';

export interface Message {
    message: string;
    value: any;
    timestamp?: number;
}