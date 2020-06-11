class ValidationException extends Error {
    constructor(message) {
        super();
        this.statusCode = 400;
        this.message = message;
    }
}

module.exports = ValidationException;