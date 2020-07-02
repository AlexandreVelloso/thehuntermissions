import StartEquipamentsService from "../StartEquipamentsService";
import EquipamentRepository from "../../Repositories/EquipamentRepository";
import UserEquipamentRepository from "../../Repositories/UserEquipamentRepository";
import EquipamentModel from "../../../database/models/EquipamentModel";

class StartEquipamentsServiceImpl implements StartEquipamentsService {

    private equipamentRepository: EquipamentRepository;
    private userEquipamentRepository: UserEquipamentRepository;

    public constructor(opts: any) {
        this.equipamentRepository = opts.equipamentRepository;
        this.userEquipamentRepository = opts.userEquipamentRepository;
    }

    public async addEquipament(userId: number): Promise<void> {
        const equipament: EquipamentModel = await this.equipamentRepository
            .findEquipamentByName('Hunting Tower');

        await this.userEquipamentRepository
            .insert(equipament.id, userId, true);
    }
}

export default StartEquipamentsServiceImpl;