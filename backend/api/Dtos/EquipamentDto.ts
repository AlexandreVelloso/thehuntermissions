import BaseDto from "./BaseDto";
import EquipamentModel from "../../database/models/EquipamentModel";

class EquipamentDto extends BaseDto {
    public id: number;
    public name: string;
    public price: number;
    public user_id: number | null;
    public have_equipament: boolean;
    public created_at: any;
    public updated_at: any;

    public constructor(
        id: number,
        name: string,
        price: number,
        user_id: number | null,
        have_equipament: number,
        created_at: any,
        updated_at: any,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.price = price;
        this.user_id = user_id;
        this.have_equipament = have_equipament === 1;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static modelToDto(model: EquipamentModel): EquipamentDto {
        return new EquipamentDto(
            model.id,
            model.name,
            model.price,
            model.user_id,
            model.have_equipament,
            model.created_at,
            model.updated_at,
        );
    }
}

export default EquipamentDto;