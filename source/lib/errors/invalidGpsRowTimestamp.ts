import { EagletrtPostProcessingInvalidGpsRowError } from './invalidGpsRowError';

export class EagletrtPostProcessingInvalidGpsRowTimestampError extends EagletrtPostProcessingInvalidGpsRowError {
    protected static readonly DEFAULT_MESSAGE: string = 'Invalid gps log row timestamp';

    constructor(message?: string, line?: string, index?: number) {
        super(message ?? EagletrtPostProcessingInvalidGpsRowTimestampError.DEFAULT_MESSAGE, line, index);
        this.name = 'EagletrtPostProcessingInvalidGpsRowTimestampError';
    }
}
