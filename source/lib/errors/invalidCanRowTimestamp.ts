import { EagletrtPostProcessingInvalidCanRowError } from './invalidCanRowError';

export class EagletrtPostProcessingInvalidCanRowTimestampError extends EagletrtPostProcessingInvalidCanRowError {
    protected static readonly DEFAULT_MESSAGE: string = 'Invalid can log row timestamp';

    public constructor(message?: string, line?: string, index?: number) {
        super(message ?? EagletrtPostProcessingInvalidCanRowTimestampError.DEFAULT_MESSAGE, line, index);
        this.name = 'EagletrtPostProcessingInvalidCanRowError';
    }
}
