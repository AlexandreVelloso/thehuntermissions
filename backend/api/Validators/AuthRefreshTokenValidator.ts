import Joi from "@hapi/joi";

import BaseValidator from "./BaseValidator";
import ValidationException from "../Exceptions/ValidationException";

class AuthRefreshTokenValidator implements BaseValidator {

    validate(req: any) {
        const { refresh_token } = req.body;

        const schema = Joi.object({
            refresh_token: Joi.string()
                .required(),
        });

        const validated = schema.validate({
            refresh_token,
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

export default AuthRefreshTokenValidator;