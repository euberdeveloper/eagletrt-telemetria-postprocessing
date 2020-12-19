import { EagletrtPostProcessingInvalidGpsRowError } from './invalidGpsRowError';

export class EagletrtPostProcessingInvalidGpsRowTimestampError extends EagletrtPostProcessingInvalidGpsRowError {
    protected static readonly DEFAULT_MESSAGE: string = 'Invalid gps log row timestamp';

    public constructor(message?: string, line?: string) {
        super(message ?? EagletrtPostProcessingInvalidGpsRowTimestampError.DEFAULT_MESSAGE, line);
        this.name = 'EagletrtPostProcessingInvalidGpsRowError';
    }
}
