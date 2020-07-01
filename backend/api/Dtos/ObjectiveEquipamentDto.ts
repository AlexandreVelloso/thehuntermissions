import BaseDto from "./BaseDto";
import ObjectiveEquipamentModel from "../../database/models/ObjectiveEquipamentModel";

class ObjectiveEquipamentDto extends BaseDto {
    public id?: number | null;
    public objective_id: number;
    public equipament_id: number;

    public constructor(
        objective_id: number,
        equipament_id: number,
        id?: number | null,
    ) {
        super();

        this.id = id ? id : null;
        this.objective_id = objective_id;
        this.equipament_id = equipament_id;
    }

    static modelToDto(model: ObjectiveEquipamentModel): ObjectiveEquipamentDto {
        return new ObjectiveEquipamentDto(
            model.objective_id,
            model.equipament_id,
            model.id,
        )
    }
}

export default ObjectiveEquipamentDto;
