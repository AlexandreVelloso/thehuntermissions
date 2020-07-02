interface Equipament {
    id: number,
    name: string,
    price: number,
    user_id: number | null,
    have_equipament: boolean,
    created_at: string,
    updated_at: string,
}

export default Equipament;