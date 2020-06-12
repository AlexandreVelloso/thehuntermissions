import BaseException from './BaseException';

class EntityNotFoundException extends BaseException {
    constructor(message: string) {
        super(message, 404);
    }
}

export default EntityNotFoundException;
