import EntityNotFoundException from '../Exceptions/EntityNotFoundException';
import userHaveAllObjectiveWeapons from '../Utils/userHasSomeObjectiveWeapon';
import MissionService from './MissionService';
import UserModel from '../../database/models/UserModel';
import MissionRepository from '../Repositories/MissionRepository';
import ObjectiveRepository from '../Repositories/ObjectiveRepository';
import UserObjectiveRepository from '../Repositories/UserObjectiveRepository';
import MissionModel from '../../database/models/MissionModel';
import MissionDto from '../Dtos/MissionDto';

class MissionServiceImpl implements MissionService {

    private missionRepository: MissionRepository;
    private objectiveRepository: ObjectiveRepository;
    private userObjectiveRepository: UserObjectiveRepository;

    public constructor(
        missionRepository: MissionRepository,
        objectiveRepository: ObjectiveRepository,
        userObjectiveRepository: UserObjectiveRepository,
    ) {
        this.missionRepository = missionRepository;
        this.objectiveRepository = objectiveRepository;
        this.userObjectiveRepository = userObjectiveRepository;
    }

    async index(userId: any): Promise<UserModel[]> {
        const missions: MissionModel[] = await this.missionRepository
            .getMissionsByUser(userId);

        const missionsDtos = MissionDto.toDto(missions);

        for (let missionIndex = 0; missionIndex < missionsDtos.length; missionIndex += 1) {
            const objectivesLength = missionsDtos[missionIndex].objectives.length;
            let userHasWeapon = true;

            // eslint-disable-next-line max-len
            for (let objectivesIndex = 0; objectivesIndex < objectivesLength; objectivesIndex += 1) {
                const { weapons } = missionsDtos[missionIndex]
                    .objectives[objectivesIndex];

                const hasSomeWeapon = userHaveAllObjectiveWeapons(weapons);

                if (!hasSomeWeapon) {
                    userHasWeapon = false;
                }
            }

            missionsDtos[missionIndex].user_has_weapon = userHasWeapon;
        }

        return missionsDtos;
    }

    async get(missionId: any, userId: any): Promise<UserModel> {
        const mission: MissionModel = await this.missionRepository
            .findMissionByUser(missionId, userId);

        if (!mission) {
            throw new EntityNotFoundException('Mission not found');
        }

        const missionDto = MissionDto.toDto(mission);

        const objectivesLength = missionDto.objectives.length;
        let userHasWeapon = true;

        for (let objectivesIndex = 0; objectivesIndex < objectivesLength; objectivesIndex += 1) {
            const { weapons } = missionDto
                .objectives[objectivesIndex];

            const hasSomeWeapon = userHaveAllObjectiveWeapons(weapons);

            if (!hasSomeWeapon) {
                userHasWeapon = false;
            }
        }

        missionDto.user_has_weapon = userHasWeapon;

        return missionDto;
    }

    async update(missionId: number, missionCompleted: boolean, userId: number): Promise<void> {
        const mission: MissionModel = await this.missionRepository
            .findById(missionId);

        if (!mission) {
            throw new EntityNotFoundException('Mission not found');
        }

        const objectivesIds: number[] = await this.objectiveRepository
            .getObjectivesByMissionId(missionId)
            .then((items) => items.map((item) => item.id));

        const objectivesToPatch: number[] = await this.userObjectiveRepository
            .getObjectivesByUserWhereObjectivesIn(userId, objectivesIds)
            .then((items) => items.map((item) => item.objective_id));

        // eslint-disable-next-line max-len
        const objectivesToInsert: number[] = objectivesIds.filter((objectiveId) => objectivesToPatch.indexOf(objectiveId) === -1);

        if (objectivesToPatch.length > 0) {
            await this.userObjectiveRepository
                .updateMany(objectivesToPatch, missionCompleted);
        }

        if (objectivesToInsert.length > 0) {
            const arrayToInsert = objectivesToInsert.map((objectiveId) => ({
                objective_id: objectiveId,
                user_id: userId,
                completed: missionCompleted,
            }));

            await this.userObjectiveRepository
                .insertMany(arrayToInsert);
        }
    }
}

export default MissionServiceImpl;
