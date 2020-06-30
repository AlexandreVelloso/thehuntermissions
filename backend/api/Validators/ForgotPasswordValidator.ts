import Joi from "@hapi/joi";

import BaseValidator from "./BaseValidator";
import ValidationException from "../Exceptions/ValidationException";

class ForgotPasswordValidator implements BaseValidator {

    validate(req: any) {
        const { email } = req.body;

        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required(),
        });

        const validated = schema.validate({
            email,
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

export default ForgotPasswordValidator;