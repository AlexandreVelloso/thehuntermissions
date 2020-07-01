import EquipamentDto from "../Dtos/EquipamentDto";

interface EquipamentService {

    index(userId: number): Promise<EquipamentDto[]>;

    get(equipamentId: number, userId: number): Promise<EquipamentDto>;

    update(equipamentId: number, haveEquipament: boolean, userId: number): Promise<void>;

}

export default EquipamentService;