import WeaponModel from "../../database/models/WeaponModel";
import BaseDto from "./BaseDto";

class WeaponDto extends BaseDto {

    public id: number;
    public name: string;
    public price: number;
    public user_id: number;
    public have_weapon: boolean;
    public created_at: any;
    public updated_at: any;

    public constructor(
        id: number,
        name: string,
        price: number,
        user_id: number,
        have_weapon: number,
        created_at: any,
        updated_at: any
    ) {
        super();

        this.id = id;
        this.name = name;
        this.price = price;
        this.user_id = user_id;
        this.have_weapon = have_weapon === 1;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static modelToDto(model: any): WeaponDto {
        return new WeaponDto(
            model.id,
            model.name,
            model.price,
            model.user_id,
            model.have_weapon,
            model.created_at,
            model.updated_at,
        );
    }
}

export default WeaponDto;