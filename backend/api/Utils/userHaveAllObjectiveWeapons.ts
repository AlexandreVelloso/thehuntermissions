import Weapon from '../Models/Weapon';

export default function userHasSomeObjectiveWeapon(weapons: Weapon[]) {
    return weapons.length === 0 || weapons.some((w) => w.have_weapon);
}
