export class EagletrtPostProcessingError extends Error {

    public name: string;

    public constructor(message?: string) {
        super(message);
        this.name = 'EagletrtPostProcessing';
    }

}