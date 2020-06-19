import BaseDto from "./BaseDto";
import MissionDto from "./MissionDto";
import MissionModel from "../../database/models/MissionModel";
import AnimalModel from "../../database/models/AnimalModel";

class AnimalDto extends BaseDto {
    public id: number;
    public name: string;
    public missions: MissionDto[];
    public created_at: string;
    public updated_at: string;

    public constructor(
        id: number,
        name: string,
        missions: any[],
        created_at: string,
        updated_at: string,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.missions = MissionDto.toDto(missions);
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static modelToDto(model: AnimalModel): AnimalDto {
        return new AnimalDto(
            model.id,
            model.name,
            model.missions,
            model.created_at,
            model.updated_at,
        );
    }
}

export default AnimalDto;