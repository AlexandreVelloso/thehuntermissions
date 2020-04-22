// eslint-disable-next-line max-len
const isAllObjectivesCompleted = (objectives) => objectives.every((objective) => objective.completed);

// eslint-disable-next-line max-len
const getLastMission = (missions) => missions.find((mission) => !isAllObjectivesCompleted(mission.objectives));

const getAnimalsLastMission = (animals) => {
    const animalsLastMissions = [];

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
};

module.exports = {
    isAllObjectivesCompleted,
    getLastMission,
    getAnimalsLastMission,
};
