import UserEquipamentRepository from "../../../api/Repositories/UserEquipamentRepository";

class MockUserEquipamentRepository implements UserEquipamentRepository {

    findById(id: number): any {
        if (id <= 0 || id > 1000) {
            return undefined;
        }

        return {
            id,
            equipament_id: 1,
            user_id: 1,
            have_equipament: 1,
        }
    }

    findByEquipamentAndUser(equipamentId: number, userId: number): any {
        if (equipamentId <= 0 || equipamentId > 1000) {
            return undefined;
        }

        return {
            equipament_id: equipamentId,
            user_id: userId,
            have_equipament: 0,
        }
    }

    update(equipamentId: number, userId: number, haveEquipament: boolean): any { }

    insert(equipamentId: number, userId: number, haveEquipament: boolean): any { }

}

export default MockUserEquipamentRepository;