import { InvalidLengthException } from "@exceptions/invalid-length.exception";

export class GeneralDescription {
    private readonly _content: string;

    get content(): string {
        return this._content;
    }

    private validateContentLength(content: string): boolean {
        return content.length >= 10 && content.length <= 30;
    }

    constructor(content: string) {
        const isContentLengthValid = this.validateContentLength(content);

        if (!isContentLengthValid) {
            throw new InvalidLengthException();
        }

        this._content = content;
    }
    
}