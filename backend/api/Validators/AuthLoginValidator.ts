import Joi from "@hapi/joi";

import BaseValidator from "./BaseValidator";
import ValidationException from "../Exceptions/ValidationException";

class AuthLoginValidator implements BaseValidator {

    validate(req: any) {
        const { email, password } = req.body;

        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required(),

            password: Joi.string()
                .required(),
        });

        const validated = schema.validate({
            email,
            password,
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

export default AuthLoginValidator;