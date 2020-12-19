import { EagletrtPostProcessingInvalidCanRowError } from './invalidCanRowError';

export class EagletrtPostProcessingInvalidCanRowTimestampError extends EagletrtPostProcessingInvalidCanRowError {
    protected static readonly DEFAULT_MESSAGE: string = 'Invalid can log row timestamp';

    public constructor(message?: string, line?: string) {
        super(message ?? EagletrtPostProcessingInvalidCanRowTimestampError.DEFAULT_MESSAGE, line);
        this.name = 'EagletrtPostProcessingInvalidCanRowError';
    }
}
