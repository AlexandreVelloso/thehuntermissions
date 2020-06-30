import Joi from "@hapi/joi";

import BaseValidator from "./BaseValidator";
import ValidationException from "../Exceptions/ValidationException";

class AuthResetPasswordValidator implements BaseValidator {

    validate(req: any) {
        const { token, password, confirm_password } = req.body;

        const schema = Joi.object({
            token: Joi.string()
                .required(),

            password: Joi.string()
                .required(),

            confirm_password: Joi.string()
                .required(),
        });

        const validated = schema.validate({
            token,
            password,
            confirm_password,
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

export default AuthResetPasswordValidator;