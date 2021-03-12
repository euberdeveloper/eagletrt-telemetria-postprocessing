import { EagletrtPostProcessingError } from './postProcessingError';

export class EagletrtPostProcessingInvalidCanRowError extends EagletrtPostProcessingError {
    protected static readonly DEFAULT_MESSAGE: string = 'Invalid can log row';
    protected readonly line: string | null;
    protected readonly index: number | null;

    public constructor(message?: string, line?: string, index?: number) {
        super(message ?? EagletrtPostProcessingInvalidCanRowError.DEFAULT_MESSAGE);
        this.line = line ?? null;
        this.index = index ?? null;
        this.name = 'EagletrtPostProcessingInvalidCanRowError';
    }
}
