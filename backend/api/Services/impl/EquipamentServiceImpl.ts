import EquipamentService from "../EquipamentService";
import EquipamentRepository from "../../Repositories/EquipamentRepository";
import UserEquipamentRepository from "../../Repositories/UserEquipamentRepository";
import EquipamentModel from "../../../database/models/EquipamentModel";
import EquipamentDto from "../../Dtos/EquipamentDto";
import EntityNotFoundException from "../../Exceptions/EntityNotFoundException";
import UserEquipamentModel from "../../../database/models/UserEquipamentModel";

class EquipamentServiceImpl implements EquipamentService {

    private equipamentRepository: EquipamentRepository;
    private userEquipamentRepository: UserEquipamentRepository;

    public constructor(opts: any) {
        this.equipamentRepository = opts.equipamentRepository;
        this.userEquipamentRepository = opts.userEquipamentRepository;
    }

    async index(userId: number): Promise<EquipamentDto[]> {
        const equipaments: EquipamentModel[] = await this.equipamentRepository
            .getEquipamentByUser(userId);

        return EquipamentDto.toDto(equipaments);
    }

    async get(equipamentId: number, userId: number): Promise<EquipamentDto> {
        const equipament: EquipamentModel = await this.equipamentRepository
            .findEquipamentByUser(equipamentId, userId);

        if (!equipament) {
            throw new EntityNotFoundException('Equipament not found');
        }

        return EquipamentDto.toDto(equipament);
    }

    async update(equipamentId: number, haveEquipament: boolean, userId: number): Promise<void> {
        const equipament: EquipamentModel = await this.equipamentRepository
            .findById(equipamentId);

        if (!equipament) {
            throw new EntityNotFoundException('Equipament not found');
        }

        const userEquipament: UserEquipamentModel = await this.userEquipamentRepository
            .findByEquipamentAndUser(equipamentId, userId);

        if (userEquipament) {
            await this.userEquipamentRepository
                .update(equipamentId, userId, haveEquipament);
        } else {
            await this.userEquipamentRepository
                .insert(equipamentId, userId, haveEquipament);
        }
    }

}

export default EquipamentServiceImpl;