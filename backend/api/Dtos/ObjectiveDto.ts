import BaseDto from "./BaseDto";
import WeaponDto from "./WeaponDto";
import ObjectiveModel from "../../database/models/ObjectiveModel";

class ObjectiveDto extends BaseDto {

    public id: number;
    public name: string;
    public mission_id: number;
    public created_at: string;
    public updated_at: string;
    public user_id: number | null;
    public completed: boolean;
    public have_weapon: boolean;
    public weapons: WeaponDto[];

    public constructor(
        id: number,
        name: string,
        mission_id: number,
        user_id: number | null,
        completed: number | null,
        weapons: WeaponDto[] | null,
        created_at: string,
        updated_at: string
    ) {
        super();

        this.id = id;
        this.name = name;
        this.mission_id = mission_id;
        this.user_id = user_id;
        this.completed = completed === 1;
        this.have_weapon = false;
        this.weapons = weapons ? weapons.slice() : [];
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static modelToDto(model: ObjectiveModel): ObjectiveDto {
        return new ObjectiveDto(
            model.id,
            model.name,
            model.mission_id,
            model.user_id,
            model.completed,
            model.weapons,
            model.created_at,
            model.updated_at,
        );
    }
}

export default ObjectiveDto;