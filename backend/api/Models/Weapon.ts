import WeaponModel from "../../database/models/WeaponModel";

class Weapon {
    id: number;
    name: string;
    price: number;
    created_at: string;
    updated_at: string;
    user_id: number | null;
    have_weapon: boolean | null;

    constructor(
        id: number,
        name: string,
        price: number,
        user_id: number | null,
        have_weapon: boolean | null,
        created_at: string,
        updated_at: string
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.user_id = user_id;
        this.have_weapon = have_weapon;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static convert(weaponDB: WeaponModel): Weapon {
        return new Weapon(
            weaponDB.id,
            weaponDB.name,
            weaponDB.price,
            weaponDB.user_id,
            weaponDB.have_weapon,
            weaponDB.created_at,
            weaponDB.updated_at
        );
    }

    static convertArray(weaponDBArray: WeaponModel[]): Weapon[] {
        return weaponDBArray.map(weaponDB =>
            this.convert(weaponDB)
        );
    }
}

export default Weapon;
