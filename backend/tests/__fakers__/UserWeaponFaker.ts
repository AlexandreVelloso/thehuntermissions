import faker from 'faker';

import UserWeaponModel from '../../database/models/UserWeaponModel';

export async function generateUserWeapon(userId: number, weaponId: number, haveWeapon: boolean) {
    return await UserWeaponModel.query()
        .insert({
            user_id: userId,
            weapon_id: weaponId,
            have_weapon: haveWeapon,
        });
}