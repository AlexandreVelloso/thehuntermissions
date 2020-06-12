import BaseException from './BaseException';

class UnauthorizedOperationException extends BaseException {
    constructor(message: string) {
        super(message, 401);
    }
}

export default UnauthorizedOperationException;
