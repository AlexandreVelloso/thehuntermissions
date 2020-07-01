import { Model } from 'objection';
import Knex from 'knex';

import ObjectiveModel from '../models/ObjectiveModel';
import ObjectiveDto from '../../api/Dtos/ObjectiveDto';
import EquipamentDto from '../../api/Dtos/EquipamentDto';
import ObjectiveEquipamentDto from '../../api/Dtos/ObjectiveEquipamentDto';
import ObjectiveEquipamentModel from '../models/ObjectiveEquipamentModel';
import EquipamentModel from '../models/EquipamentModel';

async function findObjectivesByName(equipament: string) {
    return ObjectiveModel.query()
        .where('name', 'like', `%${equipament}%`)
        .select('*');
}

async function findEquipamentByName(name: string) {
    return EquipamentModel.query()
        .where('name', name)
        .first();
}

async function addObjectivesEquipament(knex: Knex, objectives: ObjectiveDto[], equipament: EquipamentDto) {
    const objectivesEquipaments: ObjectiveEquipamentDto[] = [];

    objectives.forEach((objective) => {
        objectivesEquipaments.push({
            objective_id: objective.id,
            equipament_id: equipament.id,
        });
    });

    if (process.env.NODE_ENV === 'production') {
        await knex('objectives_equipaments')
            .insert(objectivesEquipaments);
    } else {
        await ObjectiveEquipamentModel.query()
            .insertGraph(objectivesEquipaments);
    }
}

async function groundBlind(knex: Knex) {
    const equipament = await findEquipamentByName('Ground Blind');

    const objectivesDB = await findObjectivesByName(', Blind');

    const objectives: ObjectiveDto[] = objectivesDB
        .filter(objective => objective.name.indexOf('Waterflow Blind') === -1)
        .filter(objective => objective.name.indexOf('blinds and towers are not allowed.') === -1)
        .map(objective => ObjectiveDto.modelToDto(objective));

    await addObjectivesEquipament(knex, objectives, equipament);
}

async function huntingTower(knex: Knex) {
    const equipament = await findEquipamentByName('Hunting Tower');

    const objectivesDB = await findObjectivesByName('tower');

    const objectives: ObjectiveDto[] = objectivesDB
        .filter(objective => objective.name.indexOf('Middle Tower') === -1)
        .filter(objective => objective.name.indexOf('blinds and towers are not allowed.') === -1)
        .filter(objective => objective.name.indexOf('arrive at Tower') === -1)
        .filter(objective => objective.name.indexOf('of Tower') === -1)
        .map(objective => ObjectiveDto.modelToDto(objective));

    await addObjectivesEquipament(knex, objectives, equipament);
}

async function shootingTripodRest(knex: Knex) {
    const equipament = await findEquipamentByName('Shooting Tripod Rest');

    const objectivesDB = await findObjectivesByName('shooting');

    const objectives: ObjectiveDto[] = objectivesDB
        .map(objective => ObjectiveDto.modelToDto(objective));

    await addObjectivesEquipament(knex, objectives, equipament);
}

async function treeStand(knex: Knex) {
    const equipament = await findEquipamentByName('Tree Stand');

    const objectivesDB = await findObjectivesByName('tree');

    const objectives: ObjectiveDto[] = objectivesDB
        .map(objective => ObjectiveDto.modelToDto(objective));

    await addObjectivesEquipament(knex, objectives, equipament);
}

async function tripodStand(knex: Knex) {
    const equipament = await findEquipamentByName('Tripod Stand');

    const objectivesDB = await findObjectivesByName('tripod');

    const objectives: ObjectiveDto[] = objectivesDB
        .filter(objective => objective.name
            .toLowerCase()
            .indexOf('shooting tripod') === -1
        )
        .map(objective => ObjectiveDto.modelToDto(objective));

    await addObjectivesEquipament(knex, objectives, equipament);
}

async function waterfowlBlind(knex: Knex) {
    const equipament = await findEquipamentByName('Waterfowl Blind');

    const objectivesDB = await findObjectivesByName('waterfowl');

    const objectives: ObjectiveDto[] = objectivesDB
        .map(objective => ObjectiveDto.modelToDto(objective));

    await addObjectivesEquipament(knex, objectives, equipament);
}

exports.seed = (knex: Knex) => {
    Model.knex(knex);

    return knex('objectives_equipaments').del()
        .then(async () => {
            await groundBlind(knex);
            await huntingTower(knex);
            await shootingTripodRest(knex);
            await treeStand(knex);
            await tripodStand(knex);
            await waterfowlBlind(knex);
        });
}