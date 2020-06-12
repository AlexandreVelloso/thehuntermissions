import BaseException from './BaseException';

class ValidationException extends BaseException {
    constructor(message: string) {
        super(message, 400);
    }
}

export default ValidationException;
