import { EagletrtPostProcessingError } from './postProcessingError';

export class EagletrtPostProcessingInvalidGpsRowError extends EagletrtPostProcessingError {
    protected static readonly DEFAULT_MESSAGE: string = 'Invalid gps log row';
    protected readonly line: string | null;

    public constructor(message?: string, line?: string) {
        super(message ?? EagletrtPostProcessingInvalidGpsRowError.DEFAULT_MESSAGE);
        this.line = line ?? null;
        this.name = 'EagletrtPostProcessingInvalidGpsRowError';
    }
}
