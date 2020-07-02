import MissionRepository from "../MissionRepository";
import MissionModel from "../../../database/models/MissionModel";

class MissionRepositoryImpl implements MissionRepository {

    async findById(missionId: number): Promise<MissionModel> {
        return await MissionModel.query()
            .where('id', missionId)
            .first();
    }

    async findMissionByUser(missionId: number, userId: any): Promise<MissionModel> {
        return await MissionModel.query()
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
                    })
                    .withGraphFetched('equipaments')
                    .modifyGraph('equipaments', (builder) => {
                        builder.select('equipaments.*', 'user_equipaments.have_equipament')
                            // eslint-disable-next-line func-names
                            .leftJoin('user_equipaments', function () {
                                this.on('equipaments.id', 'user_equipaments.equipament_id')
                                    .on('user_equipaments.user_id', userId);
                            });
                    });
            })
            .where('missions.id', missionId)
            .first();
    }

    async getMissionsByUser(userId: any): Promise<MissionModel[]> {
        return await MissionModel.query()
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
                    })
                    .withGraphFetched('equipaments')
                    .modifyGraph('equipaments', (builder) => {
                        builder.select('equipaments.*', 'user_equipaments.have_equipament')
                            // eslint-disable-next-line func-names
                            .leftJoin('user_equipaments', function () {
                                this.on('equipaments.id', 'user_equipaments.equipament_id')
                                    .on('user_equipaments.user_id', userId);
                            });
                    });
            });
    }

}

export default MissionRepositoryImpl;