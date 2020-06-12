class BaseException extends Error {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super();       
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default BaseException;