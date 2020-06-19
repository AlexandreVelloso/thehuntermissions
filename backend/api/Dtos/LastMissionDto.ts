import BaseDto from "./BaseDto";
import MissionDto from "./MissionDto";

class LastMissionDto extends BaseDto {
    public id: number;
    public name: string;
    public mission: MissionDto | null;
    public created_at: string;
    public updated_at: string;

    public constructor(
        id: number,
        name: string,
        mission: MissionDto | undefined,
        created_at: string,
        updated_at: string,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.mission = mission ? MissionDto.toDto(mission) : null;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static modelToDto(model: any): LastMissionDto {
        return new LastMissionDto(
            model.id,
            model.name,
            model.mission,
            model.created_at,
            model.updated_at,
        );
    }
}

export default LastMissionDto;