import BaseDto from "./BaseDto";
import ObjectiveWeaponModel from "../../database/models/ObjectiveWeaponModel";

class ObjectiveWeaponDto extends BaseDto {

    public id?: number | null;
    public weapon_id: number;
    public objective_id: number;

    public constructor(
        weapon_id: number,
        objective_id: number,
        id?: number,
    ) {
        super();

        this.id = id ? id : null;
        this.weapon_id = weapon_id;
        this.objective_id = objective_id;
    }

    static modelToDto(model: ObjectiveWeaponModel): ObjectiveWeaponDto {
        return new ObjectiveWeaponDto(
            model.weapon_id,
            model.objective_id,
            model.id,
        );
    }

}

export default ObjectiveWeaponDto;