import Joi from '@hapi/joi';

import ValidationException from '../Exceptions/ValidationException';
import BaseValidator from './BaseValidator';

class GetValidator implements BaseValidator {

    validate(req: any): any {
        const { id } = req.params;

        const schema = Joi.object({
            id: Joi.number()
                .min(1)
                .required(),
        });

        const validated = schema.validate({
            id
        });

        if (validated.error) {
            const errorMessage = validated.error
                .details[0]
                .message;

            throw new ValidationException(errorMessage);
        }

        return validated.value;
    }

}

export default GetValidator;