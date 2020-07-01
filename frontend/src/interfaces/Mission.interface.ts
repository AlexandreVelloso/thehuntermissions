import Objective from './Objective.interface';

interface Mission {
    id: number,
    name: string,
    reward: number,
    hint: string,
    animal_id: number,
    objectives: Objective[],
    user_has_weapon: boolean,
    user_has_equipament: boolean,
    created_at: string,
    updated_at: string,
}

export default Mission;
