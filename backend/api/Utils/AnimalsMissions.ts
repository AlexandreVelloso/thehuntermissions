import ObjectiveDto from '../Dtos/ObjectiveDto';
import MissionDto from '../Dtos/MissionDto';
import LastMissionDto from '../Dtos/LastMissionDto';
import AnimalDto from '../Dtos/AnimalDto';

export function isAllObjectivesCompleted(objectives: ObjectiveDto[]): boolean {
    return objectives.every((objective) => objective.completed);
}

export function getLastMission(missions: MissionDto[]): MissionDto | undefined {
    return missions.find((mission) => !isAllObjectivesCompleted(mission.objectives));
}

export function getAnimalsLastMission(animals: AnimalDto[]): LastMissionDto[] {
    const animalsLastMissions: LastMissionDto[] = [];

    animals.forEach((animal) => {
        if (animal.missions.length === 0) {
            return;
        }

        const lastMission = getLastMission(animal.missions);

        if (!lastMission) {
            return;
        }

        animalsLastMissions.push({
            id: animal.id,
            name: animal.name,
            mission: lastMission,
            created_at: animal.created_at,
            updated_at: animal.updated_at,
        });
    });

    return animalsLastMissions;
}
