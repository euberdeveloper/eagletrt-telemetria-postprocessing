export class EagletrtPostProcessingError extends Error {
    public name: string;

    constructor(message?: string) {
        super(message);
        this.name = 'EagletrtPostProcessingError';
    }
}
