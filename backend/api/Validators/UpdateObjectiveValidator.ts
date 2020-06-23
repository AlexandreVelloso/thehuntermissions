import Joi from "@hapi/joi";

import BaseValidator from "./BaseValidator";
import ValidationException from "../Exceptions/ValidationException";

class UpdateObjectiveValidator implements BaseValidator {

    validate(req: any): any {
        const { id: objectiveId } = req.params;
        const { completed } = req.body;

        const schema = Joi.object({
            objectiveId: Joi.number()
                .min(1)
                .required(),

            completed: Joi.boolean()
                .required()
        });

        const validated = schema.validate({
            objectiveId,
            completed
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

export default UpdateObjectiveValidator;