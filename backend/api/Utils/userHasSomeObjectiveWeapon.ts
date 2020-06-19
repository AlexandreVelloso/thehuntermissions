import WeaponDto from "../Dtos/WeaponDto";

export default function userHasSomeObjectiveWeapon(weapons: WeaponDto[]) {
    return weapons.length === 0 || weapons.some((w) => w.have_weapon);
}
