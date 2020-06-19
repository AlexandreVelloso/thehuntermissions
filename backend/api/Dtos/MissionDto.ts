import BaseDto from "./BaseDto";
import ObjectiveDto from "./ObjectiveDto";
import MissionModel from "../../database/models/MissionModel";
import { allObjectivesAreAvaliable } from "../Utils/ObjectiveWeapons";

class MissionDto extends BaseDto {
    public id: number;
    public name: string;
    public reward: number;
    public hint: string;
    public animal_id: number;
    public user_has_weapon: boolean;
    public created_at: string;
    public updated_at: string;
    public objectives: ObjectiveDto[];

    public constructor(
        id: number,
        name: string,
        reward: number,
        hint: string,
        animal_id: number,
        objectives: any[],
        created_at: string,
        updated_at: string,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.reward = reward;
        this.hint = hint;
        this.animal_id = animal_id;
        this.objectives = ObjectiveDto.toDto(objectives);
        this.user_has_weapon = allObjectivesAreAvaliable(this.objectives);
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static modelToDto(model: MissionModel): MissionDto {
        return new MissionDto(
            model.id,
            model.name,
            model.reward,
            model.hint,
            model.animal_id,
            model.objectives,
            model.created_at,
            model.updated_at,
        );
    }
}

export default MissionDto;