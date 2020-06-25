import BaseDto from "./BaseDto";
import WeaponDto from "./WeaponDto";
import ObjectiveModel from "../../database/models/ObjectiveModel";
import { userHasSomeObjectiveWeapon } from "../Utils/ObjectiveWeapons";

class ObjectiveDto extends BaseDto {

    public id: number;
    public name: string;
    public mission_id: number;
    public user_id: number | null;
    public completed: boolean;
    public user_has_weapon: boolean;
    public weapons: WeaponDto[];
    public created_at: string;
    public updated_at: string;

    public constructor(
        id: number,
        name: string,
        mission_id: number,
        user_id: number | null,
        completed: boolean,
        weapons: WeaponDto[] | null,
        created_at: string,
        updated_at: string
    ) {
        super();

        this.id = id;
        this.name = name;
        this.mission_id = mission_id;
        this.user_id = user_id;
        this.completed = completed;
        this.weapons = weapons ? weapons.slice() : [];
        this.user_has_weapon = userHasSomeObjectiveWeapon(this.weapons);
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static modelToDto(model: ObjectiveModel): ObjectiveDto {
        let completed;

        if (model.completed instanceof Number) {
            completed = completed === 1;
        } else {
            completed = model.completed;
        }

        return new ObjectiveDto(
            model.id,
            model.name,
            model.mission_id,
            model.user_id,
            completed,
            model.weapons,
            model.created_at,
            model.updated_at,
        );
    }
}

export default ObjectiveDto;