import UserEquipamentModel from '../../database/models/UserEquipamentModel';

export async function generateUserEquipament(userId: number, equipamentId: number, haveEquipament: boolean) {
    return UserEquipamentModel.query()
        .insert({
            user_id: userId,
            equipament_id: equipamentId,
            have_equipament: haveEquipament,
        });
}