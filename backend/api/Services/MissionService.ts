import Mission from '../../database/models/MissionModel';
import Objective from '../../database/models/ObjectiveModel';
import UserObjective from '../../database/models/UserObjectiveModel';
import EntityNotFoundException from '../Exceptions/EntityNotFoundException';
import userHaveAllObjectiveWeapons from '../Utils/userHaveAllObjectiveWeapons';

class MissionService {
    static async index(userId: string) {
        const missions = await Mission.query()
            .select('missions.*')
            .withGraphFetched('objectives')
            .modifyGraph('objectives', (objectivesBuilder) => {
                objectivesBuilder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
                    // eslint-disable-next-line func-names
                    .leftJoin('user_objectives', function () {
                        this.on('objectives.id', 'user_objectives.objective_id')
                            .on('user_objectives.user_id', userId);
                    })
                    .withGraphFetched('weapons')
                    .modifyGraph('weapons', (weaponsBuilder) => {
                        weaponsBuilder.select('weapons.*', 'user_weapons.have_weapon')
                            // eslint-disable-next-line func-names
                            .leftJoin('user_weapons', function () {
                                this.on('weapons.id', 'user_weapons.weapon_id')
                                    .on('user_weapons.user_id', userId);
                            });
                    });
            });

        for (let missionIndex = 0; missionIndex < missions.length; missionIndex += 1) {
            const objectivesLength = missions[missionIndex].objectives.length;
            let userHasWeapon = true;

            // eslint-disable-next-line max-len
            for (let objectivesIndex = 0; objectivesIndex < objectivesLength; objectivesIndex += 1) {
                const { weapons } = missions[missionIndex]
                    .objectives[objectivesIndex];

                const hasSomeWeapon = userHaveAllObjectiveWeapons(weapons);

                if (!hasSomeWeapon) {
                    userHasWeapon = false;
                }
            }

            missions[missionIndex].user_has_weapon = userHasWeapon;
        }

        return missions;
    }

    static async get(missionId: string, userId: string) {
        const mission = await Mission.query()
            .select('missions.*')
            .withGraphFetched('objectives')
            .modifyGraph('objectives', (objectivesBuilder) => {
                objectivesBuilder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
                    // eslint-disable-next-line func-names
                    .leftJoin('user_objectives', function () {
                        this.on('objectives.id', 'user_objectives.objective_id')
                            .on('user_objectives.user_id', userId);
                    })
                    .withGraphFetched('weapons')
                    .modifyGraph('weapons', (weaponsBuilder) => {
                        weaponsBuilder.select('weapons.*', 'user_weapons.have_weapon')
                            // eslint-disable-next-line func-names
                            .leftJoin('user_weapons', function () {
                                this.on('weapons.id', 'user_weapons.weapon_id')
                                    .on('user_weapons.user_id', userId);
                            });
                    });
            })
            .where('missions.id', missionId)
            .first();

        if (!mission) {
            throw new EntityNotFoundException('Mission not found');
        }

        const objectivesLength = mission.objectives.length;
        let userHasWeapon = true;

        for (let objectivesIndex = 0; objectivesIndex < objectivesLength; objectivesIndex += 1) {
            const { weapons } = mission
                .objectives[objectivesIndex];

            const hasSomeWeapon = userHaveAllObjectiveWeapons(weapons);

            if (!hasSomeWeapon) {
                userHasWeapon = false;
            }
        }

        mission.user_has_weapon = userHasWeapon;

        return mission;
    }

    static async update(missionId: string, missionCompleted: string, userId: string) {
        const mission = await Mission.query()
            .findById(missionId);

        if (!mission) {
            throw new EntityNotFoundException('Mission not found');
        }

        const objectivesIds = await Objective.query()
            .where('mission_id', String(mission.id))
            .then((items) => items.map((item) => item.id));

        const objectivesToPatch = await UserObjective.query()
            .where('user_id', userId)
            .where('objective_id', 'in', objectivesIds)
            .then((items) => items.map((item) => item.objective_id));

        // eslint-disable-next-line max-len
        const objectivesToInsert = objectivesIds.filter((objectiveId) => objectivesToPatch.indexOf(objectiveId) === -1);

        if (objectivesToPatch.length > 0) {
            await UserObjective.query()
                .where('objective_id', 'in', objectivesToPatch)
                .update({ completed: missionCompleted });
        }

        if (objectivesToInsert.length > 0) {
            const arrayToInsert = objectivesToInsert.map((objectiveId) => ({
                objective_id: objectiveId,
                user_id: userId,
                completed: missionCompleted,
            }));

            await UserObjective.query()
                .insertGraph(arrayToInsert);
        }
    }
}

export default MissionService;
