import BaseValidator from "./BaseValidator";
import Joi from "@hapi/joi";
import ValidationException from "../Exceptions/ValidationException";

class UpdateWeaponValidator implements BaseValidator {

    validate(req: any): any {
        const { id: weaponId } = req.params;
        const { have_weapon: haveWeapon } = req.body;

        const schema = Joi.object({
            weaponId: Joi.number()
                .min(1)
                .required(),

            haveWeapon: Joi.boolean()
                .required()
        });

        const validated = schema.validate({
            weaponId,
            haveWeapon
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

export default UpdateWeaponValidator;