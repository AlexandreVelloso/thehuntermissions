import EquipamentRepository from "../../../api/Repositories/EquipamentRepository";

class MockEquipamentRepository implements EquipamentRepository {

    public findById(equipamentId: number): any {
        if (equipamentId <= 0 || equipamentId > 1000) {
            return undefined;
        }

        return {
            id: 1,
            name: 'Equipament 1',
            price: 100,
            user_id: 1,
            have_equipament: 1,
            created_at: '',
            updated_at: '',
        }
    }

    public getEquipamentByUser(userId: number): any {
        return [
            {
                id: 1,
                name: 'Equipament 1',
                price: 100,
                user_id: userId,
                have_equipament: 1,
                created_at: '',
                updated_at: '',
            },
            {
                id: 2,
                name: 'Equipament 2',
                price: 200,
                user_id: userId,
                have_equipament: 1,
                created_at: '',
                updated_at: '',
            }
        ];
    }

    findEquipamentByUser(equipamentId: number, userId: any): any {
        if (equipamentId <= 0 || equipamentId > 1000) {
            return undefined;
        }

        return {
            id: equipamentId,
            name: 'Equipament 1',
            price: 100,
            user_id: userId,
            have_equipament: 1,
            created_at: '',
            updated_at: '',
        }
    }

}

export default MockEquipamentRepository;