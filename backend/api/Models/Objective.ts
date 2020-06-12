import Weapon from "./Weapon";
import ObjectiveModel from "../../database/models/ObjectiveModel";

class Objective {
    id: number;
    name: string;
    mission_id: number;
    created_at: string;
    updated_at: string;
    user_id: number | null;
    completed: number | null;
    weapons: Weapon[];

    constructor(
        id: number,
        name: string,
        mission_id: number,
        user_id: number | null,
        completed: number | null,
        weapons: Weapon[] | null,
        created_at: string,
        updated_at: string
    ) {
        this.id = id;
        this.name = name;
        this.mission_id = mission_id;
        this.user_id = user_id;
        this.completed = completed;
        this.weapons = weapons ? weapons.slice() : [];
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static convert(objectiveDB: ObjectiveModel): Objective {
        return new Objective(
            objectiveDB.id,
            objectiveDB.name,
            objectiveDB.mission_id,
            objectiveDB.user_id,
            objectiveDB.completed,
            objectiveDB.weapons,
            objectiveDB.created_at,
            objectiveDB.updated_at
        );
    }

    static convertArray(objectivesDBrray: ObjectiveModel[]): Objective[] {
        return objectivesDBrray.map(objectiveDB =>
            this.convert(objectiveDB)
        );
    }
}

export default Objective;