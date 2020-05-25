const removeObjectivesDuplicates = (oldObjectives) => {
    if (oldObjectives === null || oldObjectives === undefined) {
        return oldObjectives;
    }

    const length = oldObjectives.length - 1;
    const objectives = [];

    for (let index = 0; index < length; index += 1) {
        if (oldObjectives[index].id !== oldObjectives[index + 1].id) {
            objectives.push(oldObjectives[index]);
        }
    }

    objectives.push(oldObjectives[length]);

    return objectives;
};

const removeDuplicates = (missions) => {
    if (missions === null || missions === undefined) {
        return missions;
    }

    if (!Array.isArray(missions)) {
        // eslint-disable-next-line no-param-reassign
        missions.objectives = removeObjectivesDuplicates(missions.objectives);
        return missions;
    }

    return missions.map((mission) => {
        // eslint-disable-next-line no-param-reassign
        mission.objectives = removeObjectivesDuplicates(mission.objectives);
        return mission;
    });
};

module.exports = {
    removeObjectivesDuplicates,
    removeDuplicates,
};
