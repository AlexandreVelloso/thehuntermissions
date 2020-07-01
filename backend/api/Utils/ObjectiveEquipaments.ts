import EquipamentDto from "../Dtos/EquipamentDto";
import ObjectiveDto from "../Dtos/ObjectiveDto";

export function userHasSomeObjectiveEquipament(equipaments: EquipamentDto[]) {
    return equipaments.length === 0 || equipaments.some((e) => e.have_equipament);
}

export function allObjectivesEquipamentsAreAvaliable(objectives: ObjectiveDto[]) {
    return objectives.every((objective) => objective.user_has_equipament);
}