import Objective from "./Objective";

export default interface Mission {
    id: number;
    name: string;
    reward: number;
    hint: string;
    animal_id: number;
    user_has_weapon: boolean;
    created_at: string;
    updated_at: string;
    objectives: Objective[];
}