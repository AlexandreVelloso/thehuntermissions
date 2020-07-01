import UserWeaponModel from '../../database/models/UserWeaponModel';

export async function generateUserWeapon(userId: number, weaponId: number, haveWeapon: boolean) {
    return UserWeaponModel.query()
        .insert({
            user_id: userId,
            weapon_id: weaponId,
            have_weapon: haveWeapon,
        });
}