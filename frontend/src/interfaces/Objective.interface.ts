import Weapon from './Weapon.interface';

interface Objective {
    id: number,
    name: string,
    mission_id: number,
    user_id: number | null,
    completed: boolean,
    weapons: Weapon[],
    user_has_weapon: boolean,
    created_at: string,
    updated_at: string,
}

export default Objective;
