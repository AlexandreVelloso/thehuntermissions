import Joi from "@hapi/joi";

import BaseValidator from "./BaseValidator";
import ValidationException from "../Exceptions/ValidationException";

class AuthRefreshTokenValidator implements BaseValidator {

    validate(req: any) {
        const { refreshToken } = req.body;

        const schema = Joi.object({
            refreshToken: Joi.string()
                .required(),
        });

        const validated = schema.validate({
            refreshToken,
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