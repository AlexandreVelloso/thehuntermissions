import Joi from "@hapi/joi";

import BaseValidator from "./BaseValidator";
import ValidationException from "../Exceptions/ValidationException";

class UpdateEquipamentValidator implements BaseValidator {

    validate(req: any): any {
        const { id: equipamentId } = req.params;
        const { have_equipament: haveEquipament } = req.body;

        const schema = Joi.object({
            equipamentId: Joi.number()
                .min(1)
                .required(),

            haveEquipament: Joi.boolean()
                .required(),
        });

        const validated = schema.validate({
            equipamentId,
            haveEquipament,
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

export default UpdateEquipamentValidator;