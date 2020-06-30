interface Weapon {
    id: number,
    name: string,
    price: number,
    user_id: number | null,
    have_weapon: boolean,
    created_at: string,
    updated_at: string,
}

export default Weapon;
