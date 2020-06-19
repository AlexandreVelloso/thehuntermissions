import WeaponDto from "../Dtos/WeaponDto";
import ObjectiveDto from "../Dtos/ObjectiveDto";

export function userHasSomeObjectiveWeapon(weapons: WeaponDto[]) {
    return weapons.length === 0 || weapons.some((w) => w.have_weapon);
}

export function allObjectivesAreAvaliable(objectives: ObjectiveDto[]) {
    return objectives.every(objective => objective.user_has_weapon);
}