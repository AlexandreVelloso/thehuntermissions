import EquipamentService from '../../api/Services/EquipamentService';
import EquipamentServiceImpl from '../../api/Services/impl/EquipamentServiceImpl';

import MockEquipamentRepository from '../__mocks__/Repositories/MockEquipamentRepository';
import MockuserEquipamentRepository from '../__mocks__/Repositories/MockuserEquipamentRepository';
import EntityNotFoundException from '../../api/Exceptions/EntityNotFoundException';

let equipamentService: EquipamentService;

beforeAll(() => {
    equipamentService = new EquipamentServiceImpl({
        equipamentRepository: new MockEquipamentRepository(),
        userEquipamentRepository: new MockuserEquipamentRepository(),
    });
});

describe('Equipaments Service - Index', () => {
    it('should list all equipaments for a user', async () => {
        const result = await equipamentService.index(1);

        expect(result)
            .toEqual([
                {
                    id: 1,
                    name: 'Equipament 1',
                    price: 100,
                    user_id: 1,
                    have_equipament: true,
                    created_at: '',
                    updated_at: '',
                },
                {
                    id: 2,
                    name: 'Equipament 2',
                    price: 200,
                    user_id: 1,
                    have_equipament: true,
                    created_at: '',
                    updated_at: '',
                }
            ]);
    });
});

describe('Equipament Service - Get', () => {
    it('should retrieve an equipament from a user', async () => {
        const equipamentId = 1;
        const userId = 1;

        const result = await equipamentService.get(equipamentId, userId);

        expect(result)
            .toEqual({
                id: equipamentId,
                name: 'Equipament 1',
                price: 100,
                user_id: userId,
                have_equipament: true,
                created_at: '',
                updated_at: '',
            });
    });

    it('should throw exception when equipament not found', async () => {
        const equipamentId = 0;
        const userId = 1;

        expect(equipamentService.get(equipamentId, userId))
            .rejects
            .toEqual(new EntityNotFoundException('Equipament not found'));
    });
});

describe('Equipament Service - Update', () => {
    it('should update an equipament when user have equipament', async () => {
        const equipamentId = 1;
        const userId = 1;
        const haveEquipament = true;

        expect(equipamentService.update(equipamentId, haveEquipament, userId))
            .resolves
            .toBeUndefined();
    });

    it('should update a weapon when user does not have weapon', async () => {
        const equipamentId = 100;
        const haveEquipament = true;
        const userId = 1;

        expect(equipamentService.update(equipamentId, haveEquipament, userId))
            .resolves
            .toBeUndefined();
    });

    it('should throw exception when not found equipament', async () => {
        const equipamentId = 0;
        const haveEquipament = true;
        const userId = 1;

        expect(equipamentService.update(equipamentId, haveEquipament, userId))
            .rejects
            .toEqual(new EntityNotFoundException('Equipament not found'));
    });
});