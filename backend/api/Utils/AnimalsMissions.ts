import Objective from '../Models/Objective';
import Mission from '../Models/Mission';
import Animal from '../Models/Animal';
import LastMission from '../Models/LastMission';

export function isAllObjectivesCompleted(objectives: Objective[]) {
    return objectives.every((objective) => objective.completed);
}

export function getLastMission(missions: Mission[]) {
    return missions.find((mission) => !isAllObjectivesCompleted(mission.objectives));
}

export function getAnimalsLastMission(animals: Animal[]): LastMission[] {
    const animalsLastMissions: LastMission[] = [];

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
            created_at: animal.created_at,
            updated_at: animal.updated_at,
            mission: lastMission,
        });
    });

    return animalsLastMissions;
}
