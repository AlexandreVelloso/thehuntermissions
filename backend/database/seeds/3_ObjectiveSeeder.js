const { Model } = require('objection');

const Mission = require('../models/Mission');
const Animal = require('../models/Animal');
const Objective = require('../models/Objective');

async function findMissionBy(column, value) {
    return Mission.query()
        .where(column, value)
        .select('*')
        .first();
}

async function findMissionByAnimal(animalId, missionName) {
    return Mission.query()
        .where('animal_id', animalId)
        .where('name', missionName)
        .select('*')
        .first();
}

async function findAnimalBy(column, value) {
    return Animal.query()
        .where(column, value)
        .select('*')
        .first();
}

async function alpineIbexObjectives() {
    const firstMission = await findMissionBy('name', 'Above all Summits, it is Calm');
    const secondMission = await findMissionBy('name', 'The Former Bear Biologist Who Stares at Goats');
    const thrirdMission = await findMissionBy('name', 'Joy of Life');
    const fourthMission = await findMissionBy('name', 'Mountain Hooligans');
    const fifthMission = await findMissionBy('name', 'The Sound of a Goat in a Room');
    const sixthMission = await findMissionBy('name', 'It\'s Oh So Quiet');
    const seventhMission = await findMissionBy('name', 'Blame Science');
    const eighthMission = await findMissionBy('name', 'Goats Blood');
    const ninthMission = await findMissionBy('name', 'Again With the Bears');
    const tenthMission = await findMissionBy('name', 'Taking Down the Bearkiller Goat');

    return [
        { name: 'Spot an Alpine Ibex.', mission_id: firstMission.id },

        { name: 'ID droppings of an Alpine Ibex.', mission_id: secondMission.id },

        { name: 'Harvest an Alpine Ibex.', mission_id: thrirdMission.id },

        { name: 'Harvest a female Alpine Ibex at 100% Harvest Value.', mission_id: fourthMission.id },
        { name: 'Harvest another female Alpine Ibex at 100% Harvest Value in the same hunt.', mission_id: fourthMission.id },
        { name: 'Harvest another female Alpine Ibex at 100% Harvest Value in the same hunt.', mission_id: fourthMission.id },

        { name: 'Register an audio clue of an Alpine Ibex.', mission_id: fifthMission.id },

        { name: 'Register an audio clue of ANY animal.', mission_id: sixthMission.id },
        { name: 'Harvest an Alpine Ibex in the same hunt to blame it for making the noise.', mission_id: sixthMission.id },

        { name: 'Harvest an Alpine Ibex from a maximum distance of 60 meter (approx. 197 ft.) using a 8x57 IS K98k Bolt Action Rifle.', mission_id: seventhMission.id },
        { name: 'Harvest another Alpine Ibex from a maximum distance of 50 meter (approx. 164 ft.) using a 8x57 IS K98k Bolt Action Rifle.', mission_id: seventhMission.id },
        { name: 'Harvest another Alpine Ibex from a maximum distance of 40 meter (approx. 131 ft.) using a 8x57 IS K98k Bolt Action Rifle.', mission_id: seventhMission.id },
        { name: 'Harvest another Alpine Ibex from a maximum distance of 30 meter (approx. 98 ft.) using a 8x57 IS K98k Bolt Action Rifle.', mission_id: seventhMission.id },

        { name: 'Harvest an Alpine Ibex with a tracer arrow.', mission_id: eighthMission.id },
        { name: 'Harvest another Alpine Ibex with a tracer arrow.', mission_id: eighthMission.id },
        { name: 'Harvest another Alpine Ibex with a tracer arrow.', mission_id: eighthMission.id },
        { name: 'Harvest another Alpine Ibex with a tracer arrow.', mission_id: eighthMission.id },
        { name: 'ID a blood trail of an Alpine Ibex.', mission_id: eighthMission.id },
        { name: 'ID another blood trail of an Alpine Ibex.', mission_id: eighthMission.id },

        { name: 'Harvest a Brown Bear in Val-des-Bois using an Inline Muzzleloader.', mission_id: ninthMission.id },
        { name: 'Harvest another Brown Bear in Val-des-Bois using an Inline Muzzleloader in the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Brown Bear in Val-des-Bois using an Inline Muzzleloader in the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Brown Bear in Val-des-Bois using an Inline Muzzleloader in the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Brown Bear in Val-des-Bois using an Inline Muzzleloader in the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Brown Bear in Val-des-Bois using an Inline Muzzleloader in the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Brown Bear in Val-des-Bois using an Inline Muzzleloader in the same hunt.', mission_id: ninthMission.id },

        { name: 'Harvest the last Bearkiller Alpine Ibex using 7 mm ammunition at the Devil\'s Teapot in Val - des - Bois(X: 3078, Y: -2169).', mission_id: tenthMission.id },
    ];
}

async function allDucksObjectives() {
    const firstMission = await findMissionBy('name', 'First Audition');
    const secondMission = await findMissionBy('name', 'The Soprano');
    const thrirdMission = await findMissionBy('name', 'The Baritone');
    const fourthMission = await findMissionBy('name', 'Sprechgesang');
    const fifthMission = await findMissionBy('name', 'Backing Vocals');
    const sixthMission = await findMissionBy('name', 'Resonating Bodies');
    const seventhMission = await findMissionBy('name', 'Bird Rights');
    const eighthMission = await findMissionBy('name', 'Silencing the Critics');
    const ninthMission = await findMissionBy('name', 'Dress Rehearsal');
    const tenthMission = await findMissionBy('name', 'The Grand Premiere');

    return [
        { name: 'Spot a Mallard.', mission_id: firstMission.id },
        { name: 'Spot an American Black Duck.', mission_id: firstMission.id },
        { name: 'Spot a Northern Pintail.', mission_id: firstMission.id },
        { name: 'Spot a Gadwall.', mission_id: firstMission.id },

        { name: 'Harvest an airborne female Northern Pintail.', mission_id: secondMission.id },
        { name: 'Harvest an airborne male Northern Pintail in the same hunt.', mission_id: secondMission.id },

        { name: 'Harvest an airborne American Black Duck with a 12 GA Blaser F3 Game O/U Shotgun.', mission_id: thrirdMission.id },
        { name: 'Harvest another airborne American Black Duck with a 12 GA Blaser F3 Game O/U Shotgun.', mission_id: thrirdMission.id },
        { name: 'Harvest one final airborne American Black Duck with a 12 GA Blaser F3 Game O/U Shotgun.', mission_id: thrirdMission.id },
        { name: 'Harvest an airborne Mallard with a 12 GA Blaser F3 Game O/U Shotgun.', mission_id: thrirdMission.id },
        { name: 'Harvest another airborne Mallard with a 12 GA Blaser F3 Game O/U Shotgun.', mission_id: thrirdMission.id },
        { name: 'Harvest one final airborne Mallard with a 12 GA Blaser F3 Game O/U Shotgun.', mission_id: thrirdMission.id },

        { name: 'Harvest an airborne Gadwall from a maximum distance of 20 meters.', mission_id: fourthMission.id },

        { name: 'Harvest an airborne Mallard with a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Mallard with a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },
        { name: 'Harvest one final airborne Mallard with a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },
        { name: 'Harvest an airborne American Black Duck with a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne American Black Duck with a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },
        { name: 'Harvest one final airborne American Black Duck with a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },
        { name: 'Harvest an airborne Northern Pintail with a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Northern Pintail with a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },
        { name: 'Harvest one final airborne Northern Pintail with a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },
        { name: 'Harvest an airborne Gadwall with a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Gadwall with a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },
        { name: 'Harvest one final airborne Gadwall with a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },

        { name: 'Harvest an airborne Mallard weighing at least 1.2 kgs.', mission_id: sixthMission.id },
        { name: 'Harvest an airborne American Black Duck weighing at least 1.2 kgs.', mission_id: sixthMission.id },
        { name: 'Harvest an airborne Northern Pintail weighing at least 1.0 kgs.', mission_id: sixthMission.id },
        { name: 'Harvest an airborne Gadwall weighing at least 1.0 kgs.', mission_id: sixthMission.id },

        { name: 'Register an audio clue of a Mallard.', mission_id: seventhMission.id },
        { name: 'Register an audio clue of an American Black Duck.', mission_id: seventhMission.id },
        { name: 'Register an audio clue of a Northern Pintail.', mission_id: seventhMission.id },
        { name: 'Register an audio clue of a Gadwall.', mission_id: seventhMission.id },
        { name: 'Register an audio clue of a Canada Goose.', mission_id: seventhMission.id },
        { name: 'Register an audio clue of a Pheasant.', mission_id: seventhMission.id },
        { name: 'Register an audio clue of a Turkey.', mission_id: seventhMission.id },
        { name: 'Register an audio clue of a Rock Ptarmigan.', mission_id: seventhMission.id },
        { name: 'Register an audio clue of a Willow Ptarmigan.', mission_id: seventhMission.id },

        { name: 'Harvest an airborne Mallard with a single shot using any shotgun from a minimum distance of 45 meters.', mission_id: eighthMission.id },
        { name: 'Harvest an airborne American Black Duck with a single shot using any shotgun from a minimum distance of 45 meters.', mission_id: eighthMission.id },
        { name: 'Harvest an airborne Northern Pintail with a single shot using any shotgun from a minimum distance of 45 meters.', mission_id: eighthMission.id },
        { name: 'Harvest an airborne Gadwall with a single shot using any shotgun from a minimum distance of 45 meters.', mission_id: eighthMission.id },

        { name: 'Harvest an airborne Mallard with a .22 pistol without using a tower, stand, blind or shooting tripod rest.', mission_id: ninthMission.id },
        { name: 'Harvest an airborne American Black Duck with a .22 pistol without using a tower, stand, blind or shooting tripod rest.', mission_id: ninthMission.id },
        { name: 'Harvest an airborne Northern Pintail with a .22 pistol without using a tower, stand, blind or shooting tripod rest.', mission_id: ninthMission.id },
        { name: 'Harvest an airborne Gadwall with a .22 pistol without using a tower, stand, blind or shooting tripod rest.', mission_id: ninthMission.id },

        { name: 'Harvest an airborne Mallard with the .22 Air Rifle.', mission_id: tenthMission.id },
        { name: 'Harvest an airborne Northern Pintail with the .22 Air Rifle.', mission_id: tenthMission.id },
        { name: 'Harvest an airborne American Black Duck with the .22 Air Rifle.', mission_id: tenthMission.id },
        { name: 'Harvest an airborne Gadwall with the .22 Air Rifle.', mission_id: tenthMission.id },
    ];
}

async function arcticFoxMissions() {
    const firstMission = await findMissionBy('name', 'Skittish');
    const secondMission = await findMissionBy('name', 'Seeing is Believing');
    const thrirdMission = await findMissionBy('name', 'Winter Pairs');
    const fourthMission = await findMissionBy('name', 'North vs South');
    const fifthMission = await findMissionBy('name', 'Oblivious Bang');
    const sixthMission = await findMissionBy('name', 'Close Up Shot');
    const seventhMission = await findMissionBy('name', '2 for 1');
    const eighthMission = await findMissionBy('name', 'The Big Dog');
    const ninthMission = await findMissionBy('name', 'Shivers');
    const tenthMission = await findMissionBy('name', 'Flush');

    return [
        { name: 'Identify 3 sets of tracks of an Arctic Fox.', mission_id: firstMission.id },
        { name: 'Identify the droppings of an Arctic Fox.', mission_id: firstMission.id },

        { name: 'Identify the call of an Arctic Fox.', mission_id: secondMission.id },
        { name: 'Spot an Arctic Fox in the same hunt.', mission_id: secondMission.id },
        { name: 'Harvest an Arctic Fox in the same hunt.', mission_id: secondMission.id },

        { name: 'Spot a female Arctic Fox.', mission_id: thrirdMission.id },
        { name: 'Spot a male Arctic Fox in the same hunt.', mission_id: thrirdMission.id },
        { name: 'Harvest a female Arctic Fox in the same hunt.', mission_id: thrirdMission.id },
        { name: 'Harvest a male Arctic Fox in the same hunt.', mission_id: thrirdMission.id },

        { name: 'Harvest an Arctic Fox east of Kosatka Harbor.', mission_id: fourthMission.id },
        { name: 'Harvest an Arctic Fox northeast of Tatanka Hot Springs.', mission_id: fourthMission.id },

        { name: 'Harvest an Arctic Fox at a distance of more than 100 meters (approx. 329 ft.) using a .243 Bolt Action Rifle.', mission_id: fifthMission.id },
        { name: 'Harvest an Arctic Fox at a distance of more than 100 meters (approx. 329 ft.) using a .243 Bolt Action Rifle in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest an Arctic Fox at a distance of more than 100 meters (approx. 329 ft.) using a .243 Bolt Action Rifle in the same hunt.', mission_id: fifthMission.id },

        { name: 'Harvest a Male Arctic Fox from a maximum distance of 30 meter (approx. 98.5 ft.).', mission_id: sixthMission.id },
        { name: 'Harvest a Male Arctic Fox from a maximum distance of 30 meter (approx. 98.5 ft.).', mission_id: sixthMission.id },

        { name: 'Harvest an Arctic Fox using buckshot.', mission_id: seventhMission.id },
        { name: 'Harvest another Arctic Fox using buckshot in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another Arctic Fox using buckshot in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another Arctic Fox using buckshot in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another Arctic Fox using buckshot in the same hunt.', mission_id: seventhMission.id },

        { name: 'Harvest a male Arctic Fox weighing at least 6kg (approx. 13.3 lbs.).', mission_id: eighthMission.id },
        { name: 'Harvest another male Arctic Fox weighing at least 6kg (approx. 13.3 lbs.).', mission_id: eighthMission.id },
        { name: 'Harvest another male Arctic Fox weighing at least 6kg (approx. 13.3 lbs.).', mission_id: eighthMission.id },

        { name: 'Harvest an Arctic Fox using any permitted weapon but without a scope from at least 40 meter (approx. 132 ft.) using a Tripod Stand.', mission_id: ninthMission.id },
        { name: 'Harvest an Arctic Fox using any permitted weapon but without a scope from at least 60 meter (approx. 197 ft.) using a Tripod Stand.', mission_id: ninthMission.id },
        { name: 'Harvest an Arctic Fox using any permitted weapon but without a scope from at least 80 meter (approx. 263 ft.) using a Tripod Stand.', mission_id: ninthMission.id },

        { name: 'Harvest an Arctic Fox with any bow.', mission_id: tenthMission.id },
        { name: 'Harvest an Arctic Fox with any crossbow.', mission_id: tenthMission.id },
        { name: 'Harvest an Arctic Fox with buckshot.', mission_id: tenthMission.id },
        { name: 'Harvest an Arctic Fox with any .243 or .223 rifle.', mission_id: tenthMission.id },
        { name: 'Harvest an Arctic Fox with any permitted revolver.', mission_id: tenthMission.id },
    ];
}

async function bantengMissions() {
    const firstMission = await findMissionBy('name', 'Source of the Problem');
    const secondMission = await findMissionBy('name', 'Retribution Will Follow');
    const thrirdMission = await findMissionBy('name', 'Tipping the Scales');
    const fourthMission = await findMissionBy('name', 'Rumors');
    const fifthMission = await findMissionBy('name', 'Revenge Will be Swift');
    const sixthMission = await findMissionBy('name', 'Restoring Peace and Order');
    const seventhMission = await findMissionBy('name', 'High on Caffeine');
    const eighthMission = await findMissionBy('name', 'The High Ground and Low Ground');
    const ninthMission = await findMissionBy('name', 'Hired Mercenaries');
    const tenthMission = await findMissionBy('name', 'Boss Banteng');

    return [
        { name: 'Spot a Banteng.', mission_id: firstMission.id },

        { name: 'Harvest a Banteng.', mission_id: secondMission.id },

        { name: 'Harvest a Banteng with a weight of at least 600 kg (approx. 1323 lbs).', mission_id: thrirdMission.id },
        { name: 'Harvest another Banteng but with a weight of at least 700 kg (approx. 1543 lbs).', mission_id: thrirdMission.id },

        { name: 'Visit Saint Pauli\'s Lighthouse (X: 7.553, Y: 8.725) in Piccabeen Bay.', mission_id: fourthMission.id },
        { name: 'Then, harvest an unspooked Banteng with a score of 135 or higher in the same hunt.', mission_id: fourthMission.id },

        { name: 'Harvest two Banteng within 10 minutes of each harvest.', mission_id: fifthMission.id },

        { name: 'Harvest a Banteng with 100% Harvest Value using any Compound Bow.', mission_id: sixthMission.id },
        { name: 'Harvest another Banteng with 100% Harvest Value using any Compound Bow.', mission_id: sixthMission.id },
        { name: 'Lastly, harvest another Banteng with 100% Harvest Value from a distance of 30 meters (Approx. 98 feet) or further using any Compound Bow.', mission_id: sixthMission.id },

        { name: 'Then, harvest another Banteng from a distance of 70 meters (Approx. 230 feet) or further with one shot.', mission_id: seventhMission.id },

        { name: 'Harvest an unspooked Banteng from a Tree Stand or Tripod Stand.', mission_id: eighthMission.id },
        { name: 'Harvest an unspooked Banteng from a Ground Blind.', mission_id: eighthMission.id },

        { name: 'First, harvest a charging Water Buffalo from any distance under 15 meters (Approx. 49 feet).', mission_id: ninthMission.id },
        { name: 'Then, harvest another charging Water Buffalo from any distance under 15 meters (Approx. 49 feet) in the same hunt.', mission_id: ninthMission.id },

        { name: 'Harvest the male "Boss Banteng" by the easternmost island in the swamps of Piccabeen Bay (X: 7.539, Y: 8.299) with one shot.', mission_id: tenthMission.id },
    ];
}

async function bighornSheepMissions() {
    const firstMission = await findMissionBy('name', 'Scoping the Sickness');
    const secondMission = await findMissionBy('name', 'Foraging for Feces');
    const thrirdMission = await findMissionBy('name', 'Confirm the Diagnosis');
    const fourthMission = await findMissionBy('name', 'Running Rampant');
    const fifthMission = await findMissionBy('name', 'Ewes in Trouble');
    const sixthMission = await findMissionBy('name', 'Grabbing the Disease by the Horns');
    const seventhMission = await findMissionBy('name', 'Out of Her Misery');
    const eighthMission = await findMissionBy('name', 'The Ram Stops Here');
    const ninthMission = await findMissionBy('name', 'Tying up Loose Ewes');
    const tenthMission = await findMissionBy('name', 'Culling for the Cure');

    return [
        { name: 'Spot a Bighorn Sheep.', mission_id: firstMission.id },

        { name: 'ID droppings from a Bighorn Sheep.', mission_id: secondMission.id },
        { name: 'ID droppings from another Bighorn Sheep in the same hunt.', mission_id: secondMission.id },
        { name: 'ID droppings from another Bighorn Sheep in the same hunt.', mission_id: secondMission.id },

        { name: 'Harvest a Bighorn Sheep.', mission_id: thrirdMission.id },

        { name: 'Harvest a Bighorn Sheep with a lung shot using a bow or crossbow from under 30 meters (approx. 98 ft).', mission_id: fourthMission.id },
        { name: 'Harvest another Bighorn Sheep with a lung shot using a bow or crossbow from under 30 meters (approx. 98 ft).', mission_id: fourthMission.id },

        { name: 'Harvest a female Bighorn Sheep scoring over 40 points.', mission_id: fifthMission.id },
        { name: 'Harvest one more female Bighorn Sheep scoring over 40 points.', mission_id: fifthMission.id },

        { name: 'Harvest a male Bighorn Sheep using a bow or crossbow with 100% Harvest Value.', mission_id: sixthMission.id },
        { name: 'Harvest another male Bighorn Sheep using a bow or crossbow with 100% Harvest Value.', mission_id: sixthMission.id },
        { name: 'Harvest another male Bighorn Sheep using a bow or crossbow with 100% Harvest Value.', mission_id: sixthMission.id },

        { name: 'Harvest a female Bighorn Sheep weighing under 25kg (approx. 55 lbs) with a shot over 80 meters.', mission_id: seventhMission.id },

        { name: 'Harvest a male Bighorn Sheep scoring over 150 points using 7mm Magnum ammunition.', mission_id: eighthMission.id },

        { name: 'Harvest a Bighorn Sheep with a shot through the heart. Other organs may be hit.', mission_id: ninthMission.id },
        { name: 'Harvest another Bighorn Sheep with a shot through the heart. Other organs may be hit.', mission_id: ninthMission.id },

        { name: 'Harvest a Bighorn Sheep.', mission_id: tenthMission.id },
        { name: 'Harvest another Bighorn Sheep in the same hunt.', mission_id: tenthMission.id },
        { name: 'Harvest another Bighorn Sheep in the same hunt.', mission_id: tenthMission.id },
    ];
}

async function bisonMissions() {
    const firstMission = await findMissionBy('name', 'Off On the Wrong Foot');
    const secondMission = await findMissionBy('name', 'A History Lesson');
    const thrirdMission = await findMissionBy('name', 'The Man Who Saved the Buffalo');
    const fourthMission = await findMissionBy('name', 'Genetic Issues');
    const fifthMission = await findMissionBy('name', 'Bad Blood');
    const sixthMission = await findMissionBy('name', 'History Repeats Itself');
    const seventhMission = await findMissionBy('name', 'Plague-ridden');
    const eighthMission = await findMissionBy('name', 'Dirty History');
    const ninthMission = await findMissionBy('name', 'Viva la Revolution');
    const tenthMission = await findMissionBy('name', 'Challenging Buffalo Bill');

    return [
        { name: 'Spot a Bison.', mission_id: firstMission.id },

        { name: 'ID the tracks of a Bison.', mission_id: secondMission.id },
        { name: 'ID the tracks of a Bison.', mission_id: secondMission.id },
        { name: 'ID the tracks of a Bison.', mission_id: secondMission.id },

        { name: 'ID the droppings of a male Bison.', mission_id: thrirdMission.id },
        { name: 'ID the droppings of a female Bison.', mission_id: thrirdMission.id },

        { name: 'Harvest a Bison.', mission_id: fourthMission.id },

        { name: 'Harvest a female Bison at 100% Harvest Value.', mission_id: fifthMission.id },

        { name: 'Harvest a male Bison using the inline muzzleloader loaded with a .50 Conical Bullet.', mission_id: sixthMission.id },
        { name: 'Harvest another male Bison using the inline muzzleloader loaded with a .50 Conical Bullet in the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest another male Bison using the inline muzzleloader loaded with a .50 Conical Bullet in the same hunt.', mission_id: sixthMission.id },

        { name: 'Identify a call from a female Bison.', mission_id: seventhMission.id },
        { name: 'Spot a female Bison in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest a female Bison weighing at least 450kg (approx. 992 lbs.) in the same hunt using any .45-70 Lever Action Rifle.', mission_id: seventhMission.id },

        { name: 'Harvest a Bison using any Recurve Bow Modern.', mission_id: eighthMission.id },

        { name: 'Harvest a male Bison scoring at least 110.', mission_id: ninthMission.id },
        { name: 'Harvest another male Bison scoring at least 110.', mission_id: ninthMission.id },

        { name: 'Harvest the male Bison "Buffalo Bill" last seen at the "Windy Hill" (X: -6464, Y: -10096) using any permitted revolver without a scope.', mission_id: tenthMission.id },
    ];
}

async function blackBearMissions() {
    const firstMission = await findMissionBy('name', 'What We Do For Science');
    const secondMission = await findMissionBy('name', 'Mercy Cull');
    const thrirdMission = await findMissionBy('name', 'Coat of Many Colors');
    const fourthMission = await findMissionBy('name', 'Swamp Thing');
    const fifthMission = await findMissionBy('name', 'Bear Hug');
    const sixthMission = await findMissionBy('name', 'Aftershock');
    const seventhMission = await findMissionBy('name', 'Lead N Fur');
    const eighthMission = await findMissionBy('name', 'Bloodlust');
    const ninthMission = await findMissionBy('name', 'Getting Closer');
    const tenthMission = await findMissionBy('name', 'Illegally Blonde');

    return [
        { name: 'ID a droppings track from a Black Bear.', mission_id: firstMission.id },
        { name: 'ID a droppings track from another Black Bear in the same hunt.', mission_id: firstMission.id },
        { name: 'ID a droppings track from another Black Bear in the same hunt.', mission_id: firstMission.id },

        { name: 'Harvest the infected chocolate colored male Black Bear.', mission_id: secondMission.id },

        { name: 'Spot a Cinnamon colored Black Bear.', mission_id: thrirdMission.id },
        { name: 'Spot a Chocolate colored Black Bear.', mission_id: thrirdMission.id },
        { name: 'Spot a Chocolate colored Black Bear.', mission_id: thrirdMission.id },
        { name: 'Spot a Common colored Black Bear.', mission_id: thrirdMission.id },
        { name: 'Spot a Common colored Black Bear.', mission_id: thrirdMission.id },
        { name: 'Spot a Common colored Black Bear.', mission_id: thrirdMission.id },
        { name: 'Spot a Common colored Black Bear.', mission_id: thrirdMission.id },

        { name: 'Harvest a Black Bear on the mysterious island west (x: -13582, y: -3293) of the swamp.', mission_id: fourthMission.id },

        { name: 'Harvest a Black Bear weighing less than 100kg (approx. 220lbs.) from less than 30m (approx. 99ft.).', mission_id: fifthMission.id },

        { name: 'Harvest a Black Bear scoring at least 18 using a .300 Rifle.', mission_id: sixthMission.id },
        { name: 'Harvest a Black Bear scoring at least 18 using a .300 Rifle.', mission_id: sixthMission.id },
        { name: 'Harvest a Black Bear scoring at least 18 using a .300 Rifle.', mission_id: sixthMission.id },

        { name: 'Harvest a Black Bear scoring at least 20 using a slug from more than 50m (approx. 164ft.).', mission_id: seventhMission.id },

        { name: 'Harvest a Black Bear.', mission_id: eighthMission.id },
        { name: 'Harvest another Black Bear in the same hunt', mission_id: eighthMission.id },
        { name: 'Harvest another Black Bear in the same hunt', mission_id: eighthMission.id },
        { name: 'Harvest another Black Bear in the same hunt', mission_id: eighthMission.id },

        { name: 'Harvest a male Black Bear weighing more than 200kg (approx. 441lbs.) using the Snakebite Compound Bow.', mission_id: ninthMission.id },

        { name: 'Harvest the angry blond Black Bear in the northwest corner (x: -12614, y: -6282).', mission_id: tenthMission.id },
    ];
}

async function blacktailDeerMissions() {
    const firstMission = await findMissionBy('name', 'Breaking Ice');
    const secondMission = await findMissionBy('name', 'Dying To Impress');
    const thrirdMission = await findMissionBy('name', 'By The Book');
    const fourthMission = await findMissionBy('name', 'A Long Distance Relation');
    const fifthMission = await findMissionBy('name', 'Anywhere But Here');
    const sixthMission = await findMissionBy('name', 'Making Nice');
    const seventhMission = await findMissionBy('name', 'Getting Serious');
    const eighthMission = await findMissionBy('name', 'Moving In');
    const ninthMission = await findMissionBy('name', '12 Counts of Affection');
    const tenthMission = await findMissionBy('name', 'Tying Up');

    return [
        { name: 'Harvest a Blacktail Deer.', mission_id: firstMission.id },

        { name: 'Harvest a Male Blacktail Deer with the Pump-Action Shotgun.', mission_id: secondMission.id },

        { name: 'ID 3 tracks from a Blacktail Deer.', mission_id: thrirdMission.id },
        { name: 'Spot a Blacktail Deer in the same hunt.', mission_id: thrirdMission.id },
        { name: 'Harvest a Blacktail Deer in the same hunt.', mission_id: thrirdMission.id },

        { name: 'Harvest a Male Blacktail Deer from more than 150m using the .308 Anschütz Rifle.', mission_id: fourthMission.id },

        { name: 'Harvest a Blacktail Deer scoring at least 120 from a distance of less than 30 m.', mission_id: fifthMission.id },

        { name: 'Harvest a Male Blacktail Deer With at least 10 typical points using the .50 Cap Lock Muzzleloader.', mission_id: sixthMission.id },

        { name: 'Harvest a Blacktail Deer from Tower 7 on Whitehart Island.', mission_id: seventhMission.id },
        { name: 'Harvest a Blacktail Deer from Tower 17 on Whitehart Island during the same hunt.', mission_id: seventhMission.id },

        { name: 'Harvest a Male Blacktail Deer from a Treestand.', mission_id: eighthMission.id },
        { name: 'Harvest a Male Blacktail Deer from a Treestand.', mission_id: eighthMission.id },
        { name: 'Harvest a Male Blacktail Deer from a Treestand.', mission_id: eighthMission.id },

        { name: 'Harvest a Blacktail Deer in Red Feather Falls.', mission_id: ninthMission.id },
        { name: 'Harvest another Blacktail Deer in Red Feather Falls during the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Blacktail Deer in Red Feather Falls during the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Blacktail Deer in Red Feather Falls during the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Blacktail Deer in Red Feather Falls during the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Blacktail Deer in Red Feather Falls during the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Blacktail Deer in Red Feather Falls during the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Blacktail Deer in Red Feather Falls during the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Blacktail Deer in Red Feather Falls during the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Blacktail Deer in Red Feather Falls during the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Blacktail Deer in Red Feather Falls during the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest another Blacktail Deer in Red Feather Falls during the same hunt.', mission_id: ninthMission.id },

        { name: 'Harvest a Male Blacktail Deer scoring more than 135 with the Recurve Bow Modern.', mission_id: tenthMission.id },
    ];
}

async function bobcatMissions() {
    const firstMission = await findMissionBy('name', 'Every Mewment Counts');
    const secondMission = await findMissionBy('name', 'Can Somebody Paw-lease Give This Man a Bobcat?');
    const thrirdMission = await findMissionBy('name', 'Meow-sicians in Logger\'s Point');
    const fourthMission = await findMissionBy('name', 'Find All the Purrpetrators');
    const fifthMission = await findMissionBy('name', 'In Pursuit of Purrfection');
    const sixthMission = await findMissionBy('name', 'Cathletic Cats by the Creeks');
    const seventhMission = await findMissionBy('name', 'Everything Looking Paw-sitive');
    const eighthMission = await findMissionBy('name', 'Endless Paw-sibilities');
    const ninthMission = await findMissionBy('name', 'Run, Bobcat, Run!');
    const tenthMission = await findMissionBy('name', 'The El Bobogato Ceremony');

    return [
        { name: 'ID Bobcat tracks or droppings in Whitehart Island.', mission_id: firstMission.id },
        { name: 'Spot a Bobcat in Whitehart Island.', mission_id: firstMission.id },

        { name: 'Harvest a Bobcat in Whitehart Island.', mission_id: secondMission.id },

        { name: 'Visit the Inland Campsite in Logger\'s Point.', mission_id: thrirdMission.id },
        { name: 'Visit the Campsite in Logger\'s Point.', mission_id: thrirdMission.id },
        { name: 'At any time, ID a call from a Bobcat in Logger\'s Point.', mission_id: thrirdMission.id },

        { name: 'Harvest a Bobcat using any buckshot in Logger\'s Point.', mission_id: fourthMission.id },
        { name: 'Harvest another Bobcat using any buckshot in Logger\'s Point.', mission_id: fourthMission.id },

        { name: 'Harvest an unspooked male Bobcat at 100% Harvest Value in Logger\'s Point in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest an unspooked female Bobcat at 100% Harvest Value in Logger\'s Point in the same hunt.', mission_id: fifthMission.id },

        { name: 'Locate 3 Bobcat tracks from the same animal in Settler Creeks.', mission_id: sixthMission.id },
        { name: 'Harvest a Bobcat in Settler Creeks while using a Tree Stand with a single shot.', mission_id: sixthMission.id },

        { name: 'Harvest a Bobcat with a score of 7 or higher while using a Tree Stand in Settler Creeks.', mission_id: seventhMission.id },
        { name: 'Harvest a Bobcat with a weight of 16 kg (Approx. 32 lbs) or lower while using a Tree Stand in Settler Creeks.', mission_id: seventhMission.id },

        { name: 'Head over to Riverhead Landing in Rougarou Bayou.', mission_id: eighthMission.id },
        { name: 'Once at Riverhead Landing, harvest an unspooked Bobcat with a score of 8 or lower in Rougarou Bayou.', mission_id: eighthMission.id },
        { name: 'Once at Riverhead Landing, harvest an unspooked Bobcat with a score of 8 or higher in Rougarou Bayou.', mission_id: eighthMission.id },

        { name: 'Harvest a male Bobcat with a score of 8 or higher at 100% Harvest Value while it\'s fleeing.', mission_id: ninthMission.id },

        { name: 'Harvest two Bobcats within 5 minutes of each harvest.', mission_id: tenthMission.id },
    ];
}

async function brownBearMissions() {
    const firstMission = await findMissionBy('name', 'The Comeback Kid');
    const secondMission = await findMissionBy('name', 'Head Count');
    const thrirdMission = await findMissionBy('name', 'Southpaw');
    const fourthMission = await findMissionBy('name', 'Heavy Hitter');
    const fifthMission = await findMissionBy('name', 'Slugger');
    const sixthMission = await findMissionBy('name', 'Bad News Bears');
    const seventhMission = await findMissionBy('name', 'Far-fetched');
    const eighthMission = await findMissionBy('name', 'Biologist Schmiologist');
    const ninthMission = await findMissionBy('name', 'This All Sounds Awfully Familiar');
    const tenthMission = await findMissionBy('name', 'We Woke Up The Mama');

    return [
        { name: 'ID tracks from a Brown Bear.', mission_id: firstMission.id },
        { name: 'ID tracks from another Brown Bear in the same outing.', mission_id: firstMission.id },
        { name: 'ID tracks from another Brown Bear in the same outing.', mission_id: firstMission.id },

        { name: 'Spot a Brown Bear.', mission_id: secondMission.id },
        { name: 'Spot another Brown Bear.', mission_id: secondMission.id },
        { name: 'Spot another Brown Bear.', mission_id: secondMission.id },

        { name: 'Harvest a Brown Bear.', mission_id: thrirdMission.id },

        { name: 'Harvest a Brown Bear weighing at least 300 kg (approx. 661 lbs).', mission_id: fourthMission.id },

        { name: 'Harvest a Brown Bear using a 12 GA Pump Action Shotgun loaded with slugs.', mission_id: fifthMission.id },
        { name: 'Harvest a Brown Bear using a 12 GA Pump Action Shotgun loaded with slugs during the same hunt.', mission_id: fifthMission.id },

        { name: 'Harvest a Brown Bear.', mission_id: sixthMission.id },
        { name: 'Harvest another Brown Bear in the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest another Brown Bear in the same hunt.', mission_id: sixthMission.id },

        { name: 'Harvest a Brown Bear using a scoped .9.3x62 Anschütz 1780 D FL Bolt Action Rifle at a minimum distance of 100 meters (approx. 328 ft).', mission_id: seventhMission.id },

        { name: 'Harvest a Brown Bear from a Ground Blind.', mission_id: eighthMission.id },
        { name: 'Harvest another Brown Bear using a Ground Blind.', mission_id: eighthMission.id },

        { name: 'Harvest a Brown Bear using a Parker Python Compound Bow from a maximum of 20 meters (approx 66 ft).', mission_id: ninthMission.id },

        { name: 'Harvest the Brown Bear Goldilocks using a .308 "Rival" Handgun.', mission_id: tenthMission.id },
    ];
}

async function canadaGooseMissions() {
    const canada = await findAnimalBy('name', 'Canada Goose');

    const firstMission = await findMissionBy('name', 'Allright Then: Prove It');
    const secondMission = await findMissionByAnimal(canada.id, 'Off On The Wrong Foot');
    const thrirdMission = await findMissionBy('name', 'The Standard Procedure');
    const fourthMission = await findMissionBy('name', 'Easy Riding');
    const fifthMission = await findMissionBy('name', 'Full Throttle');
    const sixthMission = await findMissionBy('name', 'Surgeon With A Shotgun');
    const seventhMission = await findMissionBy('name', 'Antiquated Measurements');
    const eighthMission = await findMissionBy('name', 'Trickery In The Name Of Justice');
    const ninthMission = await findMissionBy('name', 'A Light At The End Of The Tunnel?');
    const tenthMission = await findMissionBy('name', 'Like In The Olden Days');

    return [
        { name: 'Harvest an airborne Canada Goose.', mission_id: firstMission.id },
        { name: 'Harvest an airborne Canada Moose... in Redfeather Falls. Any Moose will do. Airborne is optional.', mission_id: firstMission.id },

        { name: 'ID the call of a Canada Goose.', mission_id: secondMission.id },
        { name: 'ID the call of another Canada Goose.', mission_id: secondMission.id },

        { name: 'Harvest an airborne Canada Goose.', mission_id: thrirdMission.id },
        { name: 'Harvest another airborne Canada Goose in the same hunt.', mission_id: thrirdMission.id },
        { name: 'Harvest another airborne Canada Goose in the same hunt.', mission_id: thrirdMission.id },
        { name: 'Harvest another airborne Canada Goose in the same hunt.', mission_id: thrirdMission.id },
        { name: 'Harvest another airborne Canada Goose in the same hunt.', mission_id: thrirdMission.id },

        { name: 'Harvest an airborne Canada Goose using a 12 GA Single Shot Shotgun killing it with one shot.', mission_id: fourthMission.id },
        { name: 'Harvest another airborne Canada Goose using a 12 GA Single Shot Shotgun killing it with one shot in the same hunt.', mission_id: fourthMission.id },
        { name: 'Harvest another airborne Canada Goose using a 12 GA Single Shot Shotgun killing it with one shot in the same hunt.', mission_id: fourthMission.id },

        { name: 'Harvest an airborne Canada Goose using a 20 GA Semi-Automatic Shotgun.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Canada Goose using a 20 GA Semi-Automatic Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Canada Goose using a 20 GA Semi-Automatic Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Canada Goose using a 20 GA Semi-Automatic Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Canada Goose using a 20 GA Semi-Automatic Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Canada Goose using a 20 GA Semi-Automatic Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Canada Goose using a 20 GA Semi-Automatic Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Canada Goose using a 20 GA Semi-Automatic Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Canada Goose using a 20 GA Semi-Automatic Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Canada Goose using a 20 GA Semi-Automatic Shotgun in the same hunt.', mission_id: fifthMission.id },

        { name: 'Harvest an airborne Canada Goose from a minimum of 40 meters (approx. 131 ft.).', mission_id: sixthMission.id },
        { name: 'Harvest another airborne Canada Goose from a minimum of 40 meters (approx. 131 ft.) in the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest another airborne Canada Goose from a minimum of 40 meters (approx. 131 ft.) in the same hunt.', mission_id: sixthMission.id },

        { name: 'Harvest an airborne Canada Goose weighing at least 200 Salerno libras (or 7,2 kg, approx. 15,4 lbs.)', mission_id: seventhMission.id },
        { name: 'Harvest another airborne Canada Goose weighing at least 200 Salerno libras (or 7,2 kg, approx. 15,4 lbs.)', mission_id: seventhMission.id },

        { name: 'Harvest an airborne Canada Goose from a Waterfowl Blind at a maximum distance of 15 meter (approx. 49 ft.).', mission_id: eighthMission.id },
        { name: 'Harvest another airborne Canada Goose from a Waterfowl Blind at a maximum distance of 15 meter (approx. 49 ft.).', mission_id: eighthMission.id },
        { name: 'Harvest another airborne Canada Goose from a Waterfowl Blind at a maximum distance of 15 meter (approx. 49 ft.).', mission_id: eighthMission.id },
        { name: 'Harvest another airborne Canada Goose from a Waterfowl Blind at a maximum distance of 15 meter (approx. 49 ft.).', mission_id: eighthMission.id },

        { name: 'Harvest an airborne Canada Goose using a .22 Pistol.', mission_id: ninthMission.id },
        { name: 'Harvest another airborne Canada Goose using a .22 Pistol.', mission_id: ninthMission.id },

        { name: 'Harvest an airborne Canada Goose using a Longbow.', mission_id: tenthMission.id },
    ];
}

async function cottontailRabbitMissions() {
    const firstMission = await findMissionBy('name', 'Hop To It');
    const secondMission = await findMissionBy('name', 'Regicide');
    const thrirdMission = await findMissionBy('name', 'Honour. Glory. Rabbit.');
    const fourthMission = await findMissionBy('name', 'Ode To Joy');
    const fifthMission = await findMissionBy('name', 'Warriors Of The Fields');
    const sixthMission = await findMissionBy('name', 'Losers Of The Fields');
    const seventhMission = await findMissionBy('name', 'Restoring The Honour');
    const eighthMission = await findMissionBy('name', 'Restoring The Glory');
    const ninthMission = await findMissionBy('name', 'Losers No More');
    const tenthMission = await findMissionBy('name', 'Duty First');

    return [
        { name: 'Spot a Cottontail Rabbit in Logger\'s Point.', mission_id: firstMission.id },
        { name: 'ID tracks or droppings of a Cottontail Rabbit in Logger\'s Point.', mission_id: firstMission.id },
        { name: 'Spot a Cottontail Rabbit in Settler Creeks.', mission_id: firstMission.id },
        { name: 'ID tracks or droppings of a Cottontail Rabbit in Settler Creeks.', mission_id: firstMission.id },

        { name: 'Harvest a Cottontail Rabbit.', mission_id: secondMission.id },

        { name: 'Harvest a Cottontail Rabbit using a Shotgun.', mission_id: thrirdMission.id },
        { name: 'Harvest another Cottontail Rabbit using a Shotgun.', mission_id: thrirdMission.id },

        { name: 'Harvest a Cottontail Rabbit in Settler Creeks using a 12 GA Single Shot Shotgun.', mission_id: fourthMission.id },
        { name: 'Harvest another Cottontail Rabbit in Settler Creeks using a 12 GA Single Shot Shotgun.', mission_id: fourthMission.id },
        { name: 'Harvest another Cottontail Rabbit in Settler Creeks using a 12 GA Single Shot Shotgun.', mission_id: fourthMission.id },
        { name: 'Harvest another Cottontail Rabbit in Settler Creeks using a 12 GA Single Shot Shotgun.', mission_id: fourthMission.id },

        { name: 'Go to the Three Lakes area on Logger\'s Point and investigate how the war between Cottontail Rabbits and Coyotes is going. Check out some strange reports coming out of somewhere close to these coordinates: X: -9511; Y: 5756.', mission_id: fifthMission.id },

        { name: 'Harvest a Cottontail Rabbit from a Ground Blind.', mission_id: sixthMission.id },
        { name: 'Harvest another Cottontail Rabbit from a Ground Blind in the same hunt.', mission_id: sixthMission.id },

        { name: 'Harvest a Cottontail Rabbit while crouching from a maximum distance of 20 meter (approx. 66 ft.).', mission_id: seventhMission.id },
        { name: 'Harvest another Cottontail Rabbit while crouching from a maximum distance of 20 meter (approx. 66 ft.).', mission_id: seventhMission.id },

        { name: 'Harvest a Cottontail Rabbit in Settler Creeks using a .22 Air Rifle without a scope.', mission_id: eighthMission.id },
        { name: 'Harvest another Cottontail Rabbit in Settler Creeks using a .22 Air Rifle without a scope.', mission_id: eighthMission.id },
        { name: 'Harvest another Cottontail Rabbit in Settler Creeks using a .22 Air Rifle without a scope.', mission_id: eighthMission.id },

        { name: 'Harvest a unspooked Cottontail Rabbit in Logger\'s Point from a Treestand using a Longbow.', mission_id: ninthMission.id },
        { name: 'Harvest another unspooked Cottontail Rabbit in Logger\'s Point from a Treestand using a Longbow.', mission_id: ninthMission.id },

        { name: 'Harvest a Cottontail Rabbit in Settler Creeks using a 20 GA Semi-Automatic Shotgun.', mission_id: tenthMission.id },
        { name: 'Harvest another Cottontail Rabbit in Settler Creeks using a 20 GA Semi-Automatic Shotgun during the same hunt.', mission_id: tenthMission.id },
        { name: 'Harvest another Cottontail Rabbit in Settler Creeks using a 20 GA Semi-Automatic Shotgun during the same hunt.', mission_id: tenthMission.id },
        { name: 'Harvest another Cottontail Rabbit in Settler Creeks using a 20 GA Semi-Automatic Shotgun during the same hunt.', mission_id: tenthMission.id },
        { name: 'Harvest another Cottontail Rabbit in Settler Creeks using a 20 GA Semi-Automatic Shotgun during the same hunt.', mission_id: tenthMission.id },
    ];
}

async function coyoteMissions() {
    const coyote = await findAnimalBy('name', 'Coyote');

    const firstMission = await findMissionBy('name', 'Eye Spy');
    const secondMission = await findMissionByAnimal(coyote.id, 'It Takes Two');
    const thrirdMission = await findMissionBy('name', 'Scout');
    const fourthMission = await findMissionBy('name', 'Barking Up The Wrong Tower');
    const fifthMission = await findMissionBy('name', 'Northern Quarter');
    const sixthMission = await findMissionBy('name', 'Bitchin\'');
    const seventhMission = await findMissionBy('name', 'Lake Coyote?');
    const eighthMission = await findMissionBy('name', 'Bow Wow');
    const ninthMission = await findMissionBy('name', 'Take Down');

    return [
        { name: 'Spot a Coyote.', mission_id: firstMission.id },

        { name: 'Harvest a Coyote.', mission_id: secondMission.id },
        { name: 'Harvest a Coyote.', mission_id: secondMission.id },

        { name: 'Find a set of Coyote tracks.', mission_id: thrirdMission.id },
        { name: 'Find a set of Coyote tracks.', mission_id: thrirdMission.id },
        { name: 'Find a set of Coyote tracks.', mission_id: thrirdMission.id },

        { name: 'Harvest a Coyote from a tower.', mission_id: fourthMission.id },

        { name: 'Harvest a Coyote from the Northern Quarter.', mission_id: fifthMission.id },

        { name: 'Harvest a female Coyote, using a .44 Magnum Revolver.', mission_id: sixthMission.id },
        { name: 'Harvest a female Coyote, using a .44 Magnum Revolver.', mission_id: sixthMission.id },
        { name: 'Harvest a female Coyote, using a .44 Magnum Revolver.', mission_id: sixthMission.id },
        { name: 'Harvest a female Coyote, using a .44 Magnum Revolver.', mission_id: sixthMission.id },
        { name: 'Harvest a female Coyote, using a .44 Magnum Revolver.', mission_id: sixthMission.id },

        { name: 'Harvest a Coyote from the Lake (X: -14058, Y: 5389).', mission_id: seventhMission.id },

        { name: 'Harvest a Coyote, using the "Snakebite" Compound Bow.', mission_id: eighthMission.id },
        { name: 'Harvest a Coyote, using the "Snakebite" Compound Bow.', mission_id: eighthMission.id },
        { name: 'Harvest a Coyote, using the "Snakebite" Compound Bow.', mission_id: eighthMission.id },
        { name: 'Harvest a Coyote, using the "Snakebite" Compound Bow.', mission_id: eighthMission.id },
        { name: 'Harvest a Coyote, using the "Snakebite" Compound Bow.', mission_id: eighthMission.id },

        { name: 'Harvest the Big Dog from the Awi\'Usdi Stones.', mission_id: ninthMission.id },
    ];
}

async function dallSheepMissions() {
    const firstMission = await findMissionBy('name', 'Flocking To The Hills');
    const secondMission = await findMissionBy('name', 'Don\'t Be So Sheepish');
    const thrirdMission = await findMissionBy('name', 'I Only Have Eyes For Ewe');
    const fourthMission = await findMissionBy('name', 'If You Can\'t Dodge It');
    const fifthMission = await findMissionBy('name', 'Hoofin\' It');
    const sixthMission = await findMissionBy('name', 'No Ewes Crying Over Spilt Milk');
    const seventhMission = await findMissionBy('name', 'Mutton For Punishment');
    const eighthMission = await findMissionBy('name', '​_Shear Delights');
    const ninthMission = await findMissionBy('name', 'The Black Sheep');
    const tenthMission = await findMissionBy('name', 'Put To Good Ewes');

    return [
        { name: 'Locate 3 Dall Sheep tracks from the same animal.', mission_id: firstMission.id },
        { name: 'Spot a Dall Sheep.', mission_id: firstMission.id },

        { name: 'Harvest a Dall Sheep.', mission_id: secondMission.id },

        { name: 'Harvest a female Dall Sheep.', mission_id: thrirdMission.id },
        { name: 'Harvest another female Dall Sheep.', mission_id: thrirdMission.id },
        { name: 'Harvest one last female Dall Sheep.', mission_id: thrirdMission.id },

        { name: 'Harvest a male Dall Sheep with a single shot using any ethical weapon.', mission_id: fourthMission.id },

        { name: 'Harvest a male Dall Sheep with a shot through the heart or both lungs. Other organs may be hit.', mission_id: fifthMission.id },
        { name: 'Harvest another male Dall Sheep with a shot through the heart or both lungs in the same hunt. Other organs may be hit.', mission_id: fifthMission.id },

        { name: 'Harvest a female Dall Sheep using any .243 rifle from over 150 meters (Approx. 492 ft).', mission_id: sixthMission.id },

        { name: 'Harvest a female Dall Sheep weighing over 45kg (Approx. 99 lbs).', mission_id: seventhMission.id },
        { name: 'Harvest a male Dall Sheep weighing over 90kg (Approx. 198 lbs).', mission_id: seventhMission.id },

        { name: 'Harvest two Dall Sheep within 5 minutes of one another.', mission_id: eighthMission.id },

        { name: 'Harvest a male Dall Sheep scoring over 160 points with a 100% Harvest Value.', mission_id: ninthMission.id },

        { name: 'Harvest a female Dall Sheep scoring less than 35 points.', mission_id: tenthMission.id },
        { name: 'Harvest a female Dall Sheep scoring over 38 points.', mission_id: tenthMission.id },
        { name: 'Harvest a male Dall Sheep scoring less than 80 points.', mission_id: tenthMission.id },
        { name: 'Harvest a male Dall Sheep scoring over 160 points.', mission_id: tenthMission.id },
    ];
}

async function eurasianLynxMissions() {
    const firstMission = await findMissionBy('name', 'The Search for Pakasuchus');
    const secondMission = await findMissionBy('name', 'Modern Fossil Requirement');
    const thrirdMission = await findMissionBy('name', 'The Brachiosaurus Lynx');
    const fourthMission = await findMissionBy('name', 'The Velocilynx');
    const fifthMission = await findMissionBy('name', 'The Predator Becomes the Prey');
    const sixthMission = await findMissionBy('name', 'Upgrading Equipment');
    const seventhMission = await findMissionBy('name', 'The Argentinosaurus Lynx');
    const eighthMission = await findMissionBy('name', 'The T-Lynx');
    const ninthMission = await findMissionBy('name', 'Pakasuchus');
    const tenthMission = await findMissionBy('name', 'A Distant Relative');

    return [
        { name: 'ID the call of a Eurasian Lynx.', mission_id: firstMission.id },
        { name: 'Find a track from a Eurasian Lynx.', mission_id: firstMission.id },

        { name: 'Harvest an Eurasian Lynx.', mission_id: secondMission.id },

        { name: 'Harvest an Eurasian Lynx with a weight of 23 kg (Approx. 51 lbs) or higher.', mission_id: thrirdMission.id },

        { name: 'Harvest an Eurasian Lynx with a score of 7 or higher with any Crossbow or Crossbow Pistol.', mission_id: fourthMission.id },

        { name: 'Spot a male Eurasian Lynx from a Treestand.', mission_id: fifthMission.id },
        { name: 'Spot another male Eurasian Lynx from a Treestand.', mission_id: fifthMission.id },
        { name: 'Spot one final male Eurasian Lynx from a Treestand.', mission_id: fifthMission.id },

        { name: 'Harvest two Eurasian Lynx within 10 minutes of each harvest.', mission_id: sixthMission.id },

        { name: 'Harvest an unspooked Eurasian Lynx with a weight of 30 kg (Approx. 66 lbs) or higher at a distance under 20 meters (Approx. 65 feet).', mission_id: seventhMission.id },

        { name: 'Harvest an unspooked Eurasian Lynx with a score of 9 or higher with any Shotgun using any buckshot at 100% Harvest Value.', mission_id: eighthMission.id },

        { name: 'Harvest an unspooked male Eurasian Lynx from a Tree Stand while it\'s standing still.', mission_id: ninthMission.id },

        { name: 'Harvest an unspooked male Eurasian Lynx at 100% Harvest Value with a score of 9 or higher without penetrating any bones. Only organs may be hit.', mission_id: tenthMission.id },
    ];
}

async function europeanRabbitMissions() {
    const firstMission = await findMissionBy('name', 'Finding the clues');
    const secondMission = await findMissionBy('name', 'Rabbit Therapy');
    const thrirdMission = await findMissionBy('name', 'Too many, too fast');
    const fourthMission = await findMissionBy('name', 'Non Strategical Rabbits');
    const fifthMission = await findMissionBy('name', 'Power In Numbers');
    const sixthMission = await findMissionBy('name', 'Keeping Them On Their Toes');
    const seventhMission = await findMissionBy('name', 'Home Invasion');
    const eighthMission = await findMissionBy('name', 'A Necessary Evil');
    const ninthMission = await findMissionBy('name', 'Can\'t Break Their Spirit');
    const tenthMission = await findMissionBy('name', 'Rabbit Rampage');

    return [
        { name: 'ID tracks from a European Rabbit.', mission_id: firstMission.id },
        { name: 'ID more tracks from a European Rabbit.', mission_id: firstMission.id },
        { name: 'ID droppings from a European Rabbit.', mission_id: firstMission.id },

        { name: 'Spot an European Rabbit.', mission_id: secondMission.id },
        { name: 'Spot a second European Rabbit.', mission_id: secondMission.id },
        { name: 'Spot a third European Rabbit.', mission_id: secondMission.id },

        { name: 'Harvest a European Rabbit.', mission_id: thrirdMission.id },
        { name: 'Harvest another European Rabbit.', mission_id: thrirdMission.id },

        { name: 'Harvest an European Rabbit killed from a Ground Blind.', mission_id: fourthMission.id },
        { name: 'Harvest another European Rabbit killed from a Ground Blind during the same hunt.', mission_id: fourthMission.id },
        { name: 'Harvest another European Rabbit killed from a Ground Blind during the same hunt.', mission_id: fourthMission.id },

        { name: 'Harvest a female European Rabbit weighing less than 1,7 kg killed with a .22 Air Rifle.', mission_id: fifthMission.id },
        { name: 'Harvest a female European Rabbit weighing between 1,7 kg and 2,0 kg killed with a .22 Air Rifle.', mission_id: fifthMission.id },
        { name: 'Harvest a female European Rabbit weighing more than 2,0 kg killed with a .22 Air Rifle.', mission_id: fifthMission.id },

        { name: 'Harvest a male European Rabbit killed while spooked with a 12 GA Single Shot Shotgun.', mission_id: sixthMission.id },
        { name: 'Harvest a female European Rabbit killed while spooked with a 12 GA Single Shot Shotgun.', mission_id: sixthMission.id },

        { name: 'Harvest an European Rabbit killed with any shotgun while it is emerging from or diving into a burrow exit.', mission_id: seventhMission.id },
        { name: 'Harvest a second European Rabbit killed with any shotgun while it is emerging from or diving into a burrow exit during the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest a third European Rabbit killed with any shotgun while it is emerging from or diving into a burrow exit during the same hunt.', mission_id: seventhMission.id },

        { name: 'Spot an European Rabbit during the same hunt.', mission_id: eighthMission.id },
        { name: 'Spot another European Rabbit during the same hunt.', mission_id: eighthMission.id },
        { name: 'Harvest a spooked European Rabbit from a Ground Blind during the same hunt.', mission_id: eighthMission.id },
        { name: 'Harvest another spooked European Rabbit from a Ground Blind during the same hunt.', mission_id: eighthMission.id },

        { name: 'ID tracks from a European Rabbit.', mission_id: ninthMission.id },
        { name: 'ID a second set tracks from a European Rabbit.', mission_id: ninthMission.id },
        { name: 'ID a third set of tracks from a European Rabbit.', mission_id: ninthMission.id },
        { name: 'Spot a European Rabbit.', mission_id: ninthMission.id },
        { name: 'Spot a second European Rabbit.', mission_id: ninthMission.id },
        { name: 'Spot a third European Rabbit.', mission_id: ninthMission.id },

        { name: 'Harvest a female European Rabbit north of Chalet du Mont-Bleu lodge.', mission_id: tenthMission.id },
        { name: 'Harvest a second female European Rabbit north of Chalet du Mont-Bleu lodge.', mission_id: tenthMission.id },
        { name: 'Harvest a female European Rabbit northwest of The Calm Pond (x 2559, y -848).', mission_id: tenthMission.id },
        { name: 'Harvest a second female European Rabbit killed with the .22 pistol north of The Calm Pond (x 2559, y -848).', mission_id: tenthMission.id },
        { name: 'Harvest a male European Rabbit north of Chalet du Mont-Bleu lodge.', mission_id: tenthMission.id },
        { name: 'Harvest a second male European Rabbit killed with the .22 pistol north of Chalet du Mont-Bleu lodge.', mission_id: tenthMission.id },
        { name: 'Harvest a male European Rabbit north of The Calm Pond (x 2559, y -848).', mission_id: tenthMission.id },
        { name: 'Harvest a second male European Rabbit north of The Calm Pond (x 2559, y -848).', mission_id: tenthMission.id },
    ];
}

async function feralGoatMissions() {
    const firstMission = await findMissionBy('name', 'The Usual Suspects');
    const secondMission = await findMissionBy('name', 'Dragnet Operation');
    const thrirdMission = await findMissionBy('name', 'Covert Action');
    const fourthMission = await findMissionBy('name', 'Police Lineup');
    const fifthMission = await findMissionBy('name', 'The Scapegoat');
    const sixthMission = await findMissionBy('name', 'Silence of the Goats');
    const seventhMission = await findMissionBy('name', 'The war on shrubs');
    const eighthMission = await findMissionBy('name', 'An offer you can\'t refuse');
    const ninthMission = await findMissionBy('name', 'Collateral Damage');
    const tenthMission = await findMissionBy('name', 'The Goatfather');

    return [
        { name: 'ID droppings from a Feral Hog.', mission_id: firstMission.id },
        { name: 'ID droppings from a Red Kangaroo.', mission_id: firstMission.id },
        { name: 'ID droppings from a Feral Goat.', mission_id: firstMission.id },

        { name: 'ID footprints of a Feral Goat.', mission_id: secondMission.id },
        { name: 'ID footprints of a second different Feral Goat in the same hunt.', mission_id: secondMission.id },
        { name: 'ID footprints of a third different Feral Goat in the same hunt.', mission_id: secondMission.id },
        { name: 'ID the call of a male Feral Goat in the same hunt.', mission_id: secondMission.id },
        { name: 'ID the call of a female Feral Goat in the same hunt.', mission_id: secondMission.id },

        { name: 'Harvest a Feral Goat from a tower, Ground Blind or Tripod Stand.', mission_id: thrirdMission.id },

        { name: 'Spot a Feral Goat with fur variation Grey.', mission_id: fourthMission.id },
        { name: 'Spot a Feral Goat with fur variation Piebald.', mission_id: fourthMission.id },
        { name: 'Spot a Feral Goat with fur variation Piebald Black.', mission_id: fourthMission.id },

        { name: 'Harvest a fleeing Feral Goat with a single shot, using .223 ammunition.', mission_id: fifthMission.id },

        { name: 'Harvest a male Feral Goat with a Recurve Bow, Heavy Recurve Bow, Longbow or Cable-backed Bow.', mission_id: sixthMission.id },
        { name: 'Harvest a female Feral Goat with a Recurve Bow, Heavy Recurve Bow, Longbow or Cable-backed Bow.', mission_id: sixthMission.id },

        { name: 'Harvest a Feral Goat with 100% Harvest Value, using any ethical pistol or revolver.', mission_id: seventhMission.id },

        { name: 'Harvest a Feral Goat with a Bolt Action Rifle from a distance of at least 120 meters, using only iron sights.', mission_id: eighthMission.id },

        { name: 'Harvest a male Feral Goat with a score of 200 or more.', mission_id: ninthMission.id },
        { name: 'Harvest a male Feral Goat with a score of 90 or less.', mission_id: ninthMission.id },
        { name: 'Harvest a female Feral Goat with a score of 150 or more.', mission_id: ninthMission.id },
        { name: 'Harvest a female Feral Goat with a score of 50 or less.', mission_id: ninthMission.id },

        { name: 'Harvest a male Feral Goat weighing at least 60 kg with a single shot, hitting heart or lungs.', mission_id: tenthMission.id },
    ];
}

async function feralHogMissions() {
    const firstMission = await findMissionBy('name', 'On the Matter of Pigs');
    const secondMission = await findMissionBy('name', 'Blowing in the Wind');
    const thrirdMission = await findMissionBy('name', 'Squealer');
    const fourthMission = await findMissionBy('name', 'Electric Lady Land');
    const fifthMission = await findMissionBy('name', 'All Along The Watchtower');
    const sixthMission = await findMissionBy('name', 'Unnatural Selection');
    const seventhMission = await findMissionBy('name', 'Uninvited Guests');
    const eighthMission = await findMissionBy('name', 'Eye of The Hog');
    const ninthMission = await findMissionBy('name', 'Range Finder');
    const tenthMission = await findMissionBy('name', 'God Save the Queen');

    return [
        { name: 'Find a Feral Hog track south of the Field Lodge on Logger\'s Point.', mission_id: firstMission.id },
        { name: 'Find a Feral Hog track south of the Middle Tower but north of the Field Lodge on Logger\'s Point.', mission_id: firstMission.id },
        { name: 'Find a Feral Hog track north of the Middle Tower on Logger\'s Point.', mission_id: firstMission.id },

        { name: 'Harvest a Feral Hog from under 45.72m (approx. 150ft.)', mission_id: secondMission.id },

        { name: 'Harvest a Feral Hog in the Three Lakes area in the north of Logger\'s Point.', mission_id: thrirdMission.id },
        { name: 'Harvest another Feral Hog in the Three Lakes area in the north of Logger\'s Point during the same hunt.', mission_id: thrirdMission.id },

        { name: 'Harvest a Feral Hog from the pack raiding the Powerstation.', mission_id: fourthMission.id },
        { name: 'Harvest a Feral Hog from the pack raiding the Powerstation.', mission_id: fourthMission.id },

        { name: 'Harvest a Feral Hog from the North Hunting Tower on Logger\'s Point.', mission_id: fifthMission.id },
        { name: 'Harvest a Feral Hog from the Middle Hunting Tower on Logger\'s Point.', mission_id: fifthMission.id },
        { name: 'Harvest a Feral Hog from the South Hunting Tower on Logger\'s Point.', mission_id: fifthMission.id },

        { name: 'Harvest a male Feral Hog weighing more than 181.437kg (approx. 400lbs).', mission_id: sixthMission.id },

        { name: 'Harvest a Feral Hog with the Snakebite Compound Bow in the area south of the Field Lodge on Logger\'s Point.', mission_id: seventhMission.id },
        { name: 'Harvest a Feral Hog with the Snakebite Compound Bow in the area south of the Field Lodge on Logger\'s Point.', mission_id: seventhMission.id },
        { name: 'Harvest a Feral Hog with the Snakebite Compound Bow in the area south of the Field Lodge on Logger\'s Point.', mission_id: seventhMission.id },

        { name: 'Harvest a Feral Hog using the .300 Rifle.', mission_id: eighthMission.id },
        { name: 'Harvest another Feral Hog using a .44 Magnum Revolver during the same hunt.', mission_id: eighthMission.id },
        { name: 'Harvest another Feral Hog using a shotgun with Slug ammo during the same hunt', mission_id: eighthMission.id },

        { name: 'Harvest a Feral Hog with one shot from between 60.96 meters and 76.2 meters (approx. 200 & 250 ft.) with a scoped weapon.', mission_id: ninthMission.id },
        { name: 'Harvest a Feral Hog with one shot from between 91.44 meters and 106.68 meters (300 & 350 ft.) with a scoped weapon.', mission_id: ninthMission.id },
        { name: 'Harvest a Feral Hog with one shot from between 121.92 meters and 137.16 meters (approx. 400 & 450 ft.) with a scoped weapon.', mission_id: ninthMission.id },

        { name: 'Harvest the Feral "Queen" Hog terrorizing Canyon Creek.', mission_id: tenthMission.id },
    ];
}

async function greyWolfMissions() {
    const firstMission = await findMissionBy('name', 'On All Fours');
    const secondMission = await findMissionBy('name', 'Taking on the Pack');
    const thrirdMission = await findMissionBy('name', 'Traditional Hunting Methods');
    const fourthMission = await findMissionBy('name', 'The Capitoline Wolf');
    const fifthMission = await findMissionBy('name', 'On the Prowl');
    const sixthMission = await findMissionBy('name', 'Fangs like an Assassin');
    const seventhMission = await findMissionBy('name', 'The Night Lurker, Amarok');
    const eighthMission = await findMissionBy('name', 'Alpha, Beta, Omega');
    const ninthMission = await findMissionBy('name', 'The Remaining Followers');
    const tenthMission = await findMissionBy('name', 'The Legendary Fenrir');

    return [
        { name: 'Identify 3 Grey Wolf tracks from the same animal.', mission_id: firstMission.id },
        { name: 'Identify a call from a Grey Wolf.', mission_id: firstMission.id },
        { name: 'Spot a Grey Wolf.', mission_id: firstMission.id },
        { name: 'Spot another Grey Wolf.', mission_id: firstMission.id },
        { name: 'Spot one last Grey Wolf.', mission_id: firstMission.id },

        { name: 'Harvest a Grey Wolf.', mission_id: secondMission.id },
        { name: 'Harvest another Grey Wolf in the same hunt.', mission_id: secondMission.id },
        { name: 'Harvest another Grey Wolf in the same hunt.', mission_id: secondMission.id },

        { name: 'Identify droppings from a Grey Wolf.', mission_id: thrirdMission.id },
        { name: 'Spot a Grey Wolf.', mission_id: thrirdMission.id },
        { name: 'Harvest an unspooked Grey Wolf using any Compound Bow.', mission_id: thrirdMission.id },
        { name: 'Harvest another unspooked Grey Wolf using any Compound Bow.', mission_id: thrirdMission.id },

        { name: 'Spot a male Grey Wolf.', mission_id: fourthMission.id },
        { name: 'Spot another male Grey Wolf.', mission_id: fourthMission.id },
        { name: 'After spotting the Grey Wolves, harvest a male Grey Wolf from a distance of 20 meters (Approx. 65 ft) or higher using any Crossbow.', mission_id: fourthMission.id },
        { name: 'Harvest another male Grey Wolf from a distance of 20 meters (Approx. 65 ft) or higher using any Crossbow.', mission_id: fourthMission.id },
        { name: 'Finally, harvest a female Grey Wolf with a weight of 50kg (approx. 110 lbs) or higher in Timbergold Trails using any Crossbow.', mission_id: fourthMission.id },

        { name: 'Harvest an unspooked Grey Wolf from under 20 meters (Approx. 66 ft) while using a Tree Stand.', mission_id: fifthMission.id },
        { name: 'Harvest another unspooked Grey Wolf from under 12 meters (Approx. 39 ft) while using a Tree Stand.', mission_id: fifthMission.id },

        { name: 'Harvest two Grey Wolves within 5 minutes of each harvest.', mission_id: sixthMission.id },

        { name: 'Harvest an unspooked male dark Grey Wolf using any .270 Bolt Action Rifle in Timbergold Trails with a shot to the heart.', mission_id: seventhMission.id },

        { name: 'Harvest a male Grey Wolf with a weight of 65kg (approx. 143 lbs) or higher in one shot.', mission_id: eighthMission.id },
        { name: 'Harvest a female Grey Wolf with a weight of 40kg (approx. 88 lbs) or higher in one shot.', mission_id: eighthMission.id },
        { name: 'Harvest a Grey Wolf with a lung shot using any Crossbow.', mission_id: eighthMission.id },
        { name: 'Harvest a Grey Wolf with a lung shot using any Compound Bow.', mission_id: eighthMission.id },
        { name: 'Harvest a Grey Wolf with a lung shot using any .270 Bolt Action Rifle.', mission_id: eighthMission.id },
        { name: 'Harvest an unspooked Grey Wolf with a heart shot. Other organs may be hit.', mission_id: eighthMission.id },

        { name: 'Harvest an unspooked common Grey Wolf from under 20 meters (Approx. 66 ft) in the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest a dark Grey Wolf in one shot in the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest a brown Grey Wolf with any ethical handgun from over 35 meters (Approx. 115 ft) in the same hunt.', mission_id: ninthMission.id },

        { name: 'Identify a call from a Grey Wolf', mission_id: tenthMission.id },
        { name: 'Harvest the dark Grey Wolf Fenrir by Brimstone (X: -7.140, Y: -156) in Timbergold Trails.', mission_id: tenthMission.id },
    ];
}

async function grizzlyBearMissions() {
    const firstMission = await findMissionBy('name', 'Majesty at Best');
    const secondMission = await findMissionBy('name', 'To Catch a Thief');
    const thrirdMission = await findMissionBy('name', 'From Afar');
    const fourthMission = await findMissionBy('name', 'Fast and Precise');
    const fifthMission = await findMissionBy('name', 'Silence is Key');
    const sixthMission = await findMissionBy('name', 'Face to Face');
    const seventhMission = await findMissionBy('name', 'The Trap is Set');
    const eighthMission = await findMissionBy('name', 'Trickery at Best');
    const ninthMission = await findMissionBy('name', 'Revenge is Sweet');
    const tenthMission = await findMissionBy('name', 'One Final Trophy');

    return [
        { name: 'Locate 3 Grizzly Bear tracks from the same animal.', mission_id: firstMission.id },
        { name: 'Then spot a Grizzly Bear in the same hunt.', mission_id: firstMission.id },
        { name: 'Lastly, harvest a Grizzly Bear in the same hunt.', mission_id: firstMission.id },

        { name: 'Harvest a Grizzly Bear.', mission_id: secondMission.id },
        { name: 'Harvest one more Grizzly Bear.', mission_id: secondMission.id },

        { name: 'Harvest a Grizzly Bear from over 60m (approx. 196ft).', mission_id: thrirdMission.id },
        { name: 'Harvest another Grizzly Bear from over 70m (approx. 230ft).', mission_id: thrirdMission.id },
        { name: 'Harvest another Grizzly Bear from over 80m (approx. 262ft).', mission_id: thrirdMission.id },

        { name: 'Harvest a Grizzly Bear with a heart shot on 100% Harvest Value.', mission_id: fourthMission.id },
        { name: 'Harvest one more Grizzly Bear with a heart shot on 100% Harvest Value.', mission_id: fourthMission.id },

        { name: 'Harvest a Grizzly Bear with the Compound Bow "Parker Python".', mission_id: fifthMission.id },
        { name: 'Harvest another Grizzly Bear with the Compound Bow "Parker Python".', mission_id: fifthMission.id },
        { name: 'Harvest another Grizzly Bear with the Compound Bow "Parker Python".', mission_id: fifthMission.id },

        { name: 'Harvest a Grizzly Bear with a single shot while it is charging at you with any .454 Revolver.', mission_id: sixthMission.id },

        { name: 'Harvest a Grizzly Bear with the .300 Bolt Action Rifle while it is fleeing.', mission_id: seventhMission.id },
        { name: 'Harvest another Grizzly Bear with the .300 Bolt Action Rifle while it is fleeing.', mission_id: seventhMission.id },
        { name: 'Harvest another Grizzly Bear with the .300 Bolt Action Rifle while it is fleeing.', mission_id: seventhMission.id },

        { name: 'Harvest a male Grizzly Bear with a heart or lung shot using any Reverse Draw Crossbow.', mission_id: eighthMission.id },

        { name: 'Harvest a Grizzly Bear with any Recurve Bow at 100% Harvest Value.', mission_id: ninthMission.id },
        { name: 'Harvest a Grizzly Bear with the 7mm Magnum Bullpup Rifle at 100% Harvest Value.', mission_id: ninthMission.id },

        { name: 'Harvest a male blonde Grizzly Bear with any .454 Revolver.', mission_id: tenthMission.id },
    ];
}

async function magpieGooseMissions() {
    const firstMission = await findMissionBy('name', 'The Budgie Who Could');
    const secondMission = await findMissionBy('name', 'Rack Off the Intruders');
    const thrirdMission = await findMissionBy('name', 'Fair Dinkum Shootin\'');
    const fourthMission = await findMissionBy('name', 'A Goose Bigger than Dawg');
    const fifthMission = await findMissionBy('name', 'Straight to the Pool Room');
    const sixthMission = await findMissionBy('name', 'Aussie Salute');
    const seventhMission = await findMissionBy('name', 'For the Journos');
    const eighthMission = await findMissionBy('name', 'Fair Shake of the Sauce Bottle');
    const ninthMission = await findMissionBy('name', 'Tell Dawg He\'s Dreamin\'');
    const tenthMission = await findMissionBy('name', 'No Wuckin\' Furries');

    return [
        { name: 'ID the call of a Magpie Goose.', mission_id: firstMission.id },
        { name: 'ID the call of another Magpie Goose.', mission_id: firstMission.id },

        { name: 'Harvest a Water Buffalo.', mission_id: secondMission.id },
        { name: 'Harvest a Banteng.', mission_id: secondMission.id },

        { name: 'Harvest a Magpie Goose.', mission_id: thrirdMission.id },
        { name: 'Harvest another airborne Magpie Goose in the same hunt.', mission_id: thrirdMission.id },
        { name: 'Harvest another airborne Magpie Goose in the same hunt.', mission_id: thrirdMission.id },
        { name: 'Harvest another airborne Magpie Goose in the same hunt.', mission_id: thrirdMission.id },
        { name: 'Harvest another airborne Magpie Goose in the same hunt.', mission_id: thrirdMission.id },

        { name: 'Harvest an airborne Magpie Goose weighin\' at least 3 kg (Approx. 7 lbs', mission_id: fourthMission.id },
        { name: 'Harvest another airborne Magpie Goose weighin\' at least 3 kg (Approx. 7 lbs) in the same hunt.', mission_id: fourthMission.id },
        { name: 'Harvest another airborne Magpie Goose weighin\' at least 3 kg (Approx. 7 lbs) in the same hunt.', mission_id: fourthMission.id },

        { name: 'Harvest an airborne Magpie Goose scorin\' at least 3200.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Magpie Goose scorin\' at least 3200 in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest another airborne Magpie Goose scorin\' at least 3200 in the same hunt.', mission_id: fifthMission.id },

        { name: 'Harvest a Water Buffalo.', mission_id: sixthMission.id },
        { name: 'Then, harvest an airborne Magpie Goose.', mission_id: sixthMission.id },
        { name: 'Then, harvest another Water Buffalo.', mission_id: sixthMission.id },
        { name: 'Finally, harvest one final airborne Magpie Goose.', mission_id: sixthMission.id },

        { name: 'Harvest an airborne Magpie Goose with one shot.', mission_id: seventhMission.id },
        { name: 'Harvest another airborne Magpie Goose with one shot in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another airborne Magpie Goose with one shot in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another airborne Magpie Goose with one shot in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another airborne Magpie Goose with one shot in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another airborne Magpie Goose with one shot in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another airborne Magpie Goose with one shot in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another airborne Magpie Goose with one shot in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another airborne Magpie Goose with one shot in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest one final airborne Magpie Goose with one shot in the same hunt.', mission_id: seventhMission.id },

        { name: 'Harvest a Water Buffalo with a 100% Harvest Value shot over 50 meters (Approx. 164 feet).', mission_id: eighthMission.id },
        { name: 'Harvest an unspooked male Sambar Deer with a double lung shot while standing. Other organs may be hit.', mission_id: eighthMission.id },
        { name: 'Harvest an airborne Magpie Goose using .17 HMR HV Ammunition.', mission_id: eighthMission.id },

        { name: 'Harvest an airborne Magpie Goose under 15 meters (Approx. 49 feet) without using a Waterfowl Blind.', mission_id: ninthMission.id },

        { name: 'Harvest an airborne Magpie Goose using any Compound Bow.', mission_id: tenthMission.id },
    ];
}

async function mallardMissions() {
    const firstMission = await findMissionBy('name', 'Mallard Hunting: Age Old Pastime');
    const secondMission = await findMissionBy('name', 'The Plight Of Mrs Johnson');
    const thrirdMission = await findMissionBy('name', 'The Long Arm Of The Law');
    const fourthMission = await findMissionBy('name', 'Introducing The Researcher');
    const fifthMission = await findMissionBy('name', 'They Talk!');
    const sixthMission = await findMissionBy('name', 'They Attack!');
    const seventhMission = await findMissionBy('name', 'They Are Getting Bigger!');
    const eighthMission = await findMissionBy('name', 'The Secret Code');
    const ninthMission = await findMissionBy('name', 'Breaking The Code');
    const tenthMission = await findMissionBy('name', 'Exposing The Truth');

    return [
        { name: 'Spot a Mallard.', mission_id: firstMission.id },

        { name: 'Identify the call of a Mallard.', mission_id: secondMission.id },

        { name: 'Harvest an airborne Mallard using any shotgun.', mission_id: thrirdMission.id },

        { name: 'Harvest an airborne Mallard using a 12 GA Pump Action Shotgun.', mission_id: fourthMission.id },
        { name: 'Harvest an airborne Mallard using a 12 GA Pump Action Shotgun in the same hunt.', mission_id: fourthMission.id },
        { name: 'Harvest an airborne Mallard using a 12 GA Pump Action Shotgun in the same hunt.', mission_id: fourthMission.id },

        { name: 'Harvest an unspooked airborne Mallard.', mission_id: fifthMission.id },
        { name: 'Harvest another unspooked airborne Mallard in the same hunt.', mission_id: fifthMission.id },

        { name: 'Harvest an airborne Mallard from a Waterfowl Blind.', mission_id: sixthMission.id },
        { name: 'Harvest another airborne Mallard from a Waterfowl Blind in the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest another airborne Mallard from a Waterfowl Blind in the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest another airborne Mallard from a Waterfowl Blind in the same hunt.', mission_id: sixthMission.id },

        { name: 'Harvest an airborne Mallard weighing at least 1 kg (approx. 2.2 lbs.) using a 12 GA Blaser F3 Game O/U Shotgun.', mission_id: seventhMission.id },
        { name: 'Harvest another airborne Mallard weighing at least 1 kg (approx. 2.2 lbs.) using a 12 GA Blaser F3 Game O/U Shotgun in the same hunt.', mission_id: seventhMission.id },

        { name: 'Harvest a spooked airborne Mallard using a Side by Side shotgun.', mission_id: eighthMission.id },
        { name: 'Harvest another spooked airborne Mallard using a Side by Side shotgun in the same hunt.', mission_id: eighthMission.id },
        { name: 'Harvest another spooked airborne Mallard using a Side by Side shotgun in the same hunt.', mission_id: eighthMission.id },
        { name: 'Harvest another spooked airborne Mallard using a Side by Side shotgun in the same hunt.', mission_id: eighthMission.id },

        { name: 'Harvest an airborne Mallard from a maximum distance of 20 meters (approx. 66 ft.)', mission_id: ninthMission.id },
        { name: 'Harvest an airborne Mallard from a maximum distance of 20 meters (approx. 66 ft.) in the same hunt.', mission_id: ninthMission.id },

        { name: 'Harvest an airborne male Mallard weighing at least 1.2 kg ( approx. 2.6 lbs.)', mission_id: tenthMission.id },
    ];
}

async function mooseMissions() {
    const moose = await findAnimalBy('name', 'Moose');

    const firstMission = await findMissionByAnimal(moose.id, 'It Takes Two');
    const secondMission = await findMissionBy('name', 'Tankbuster');
    const thrirdMission = await findMissionBy('name', 'Out of Nowhere');
    const fourthMission = await findMissionBy('name', 'Sweet Sixteen');
    const fifthMission = await findMissionBy('name', 'Road Kill');
    const sixthMission = await findMissionBy('name', 'Campers Delight');
    const seventhMission = await findMissionBy('name', 'Trespasser');
    const eighthMission = await findMissionBy('name', 'Moose For a Week');
    const ninthMission = await findMissionBy('name', 'Getting Slim');
    const tenthMission = await findMissionBy('name', 'Mad Bull');

    return [
        { name: 'ID a Call from a Male Moose.', mission_id: firstMission.id },
        { name: 'ID a Call from a Female Moose.', mission_id: firstMission.id },

        { name: 'Harvest a Female Moose with lung and/or heart shots only, using the .300 Rifle.', mission_id: secondMission.id },
        { name: 'Harvest a Female Moose with lung and/or heart shots only, using the .300 Rifle.', mission_id: secondMission.id },
        { name: 'Harvest a Female Moose with lung and/or heart shots only, using the .300 Rifle.', mission_id: secondMission.id },

        { name: 'Harvest an unspooked male Moose from less than 25m.', mission_id: thrirdMission.id },

        { name: 'Harvest a male Moose with at least 16 typical points using Slug.', mission_id: fourthMission.id },

        { name: 'Track down and harvest the trespassing male Moose, last seen on the road, just east of the bridge (X: -10.430 Y: -2.513).', mission_id: fifthMission.id },

        { name: 'Harvest a Moose Bull with at least 18 typical points from a Treestand, Blind, Tripod Stand or Tower.', mission_id: sixthMission.id },

        { name: 'Kill a male Moose anywhere on the Trapper\'s Rest road.', mission_id: seventhMission.id },

        { name: 'Harvest a Moose weighing more than 544kg (approx. 1200lbs) with the Snakebite Compound Bow.', mission_id: eighthMission.id },

        { name: 'Harvest 3 Moose within 15 minutes.', mission_id: ninthMission.id },

        { name: 'Harvest a Male Moose while it is charging you.', mission_id: tenthMission.id },
    ];
}

async function muleDeerMissions() {
    const firstMission = await findMissionBy('name', 'First Mule Deer');
    const secondMission = await findMissionBy('name', 'A Longer Range');
    const thrirdMission = await findMissionBy('name', 'More Points');
    const fourthMission = await findMissionBy('name', 'Big Haul');
    const fifthMission = await findMissionBy('name', 'Extreme Range');
    const sixthMission = await findMissionBy('name', 'Even Closer');
    const seventhMission = await findMissionBy('name', 'Points o\'Plenty');
    const eighthMission = await findMissionBy('name', 'Concerto');
    const ninthMission = await findMissionBy('name', 'Chasin Tail');
    const tenthMission = await findMissionBy('name', '270 Degree Angle');
    const eleventhMission = await findMissionBy('name', 'Easy Does It');
    const twelfthMission = await findMissionBy('name', '5 From Above');

    return [
        { name: 'Harvest a Mule Deer buck.', mission_id: firstMission.id },

        { name: 'Take a Mule Deer buck from at least 47.52m (approx. 150ft.)', mission_id: secondMission.id },

        { name: 'Harvest a Mule Deer buck with at least 6 typical points.', mission_id: thrirdMission.id },

        { name: 'Harvest a Mule Deer buck weighing at least 91Kg (approx. 200lbs).', mission_id: fourthMission.id },
        { name: 'Harvest a Mule Deer buck weighing at least 91Kg (approx. 200lbs).', mission_id: fourthMission.id },
        { name: 'Harvest a Mule Deer buck weighing at least 91Kg (approx. 200lbs).', mission_id: fourthMission.id },

        { name: 'Take a Mule Deer buck from 137.16m (approx. 450ft.) or more.', mission_id: fifthMission.id },

        { name: 'Take a Mule Deer buck, from 18.29m (approx. 60ft.) or less.', mission_id: sixthMission.id },

        { name: 'Harvest a Mule Deer buck with at least 10 typical points.', mission_id: seventhMission.id },

        { name: 'Identify a call from a Mule Deer buck.', mission_id: eighthMission.id },
        { name: 'Identify a call from a Mule Deer doe.', mission_id: eighthMission.id },

        { name: 'Find the tracks from three different Mule Deer within a span of 5 min.', mission_id: ninthMission.id },

        { name: 'Harvest a Mule Deer buck from at least 82.29m (approx. 270ft.), using the .270 rifle.', mission_id: tenthMission.id },

        { name: 'Harvest a Mule Deer doe using a .44 Magnum Revolver.', mission_id: eleventhMission.id },
        { name: 'Harvest a Mule Deer doe using a .44 Magnum Revolver.', mission_id: eleventhMission.id },
        { name: 'Harvest a Mule Deer doe using a .44 Magnum Revolver.', mission_id: eleventhMission.id },
        { name: 'Harvest a Mule Deer doe using a .44 Magnum Revolver.', mission_id: eleventhMission.id },

        { name: 'Harvest a Mule Deer from a Hunting Tower.', mission_id: twelfthMission.id },
        { name: 'Harvest a Mule Deer from a Hunting Tower.', mission_id: twelfthMission.id },
        { name: 'Harvest a Mule Deer from a Hunting Tower.', mission_id: twelfthMission.id },
        { name: 'Harvest a Mule Deer from a Hunting Tower.', mission_id: twelfthMission.id },
        { name: 'Harvest a Mule Deer from a Hunting Tower.', mission_id: twelfthMission.id },
    ];
}

async function pheasantMissions() {
    const firstMission = await findMissionBy('name', 'Call Me');
    const secondMission = await findMissionBy('name', 'Straight Flush');
    const thrirdMission = await findMissionBy('name', 'Run n\' Gun');
    const fourthMission = await findMissionBy('name', 'Graduation Day');
    const fifthMission = await findMissionBy('name', 'Dinner For Two');
    const sixthMission = await findMissionBy('name', 'Lucas\'s Challenge');
    const seventhMission = await findMissionBy('name', 'A Family Matter');
    const eighthMission = await findMissionBy('name', 'Pheasant Cowboy');
    const ninthMission = await findMissionBy('name', 'Shock \'n Awe');
    const tenthMission = await findMissionBy('name', 'A Challenge You Can\'t Refuse');

    return [
        { name: 'Identify a Pheasant call.', mission_id: firstMission.id },
        { name: 'Spot a Pheasant.', mission_id: firstMission.id },

        { name: 'Harvest an airborne Pheasant.', mission_id: secondMission.id },

        { name: 'Harvest an airborne Pheasant rooster.', mission_id: thrirdMission.id },

        { name: 'Harvest an airborne Pheasant rooster with a score of 21 or more.', mission_id: fourthMission.id },

        { name: 'Harvest an airborne Pheasant hen weighing at least 2 pounds.', mission_id: fifthMission.id },
        { name: 'Harvest an airborne Pheasant hen weighing at least 2 pounds.', mission_id: fifthMission.id },

        { name: 'Harvest an airborne rooster with a score of at least 22.', mission_id: sixthMission.id },
        { name: 'Harvest another airborne rooster with a score of at least 22 during the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest another airborne rooster with a score of at least 22 during the same hunt', mission_id: sixthMission.id },

        { name: 'Harvest an airborne Pheasant from the group under the bridge in Canyon Creek.', mission_id: seventhMission.id },
        { name: 'Harvest an airborne Pheasant from the group under the bridge in Canyon Creek.', mission_id: seventhMission.id },

        { name: 'Harvest an airborne Pheasant rooster scoring at least 23 with a .22 Pistol.', mission_id: eighthMission.id },

        { name: 'Harvest an airborne Pheasant south of the Field Lodge on Logger\'s Point.', mission_id: ninthMission.id },
        { name: 'Harvest an airborne Pheasant south of the Middle Tower but north of the Field Lodge on Logger\'s Point.', mission_id: ninthMission.id },
        { name: 'Harvest an airborne Pheasant north of the Middle Tower on Logger\'s Point.', mission_id: ninthMission.id },

        { name: 'Harvest an airborne Pheasant with the Snakebite Compound Bow.', mission_id: tenthMission.id },
    ];
}

async function polarBearMissions() {
    const firstMission = await findMissionBy('name', 'An Odd Predicament');
    const secondMission = await findMissionBy('name', 'Suspicious Findings');
    const thrirdMission = await findMissionBy('name', 'A Shocking Discovery');
    const fourthMission = await findMissionBy('name', 'Someone\'s Prowling Around These Parts');
    const fifthMission = await findMissionBy('name', 'Signs of the Culprit');
    const sixthMission = await findMissionBy('name', 'Making Some Noise');
    const seventhMission = await findMissionBy('name', 'Clearing the Path');
    const eighthMission = await findMissionBy('name', 'In Pursuit of the Truth');
    const ninthMission = await findMissionBy('name', 'Bear-demic');
    const tenthMission = await findMissionBy('name', 'The Puppet');

    return [
        { name: 'Locate 3 Polar Bear tracks from the same animal.', mission_id: firstMission.id },

        { name: 'Harvest an unspooked Polar Bear.', mission_id: secondMission.id },

        { name: 'ID Polar Bear droppings.', mission_id: thrirdMission.id },
        { name: 'ID another pile of Polar Bear droppings.', mission_id: thrirdMission.id },

        { name: 'First, harvest a Polar Bear with a score of 25 or higher with 100% Harvest Value.', mission_id: fourthMission.id },
        { name: 'Then, head over to Kosatka Harbour (X: -5.233, Y: -12.676) in Whiterime Ridge in the same hunt.', mission_id: fourthMission.id },

        { name: 'First, spot a Polar Bear without spooking it.', mission_id: fifthMission.id },
        { name: 'Then, spot a Polar Bear without spooking it from a Tripod Stand.', mission_id: fifthMission.id },
        { name: 'Finally, spot a Polar Bear without spooking it from a Tree Stand.', mission_id: fifthMission.id },

        { name: 'Harvest an unspooked Polar Bear while using either .45-70 Government, .405 Ammunition or .340 Weatherby Magnum Ammunition.', mission_id: sixthMission.id },
        { name: 'Harvest another unspooked Polar Bear while using either .45-70 Government, .405 Ammunition or .340 Weatherby Magnum Ammunition.', mission_id: sixthMission.id },

        { name: 'Harvest two Polar Bears within 10 minutes.', mission_id: seventhMission.id },

        { name: 'Harvest a Polar Bear with one shot under 20 meters (approx. 66 ft) while it\'s charging.', mission_id: eighthMission.id },
        { name: 'Harvest another Polar Bear with one shot under 20 meters (approx. 66 ft) while it\'s charging.', mission_id: eighthMission.id },

        { name: 'Harvest an unspooked male Polar Bear at 100% Harvest Value.', mission_id: ninthMission.id },
        { name: 'Harvest another unspooked male Polar Bear at 100% Harvest Value.', mission_id: ninthMission.id },
        { name: 'Harvest an unspooked female Polar Bear at 100% Harvest Value.', mission_id: ninthMission.id },
        { name: 'Harvest another unspooked female Polar Bear at 100% Harvest Value.', mission_id: ninthMission.id },

        { name: 'Harvest Angelica\'s Polar Bear by the peninsula north of Whiterime Ridge (X: -2.436, Y: -12.426) while it\'s charging.', mission_id: tenthMission.id },
    ];
}

async function redDeerMissions() {
    const firstMission = await findMissionBy('name', 'Easy Going');
    const secondMission = await findMissionBy('name', 'Drill Sergeant Doc');
    const thrirdMission = await findMissionBy('name', 'A Touch Of Class');
    const fourthMission = await findMissionBy('name', 'Prime Cuts');
    const fifthMission = await findMissionBy('name', 'Meat Robbery');
    const sixthMission = await findMissionBy('name', 'Surgical Precision');
    const seventhMission = await findMissionBy('name', 'All In');
    const eighthMission = await findMissionBy('name', 'Shame On You');
    const ninthMission = await findMissionBy('name', 'On The Arrogance Of Deer');
    const tenthMission = await findMissionBy('name', 'Leaving The Nest');

    return [
        { name: 'Harvest a Red Deer.', mission_id: firstMission.id },

        { name: 'First: ID Red Deer Tracks.', mission_id: secondMission.id },
        { name: 'Then spot a Red Deer during the same hunt.', mission_id: secondMission.id },
        { name: 'After that, ID a call of a Red Deer during the same hunt.', mission_id: secondMission.id },

        { name: 'Harvest a male Red Deer of at least 120 points.', mission_id: thrirdMission.id },

        { name: 'Harvest a Red Deer weighing at least 200 kg (approx. 441 lbs).', mission_id: fourthMission.id },
        { name: 'Harvest a Red Deer weighing at least 200 kg (approx. 441 lbs).', mission_id: fourthMission.id },

        { name: 'Harvest a Red Deer weighing at least 200 kgs (approx. 441 lbs.) using a 12 GA Blaser F3 Game O/U Shotgun loaded with Slug Ammunition.', mission_id: fifthMission.id },

        { name: 'Harvest female Red Deer using the .9.3x62 Anschütz 1780 D FL Bolt Action Rifle with a heart shot.', mission_id: sixthMission.id },

        { name: 'ID Tracks of a male Red Deer.', mission_id: seventhMission.id },
        { name: 'Harvest a male Red Deer while crouching during the same hunt.', mission_id: seventhMission.id },
        { name: 'ID Tracks of another male Red Deer during the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest the a male Red Deer while prone during the same hunt.', mission_id: seventhMission.id },
        { name: 'ID Tracks of a female Red Deer during the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest a female Red Deer while crouching during the same hunt.', mission_id: seventhMission.id },
        { name: 'ID Tracks of another female Red Deer during the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest a female Red Deer while prone during the same hunt.', mission_id: seventhMission.id },

        { name: 'Harvest a Red Deer at a minimum of 100 meters (approx. 328 ft) using a Ground Blind.', mission_id: eighthMission.id },
        { name: 'Harvest a Red Deer at a minimum of 100 meters (approx. 328 ft) using a Ground Blind during the same hunt.', mission_id: eighthMission.id },

        { name: 'Harvest a Red Deer using a .308 "Rival" Handgun from under 30 meters (approx. 98 ft.).', mission_id: ninthMission.id },

        { name: 'Harvest a male Red Deer of at least 200 points using a .308 Anschütz 1780 D FL Bolt Action Rifle (Heartwood).', mission_id: tenthMission.id },
    ];
}

async function redFoxMissions() {
    const firstMission = await findMissionBy('name', 'Something Rotten In The Evergreen Hunting Reserve');
    const secondMission = await findMissionBy('name', 'This Town Ain\'t Big Enough For The Both Of Us');
    const thrirdMission = await findMissionBy('name', 'Making A Scene');
    const fourthMission = await findMissionBy('name', 'Going Undercover');
    const fifthMission = await findMissionBy('name', 'Playing Along');
    const sixthMission = await findMissionBy('name', 'The Insider');
    const seventhMission = await findMissionBy('name', 'It\'s All So Quiet');
    const eighthMission = await findMissionBy('name', 'Fat Boom');
    const ninthMission = await findMissionBy('name', 'Supernatural Ninja');
    const tenthMission = await findMissionBy('name', 'The Dignity Of Foxes');

    return [
        { name: 'ID tracks from a Red Fox.', mission_id: firstMission.id },
        { name: 'ID tracks from a Red Fox.', mission_id: firstMission.id },
        { name: 'ID tracks from a Red Fox.', mission_id: firstMission.id },
        { name: 'ID tracks from a Red Fox.', mission_id: firstMission.id },

        { name: 'Spot a Red Fox.', mission_id: secondMission.id },
        { name: 'Harvest a Red Fox during the same hunt.', mission_id: secondMission.id },

        { name: 'Harvest a Red Fox.', mission_id: thrirdMission.id },
        { name: 'Harvest a Red Fox during the same hunt.', mission_id: thrirdMission.id },
        { name: 'Harvest a Red Fox during the same hunt.', mission_id: thrirdMission.id },

        { name: 'Harvest a Red Fox of at least 9 kg (approx. 20 lbs).', mission_id: fourthMission.id },

        { name: 'Harvest a Red Fox while prone.', mission_id: fifthMission.id },
        { name: 'Harvest a Red Fox while prone during the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest a Red Fox while prone during the same hunt.', mission_id: fifthMission.id },

        { name: 'Harvest a Red Fox using a .223 Bolt Action Rifle at a minimum distance of 70 meters (approx. 230 ft).', mission_id: sixthMission.id },

        { name: 'Harvest a Red Fox of at least 10 kg (approx. 22 lbs) using a .357 Handgun.', mission_id: seventhMission.id },
        { name: 'Harvest a Red Fox of at least 10 kg (approx. 22 lbs) using a .357 Handgun.', mission_id: seventhMission.id },

        { name: 'ID five tracks, droppings or calls of the same Red Fox.', mission_id: eighthMission.id },
        { name: 'Harvest a Red Fox of at least 11 kg (approx. 24 lbs) using a 12 GA Blaser F3 Game O/U Shotgun loaded with Buckshot during the same hunt.', mission_id: eighthMission.id },

        { name: 'Harvest a Red Fox using a Parker Python Compound Bow.', mission_id: ninthMission.id },
        { name: 'Harvest a Red Fox using a Parker Python Compound Bow during the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest a Red Fox using a Parker Python Compound Bow during the same hunt.', mission_id: ninthMission.id },

        { name: 'Harvest a Red Fox of maximum 8 kg (approx 18 lbs) using a Tripod.', mission_id: tenthMission.id },
        { name: 'Harvest a Red Fox of maximum 8 kg (approx 18 lbs) using a Tripod.', mission_id: tenthMission.id },
        { name: 'Harvest a Red Fox of maximum 8 kg (approx 18 lbs) using a Tripod.', mission_id: tenthMission.id },
    ];
}

async function redKangarooMissions() {
    const firstMission = await findMissionBy('name', 'The Big Jumper');
    const secondMission = await findMissionBy('name', 'Seeing Red');
    const thrirdMission = await findMissionBy('name', 'Speedster');
    const fourthMission = await findMissionBy('name', 'True Kangaroo Hunter');
    const fifthMission = await findMissionBy('name', 'Gender Science');
    const sixthMission = await findMissionBy('name', 'Hat-trick');
    const seventhMission = await findMissionBy('name', 'Big And Slow');
    const eighthMission = await findMissionBy('name', 'Little Hooligan');
    const ninthMission = await findMissionBy('name', 'Big Boxer');
    const tenthMission = await findMissionBy('name', 'Barely Seeing Red');

    return [
        { name: 'ID tracks from a Red Kangaroo.', mission_id: firstMission.id },
        { name: 'ID a second set tracks from a Red Kangaroo.', mission_id: firstMission.id },
        { name: 'ID a third set tracks from a Red Kangaroo.', mission_id: firstMission.id },

        { name: 'ID dropping from a Red Kangaroo.', mission_id: secondMission.id },
        { name: 'Then spot a Red Kangaroo during the same hunt.', mission_id: secondMission.id },

        { name: 'Harvest a Red Kangaroo.', mission_id: thrirdMission.id },

        { name: 'Harvest an unspooked Red Kangaroo with a single shot to the brain.', mission_id: fourthMission.id },

        { name: 'Spot a female Red Kangaroo during the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest a female Red Kangaroo during the same hunt.', mission_id: fifthMission.id },
        { name: 'Spot a male Red Kangaroo during the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest a male Red Kangaroo during the same hunt.', mission_id: fifthMission.id },

        { name: 'Harvest a Red Kangaroo using the 8x57 K98k Bolt Action Rifle.', mission_id: sixthMission.id },
        { name: 'Harvest a second Red Kangaroo using the 8x57 K98k Bolt Action Rifle during the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest a third Red Kangaroo using the 8x57 K98k Bolt Action Rifle during the same hunt.', mission_id: sixthMission.id },

        { name: 'Spot a Red Kangaroo.', mission_id: seventhMission.id },
        { name: 'Harvest an unspooked Red Kangaroo using a Longbow.', mission_id: seventhMission.id },
        { name: 'Spot another Red Kangaroo.', mission_id: seventhMission.id },
        { name: 'Harvest another unspooked Red Kangaroo using a Longbow.', mission_id: seventhMission.id },

        { name: 'ID tracks from a Red Kangaroo during the same session.', mission_id: eighthMission.id },
        { name: 'ID dropping from a Red Kangaroo during the same session.', mission_id: eighthMission.id },
        { name: 'Spot a Red Kangaroo during the same session.', mission_id: eighthMission.id },
        { name: 'Harvest a Red Kangaroo killed with a single shot at a distance of minimum 30 meters using the 12 GA Single Shot Shotgun during the same session.', mission_id: eighthMission.id },

        { name: 'Harvest a female Red Kangaroo weighing at least 33.5 kilos using a .30-06 Lever Action Rifle.', mission_id: ninthMission.id },
        { name: 'Harvest a male Red Kangaroo weighing at least 75 kilos using a .30-06 Lever Action Rifle.', mission_id: ninthMission.id },

        { name: 'Harvest an unspooked Red Kangaroo scoring at least 75 with a single shot at a distance of at least 75 meters with any scoped Anchütz rifle.', mission_id: tenthMission.id },
        { name: 'Harvest another unspooked Red Kangaroo scoring at least 75 with a single at a distance of at least 75 meters with any scoped Anchütz rifle weapon during the same hunt.', mission_id: tenthMission.id },
    ];
}

async function reindeerMissions() {
    const firstMission = await findMissionBy('name', 'Opening Credits');
    const secondMission = await findMissionBy('name', 'For Dramatic Effect');
    const thrirdMission = await findMissionBy('name', 'Horrible Terrible Nature');
    const fourthMission = await findMissionBy('name', 'Tensions Rise');
    const fifthMission = await findMissionBy('name', 'Become Part Of The Herd');
    const sixthMission = await findMissionBy('name', 'Are We Reindeer? No We Are Human!');
    const seventhMission = await findMissionBy('name', 'The Reindeer Man Cometh');
    const eighthMission = await findMissionBy('name', 'Eye In The Sky');
    const ninthMission = await findMissionBy('name', 'The Sleeping Reindeer');
    const tenthMission = await findMissionBy('name', 'The Unraveling');

    return [
        { name: 'Spot a Reindeer bull.', mission_id: firstMission.id },
        { name: 'Spot a Reindeer cow.', mission_id: firstMission.id },

        { name: 'ID a call of a Reindeer bull.', mission_id: secondMission.id },
        { name: 'ID a call of a Reindeer cow.', mission_id: secondMission.id },

        { name: 'Harvest a Reindeer.', mission_id: thrirdMission.id },

        { name: 'Harvest a Reindeer at 100% Harvest Value.', mission_id: fourthMission.id },
        { name: 'Harvest another Reindeer at 100% Harvest Value in the same hunt.', mission_id: fourthMission.id },
        { name: 'Harvest another Reindeer at 100% Harvest Value in the same hunt.', mission_id: fourthMission.id },

        { name: 'Find the tracks of three different Reindeer within 5 minutes.', mission_id: fifthMission.id },

        { name: 'Harvest a Reindeer using the Inline Muzzleloader loaded with a .45 Saboted Bullet without a scope.', mission_id: sixthMission.id },

        { name: 'Harvest a Reindeer from Tower 1 (the south eastern tower) in Hemmeldal using 8x57 ammunition.', mission_id: seventhMission.id },
        { name: 'Harvest a Reindeer from Tower 2 (the central tower) in Hemmeldal using 8x57 ammunition.', mission_id: seventhMission.id },
        { name: 'Harvest a Reindeer from Tower 3 (the northern tower) in Hemmeldal using 8x57 ammunition.', mission_id: seventhMission.id },

        { name: 'Harvest a Reindeer from a maximum of 20 meter (approx. 66 ft.) using a .30-30 Lever Action Rifle.', mission_id: eighthMission.id },
        { name: 'Harvest another Reindeer from a maximum of 20 meter (approx. 66 ft.) using a .30-30 Lever Action Rifle in the same hunt.', mission_id: eighthMission.id },

        { name: 'Harvest a Reindeer bull at 100% Harvest Value with one heart shot.', mission_id: ninthMission.id },

        { name: 'Harvest a Reindeer from at least 75 meter (approx. 246 ft.) using a Parker Python Compound Bow.', mission_id: tenthMission.id },
    ];
}

async function ptarmiganMissions() {
    const firstMission = await findMissionBy('name', 'Haud Yer Wheesht!');
    const secondMission = await findMissionBy('name', 'All Ptarmigans a\' Jock Tamson\'s Bairns!');
    const thrirdMission = await findMissionBy('name', 'It\'s a Lang Road That\'s No Goat a Turnin\'!');
    const fourthMission = await findMissionBy('name', 'Guid Gear Comes in Sma\' Bulk!');
    const fifthMission = await findMissionBy('name', 'It\'s a Sair Ficht For Half a Loaf!');
    const sixthMission = await findMissionBy('name', 'Noo Jist Haud On!');
    const seventhMission = await findMissionBy('name', 'Dinnae Teach Yer Granny Tae Suck Eggs!');
    const eighthMission = await findMissionBy('name', 'Bletherin\' Birds, Ah Tell Ye!');
    const ninthMission = await findMissionBy('name', 'The Baw\'s on The Slates!');
    const tenthMission = await findMissionBy('name', 'Speak o\' the Devil!');

    return [
        { name: 'ID 3 tracks from any species of Ptarmigan.', mission_id: firstMission.id },

        { name: 'Harvest one of any species of Ptarmigan while it\'s airborne.', mission_id: secondMission.id },

        { name: 'Harvest an airborne Rock Ptarmigan with any Shotgun.', mission_id: thrirdMission.id },
        { name: 'Harvest another airborne Rock Ptarmigan with any Shotgun.', mission_id: thrirdMission.id },
        { name: 'Harvest one final airborne Rock Ptarmigan with any Shotgun.', mission_id: thrirdMission.id },

        { name: 'Harvest an airborne Rock Ptarmigan weighing less than 0.55 kg (Approx. 1.21 lbs).', mission_id: fourthMission.id },
        { name: 'Harvest another airborne Rock Ptarmigan weighing less than 0.55 kg (Approx. 1.21 lbs).', mission_id: fourthMission.id },

        { name: 'Harvest an airborne Willow Ptarmigan with a score lower than 500.', mission_id: fifthMission.id },

        { name: 'Harvest two airborne Willow Ptarmigan within 10 minutes of each harvest.', mission_id: sixthMission.id },

        { name: 'First, harvest an airborne White-tailed Ptarmigan.', mission_id: seventhMission.id },
        { name: 'Then, harvest another airborne White-tailed Ptarmigan with a weight of 0.4 kg (Approx. 0.88 lbs) or higher.', mission_id: seventhMission.id },
        { name: 'Finally, harvest another airborne White-tailed Ptarmigan with a score of 400 or higher.', mission_id: seventhMission.id },

        { name: 'First, identify a call from a White-tailed Ptarmigan.', mission_id: eighthMission.id },
        { name: 'Then, harvest an airborne White-tailed Ptarmigan with the 12GA Single Shot Shotgun at 100% Harvest Value.', mission_id: eighthMission.id },
        { name: 'Then, harvest another airborne White-tailed Ptarmigan with the 12GA Single Shot Shotgun at 100% Harvest Value.', mission_id: eighthMission.id },
        { name: 'Then, harvest one final airborne White-tailed Ptarmigan with the 12GA Single Shot Shotgun at 100% Harvest Value.', mission_id: eighthMission.id },

        { name: 'Harvest one of any species of Ptarmigan at over 25 meters (Approx. 82 feet) while it\'s airborne.', mission_id: ninthMission.id },

        { name: 'Harvest an airborne Rock Ptarmigan with a score of 600 or higher shot at under 20 meters (Approx. 66 feet).', mission_id: tenthMission.id },
        { name: 'Harvest an airborne Willow Ptarmigan with a score of 700 or higher shot at under 20 meters (Approx. 66 feet).', mission_id: tenthMission.id },
        { name: 'Harvest an airborne White-tailed Ptarmigan with a score of 400 or higher shot at under 20 meters (Approx. 66 feet).', mission_id: tenthMission.id },
    ];
}

async function rockyMountainElkMissions() {
    const firstMission = await findMissionBy('name', 'Fresh Produce');
    const secondMission = await findMissionBy('name', 'Bugle Boy');
    const thrirdMission = await findMissionBy('name', 'Turf Wars');
    const fourthMission = await findMissionBy('name', 'Fighting Flora');
    const fifthMission = await findMissionBy('name', 'Verification');
    const sixthMission = await findMissionBy('name', 'Traditions');
    const seventhMission = await findMissionBy('name', 'Sensus');
    const eighthMission = await findMissionBy('name', 'Rock and Roll');
    const ninthMission = await findMissionBy('name', 'True Love');
    const tenthMission = await findMissionBy('name', 'Main Attraction');

    return [
        { name: 'Harvest a female Rocky Mountain Elk.', mission_id: firstMission.id },

        { name: 'Harvest a male Rocky Mountain Elk.', mission_id: secondMission.id },

        { name: 'Spot a male Rocky Mountain Elk.', mission_id: thrirdMission.id },
        { name: 'ID droppings from a male Rocky Mountain Elk.', mission_id: thrirdMission.id },

        { name: 'Harvest a Rocky Mountain Elk using any .45-70 rifle without hitting it in the intestines.', mission_id: fourthMission.id },
        { name: 'Harvest another Rocky Mountain Elk using any .45-70 rifle without hitting it in the intestines in the same hunt.', mission_id: fourthMission.id },

        { name: 'Harvest a male Rocky Mountain Elk with more than 10 typical points.', mission_id: fifthMission.id },
        { name: 'Harvest a male Rocky Mountain Elk with less than 10 typical points.', mission_id: fifthMission.id },
        { name: 'Harvest a female Rocky Mountain Elk.', mission_id: fifthMission.id },

        { name: 'Harvest a male Rocky Mountain Elk with any Recurve Bow from less than 30m (approx. 99ft.).', mission_id: sixthMission.id },
        { name: 'Harvest another male Rocky Mountain Elk with any Recurve Bow from less than 30m (approx. 99ft.).', mission_id: sixthMission.id },

        { name: 'Harvest a female Rocky Mountain Elk with .30-06 ammunition ( Round Nose, Nosler).', mission_id: seventhMission.id },
        { name: 'Harvest another female Rocky Mountain Elk with .30-06 ammunition ( Round Nose, Nosler) in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another female Rocky Mountain Elk with .30-06 ammunition ( Round Nose, Nosler) in the same hunt.', mission_id: seventhMission.id },

        { name: 'Harvest a male Rocky Mountain Elk with more than 12 typical points using any ethical rifle ammunition.', mission_id: eighthMission.id },
        { name: 'Harvest another male Rocky Mountain Elk with more than 12 typical points using any ethical rifle ammunition.', mission_id: eighthMission.id },

        { name: 'Harvest a male Rocky Mountain Elk with .454 ammunition.', mission_id: ninthMission.id },
        { name: 'Harvest a female Rocky Mountain Elk with .454 ammunition in the same hunt.', mission_id: ninthMission.id },

        { name: 'Harvest a male Rocky Mountain Elk with more than 14 typical points using a blind, tower, stand or shooting tripod rest from less than 50m (approx. 164ft.).', mission_id: tenthMission.id },
    ];
}

async function roeDeerMissions() {
    const firstMission = await findMissionBy('name', 'An Unknown Friend');
    const secondMission = await findMissionBy('name', 'The Mystery Thickens');
    const thrirdMission = await findMissionBy('name', 'The Inside Man');
    const fourthMission = await findMissionBy('name', 'Foul Play');
    const fifthMission = await findMissionBy('name', 'Payback');
    const sixthMission = await findMissionBy('name', 'Death Notice');
    const seventhMission = await findMissionBy('name', 'Cleaning Up');
    const eighthMission = await findMissionBy('name', 'Silent Justice');
    const ninthMission = await findMissionBy('name', 'Taking A Stand');
    const tenthMission = await findMissionBy('name', 'Boss Fight');

    return [
        { name: 'ID a Roe Deer call.', mission_id: firstMission.id },
        { name: 'ID Roe Deer tracks during the same outing.', mission_id: firstMission.id },
        { name: 'ID Roe Deer droppings during the same outing.', mission_id: firstMission.id },

        { name: 'Harvest a Roe Deer buck scoring at least 120 points.', mission_id: secondMission.id },

        { name: 'Travel to Orm\'s Stone in Hemmeldal.', mission_id: thrirdMission.id },

        { name: 'Harvest a Roe Deer using a 8x57 IS Anschütz 1780 D FL Bolt Action Rifle from a minimum of 100 meters (approx. 328ft).', mission_id: fourthMission.id },

        { name: 'Harvest a Roe Deer using Buckshot.', mission_id: fifthMission.id },
        { name: 'Harvest another Roe Deer using Buckshot in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest another Roe Deer using Buckshot in the same hunt.', mission_id: fifthMission.id },
        { name: 'Harvest another Roe Deer using Buckshot in the same hunt.', mission_id: fifthMission.id },

        { name: 'Harvest a Roe Deer weighing at least 25 kg (approx. 55 lbs.) using using a .30-06 Lever Action Rifle.', mission_id: sixthMission.id },
        { name: 'Harvest a Roe Deer weighing at least 25 kg (approx. 55 lbs.) using using a .30-06 Lever Action Rifle during the same hunt.', mission_id: sixthMission.id },

        { name: 'Harvest a Roe Deer buck scoring at least 140 points.', mission_id: seventhMission.id },
        { name: 'Harvest a Roe Deer buck scoring at least 140 points.', mission_id: seventhMission.id },
        { name: 'Harvest a Roe Deer buck scoring at least 140 points.', mission_id: seventhMission.id },
        { name: 'Harvest a Roe Deer buck scoring at least 140 points.', mission_id: seventhMission.id },

        { name: 'Harvest a Roe Deer buck using a Compound Bow weighing at least 30 kg (approx. 66 lbs.).', mission_id: eighthMission.id },
        { name: 'Harvest a Roe Deer buck using a Compound Bow weighing at least 30 kg (approx. 66 lbs.) in the same hunt.', mission_id: eighthMission.id },

        { name: 'Harvest Roe Deer using a Tree Stand.', mission_id: ninthMission.id },
        { name: 'Harvest Roe Deer using a Tree Stand during the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest Roe Deer using a Tree Stand during the same hunt.', mission_id: ninthMission.id },

        { name: 'ID the call of a unique Roe Deer.', mission_id: tenthMission.id },
        { name: 'ID the call of a unique Roe Deer during the same hunt.', mission_id: tenthMission.id },
        { name: 'ID the call of a unique Roe Deer during the same hunt.', mission_id: tenthMission.id },
        { name: 'After those calls are registered: Harvest a Roe Deer buck scoring at least 160 points in the same hunt.', mission_id: tenthMission.id },
    ];
}

async function rooseveltElkMissions() {
    const firstMission = await findMissionBy('name', 'Getting Hooked - Part 1');
    const secondMission = await findMissionBy('name', 'Getting Hooked - Part 2');
    const thrirdMission = await findMissionBy('name', 'Getting Hooked - Part 3');
    const fourthMission = await findMissionBy('name', 'Twilight Aria');
    const fifthMission = await findMissionBy('name', 'Renegades');
    const sixthMission = await findMissionBy('name', '6 Points of Madness');
    const seventhMission = await findMissionBy('name', 'Introductions - Part 1');
    const eighthMission = await findMissionBy('name', 'Introductions - Part 2');
    const ninthMission = await findMissionBy('name', 'Acceptance');
    const tenthMission = await findMissionBy('name', 'Taking Down the King');
    const eleventhMission = await findMissionBy('name', 'Requests & Favors');
    const twelfthMission = await findMissionBy('name', 'Take an Elk from a Tower');
    const thirteenthMission = await findMissionBy('name', 'Lucky 7');
    const fourteenthMission = await findMissionBy('name', 'In Your Face');
    const fifteenthMission = await findMissionBy('name', 'Magnum Opus');
    const sixteenthMission = await findMissionBy('name', 'Perfect Your Range');
    const seventeenthMission = await findMissionBy('name', 'Against the Clock...');

    return [
        { name: 'Spot an Elk.', mission_id: firstMission.id },

        { name: 'Locate 3 Roosevelt Elk tracks.', mission_id: secondMission.id },

        { name: 'Harvest an Elk.', mission_id: thrirdMission.id },

        { name: 'Identify a call from a male Elk.', mission_id: fourthMission.id },
        { name: 'Identify a call from a female Elk.', mission_id: fourthMission.id },

        { name: 'Harvest a female Elk.', mission_id: fifthMission.id },
        { name: 'Harvest a female Elk.', mission_id: fifthMission.id },

        { name: 'Harvest a male Elk with at least 6 typical points.', mission_id: sixthMission.id },

        { name: 'Spot a fine female Elk.', mission_id: seventhMission.id },
        { name: 'Spot a dandy male Elk.', mission_id: seventhMission.id },

        { name: 'Identify the a tracks from three different Roosevelt Elk within a span of 5 min.', mission_id: eighthMission.id },

        { name: 'Harvest an Elk from under 45.72m (approx. 150ft.).', mission_id: ninthMission.id },

        { name: 'Harvest an Elk Bull over 453.6kg (approx. 1000lbs).', mission_id: tenthMission.id },

        { name: 'Harvest an Elk Bull with at least 10 typical points.', mission_id: eleventhMission.id },

        { name: 'Harvest an Elk from a Hunting Tower.', mission_id: twelfthMission.id },

        { name: 'Harvest a 2pt Elk Bull.', mission_id: thirteenthMission.id },
        { name: 'Harvest a 4pt Elk Bull.', mission_id: thirteenthMission.id },
        { name: 'Harvest a 6pt Elk Bull.', mission_id: thirteenthMission.id },
        { name: 'Harvest a 8pt Elk Bull.', mission_id: thirteenthMission.id },
        { name: 'Harvest a 10pt Elk Bull.', mission_id: thirteenthMission.id },
        { name: 'Harvest a 12pt Elk Bull.', mission_id: thirteenthMission.id },
        { name: 'Harvest a 14pt Elk Bull.', mission_id: thirteenthMission.id },

        { name: 'Harvest an Elk Bull from 15.24m (approx. 50ft.) or less.', mission_id: fourteenthMission.id },

        { name: 'Harvest an Elk Cow with a scoped .44 Magnum Revolver.', mission_id: fifteenthMission.id },
        { name: 'Harvest an Elk Cow with a scoped .44 Magnum Revolver.', mission_id: fifteenthMission.id },

        { name: 'Harvest an Elk at a range of 59.43m - 62.49m (approx. 195 - 205 ft.).', mission_id: sixteenthMission.id },

        { name: 'Harvest an Elk 5 minutes after another.', mission_id: seventeenthMission.id },
    ];
}

async function rusaDeerMissions() {
    const firstMission = await findMissionBy('name', 'The Fundamentals of the Rusa');
    const secondMission = await findMissionBy('name', 'The Two Rusa');
    const thrirdMission = await findMissionBy('name', 'The Return of the Rusa');
    const fourthMission = await findMissionBy('name', 'An Unexpected Rusa');
    const fifthMission = await findMissionBy('name', 'The Desolation of Rusa');
    const sixthMission = await findMissionBy('name', 'The Battle of the Five Rusa');
    const seventhMission = await findMissionBy('name', 'The Phantom Rusa');
    const eighthMission = await findMissionBy('name', 'Revenge of the Rusa');
    const ninthMission = await findMissionBy('name', 'The Rusa Awakens');
    const tenthMission = await findMissionBy('name', 'The Last Rusa');

    return [
        { name: 'ID a Rusa Deer dropping.', mission_id: firstMission.id },
        { name: 'Spot a Rusa Deer.', mission_id: firstMission.id },

        { name: 'First, harvest a male Rusa Deer.', mission_id: secondMission.id },
        { name: 'Then, harvest another male Rusa Deer in the same hunt.', mission_id: secondMission.id },

        { name: 'First, harvest an unspooked male Rusa Deer with any Recurve Bow at over 40 meters.', mission_id: thrirdMission.id },
        { name: 'Then, harvest a male Rusa Deer with one shot while standing at under 20 meters.', mission_id: thrirdMission.id },

        { name: 'Harvest an unspooked male Rusa Deer weighing less than 130 kg (Approx. 286 lbs).', mission_id: fourthMission.id },
        { name: 'Harvest a male Feral Hog in Piccabeen Bay.', mission_id: fourthMission.id },

        { name: 'Spot a Rusa Deer.', mission_id: fifthMission.id },
        { name: 'Spot another Rusa Deer.', mission_id: fifthMission.id },
        { name: 'Harvest a Sambar Deer with a weight of 420 kg (Approx. 926 lbs) or higher using any Crossbow with one shot.', mission_id: fifthMission.id },

        { name: 'Harvest a male Rusa Deer at 100% Harvest Value.', mission_id: sixthMission.id },
        { name: 'Then, harvest another male Rusa Deer at 100% Harvest Value.', mission_id: sixthMission.id },
        { name: 'Then, harvest another male Rusa Deer at 100% Harvest Value.', mission_id: sixthMission.id },
        { name: 'Finally, harvest a charging Water Buffalo with any ethical Muzzleloader ammo.', mission_id: sixthMission.id },

        { name: 'Harvest two Rusa Deer within 5 minutes.', mission_id: seventhMission.id },

        { name: 'First, harvest an unspooked male Rusa Deer with a heartshot. Other organs may be hit.', mission_id: eighthMission.id },
        { name: 'Then, harvest an unspooked male Rusa Deer at under 20 meters (Approx. 65 feet) while standing.', mission_id: eighthMission.id },
        { name: 'Finally, harvest an unspooked male Rusa Deer at 100% Harvest Value from a Treestand, Blind, Tripod Stand, Tower or Shooting Tripod.', mission_id: eighthMission.id },

        { name: 'Harvest a male Rusa Deer with a heartshot at 30 meters (Approx. 98 feet) or further with a score of 120 or higher. Other organs may be hit.', mission_id: ninthMission.id },

        { name: 'Kill two Rusa Deer at the same time with a single shot.', mission_id: tenthMission.id },
    ];
}

async function sambarDeerMissions() {
    const firstMission = await findMissionBy('name', 'Entering the Odd Zone');
    const secondMission = await findMissionBy('name', 'Sample Analysis');
    const thrirdMission = await findMissionBy('name', 'Second-Rate Results');
    const fourthMission = await findMissionBy('name', 'Sambar Epidemic');
    const fifthMission = await findMissionBy('name', 'Inconclusive Results');
    const sixthMission = await findMissionBy('name', 'Witchcraft? No. Science!');
    const seventhMission = await findMissionBy('name', 'Shoot for Your Life');
    const eighthMission = await findMissionBy('name', 'The Resistance');
    const ninthMission = await findMissionBy('name', 'A Shocking Turn of Events');
    const tenthMission = await findMissionBy('name', 'Patient Zero');

    return [
        { name: 'ID tracks from a Sambar Deer.', mission_id: firstMission.id },
        { name: 'ID droppings from a Sambar Deer.', mission_id: firstMission.id },
        { name: 'Identify a call from a Sambar Deer.', mission_id: firstMission.id },

        { name: 'Harvest a Sambar Deer.', mission_id: secondMission.id },
        { name: 'Harvest another Sambar Deer.', mission_id: secondMission.id },

        { name: 'Harvest a male Sambar Deer at 100% Harvest Value in the same hunt.', mission_id: thrirdMission.id },
        { name: 'Harvest another male Sambar Deer at 100% Harvest Value in the same hunt.', mission_id: thrirdMission.id },

        { name: 'Harvest a male Sambar Deer using any Recurve Bow with one shot.', mission_id: fourthMission.id },

        { name: 'Spot a male Sambar Deer.', mission_id: fifthMission.id },
        { name: 'Spot a female Sambar Deer.', mission_id: fifthMission.id },
        { name: 'After completing the first two objectives, harvest a Sambar Deer with a weight of 300 kg (Approx. 661 lbs) or higher at 100% Harvest Value.', mission_id: fifthMission.id },

        { name: 'First, harvest a male Sambar Deer at 100% Harvest Value with a weight of 420 kg (Approx. 926 lbs) or higher.', mission_id: sixthMission.id },
        { name: 'Then, harvest a male Sambar Deer at 100% Harvest Value with a score of 180 or higher.', mission_id: sixthMission.id },
        { name: 'Then, harvest a female Sambar Deer at 100% Harvest Value with one shot.', mission_id: sixthMission.id },
        { name: 'Then, harvest a female Sambar Deer at 100% Harvest Value with a weight of 200 kg (Approx. 441 lbs) or lower.', mission_id: sixthMission.id },
        { name: 'Finally, harvest any Sambar Deer at 100% Harvest Value with any shotgun using Slug Shells.', mission_id: sixthMission.id },

        { name: 'Harvest two male Sambar Deer within 10 minutes of each harvest.', mission_id: seventhMission.id },

        { name: 'Harvest a male Sambar Deer at 100% Harvest Value with a score of 210 or higher at under 40 meters (Approx. 131 feet).', mission_id: eighthMission.id },
        { name: 'Then, harvest a male Sambar Deer at 100% Harvest Value with a score of 215 or higher at under 30 meters (Approx. 98 feet).', mission_id: eighthMission.id },
        { name: 'Finally, harvest a male Sambar Deer at 100% Harvest Value with a score of 220 or higher at under 25 meters (Approx. 82 feet).', mission_id: eighthMission.id },

        { name: 'Harvest a male Sambar Deer at 100% Harvest Value at over 20 meters (Approx. 66 feet) from a Tree Stand and in the same hunt.', mission_id: ninthMission.id },
        { name: 'Harvest a female Sambar Deer at 100% Harvest Value at over 30 meters (Approx. 98 feet) from a Tree Stand and in the same hunt.', mission_id: ninthMission.id },

        { name: 'Harvest "Patient Zero" by the large beach north of Piccabeen Bay (X: 6.273, Y: 6.330) at over 100 meters (Approx. 328 feet) with 100% Harvest Value.', mission_id: tenthMission.id },
    ];
}

async function sitkaDeerMissions() {
    const firstMission = await findMissionBy('name', 'Theres Been a Disappearance');
    const secondMission = await findMissionBy('name', 'Got What it Takes?');
    const thrirdMission = await findMissionBy('name', 'Dinnertime');
    const fourthMission = await findMissionBy('name', 'Unexpected Visitor');
    const fifthMission = await findMissionBy('name', 'The Smell of Fear');
    const sixthMission = await findMissionBy('name', 'Full Moon');
    const seventhMission = await findMissionBy('name', 'Sneaky Suspicions');
    const eighthMission = await findMissionBy('name', 'The Legend of Afterland Lodge');
    const ninthMission = await findMissionBy('name', 'Stone Cold Heart');
    const tenthMission = await findMissionBy('name', 'Blood Moon Rising');

    return [
        { name: 'Identify the call of a Sitka Deer.', mission_id: firstMission.id },

        { name: 'Identify a set of footprints of a Sitka Deer.', mission_id: secondMission.id },
        { name: 'Spot a Sitka Deer in the same hunt.', mission_id: secondMission.id },

        { name: 'Harvest a Sitka Deer with a weight less than 80 kg using any bow including crossbows.', mission_id: thrirdMission.id },

        { name: 'Harvest a Sitka Deer with a weight less than 75 kg using any permitted ammunition.', mission_id: fourthMission.id },
        { name: 'Harvest another Sitka Deer with a weight less than 75 kg using any permitted ammunition.', mission_id: fourthMission.id },

        { name: 'Harvest a Sitka Deer using any bow including crossbows at 100% Harvest Value', mission_id: fifthMission.id },
        { name: 'Harvest another Sitka Deer using any bow including crossbows at 100% Harvest Value', mission_id: fifthMission.id },

        { name: 'Identify the call of a Sitka Deer.', mission_id: sixthMission.id },
        { name: 'Spot a Sitka Deer in the same hunt.', mission_id: sixthMission.id },
        { name: 'Identify droppings of a Sitka Deer in the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest a Sitka Deer buck with a score of at least 60 in the same hunt.', mission_id: sixthMission.id },

        { name: 'Harvest a Sitka Deer using a .357 revolver with no scope from a distance between 10-15 meters.', mission_id: seventhMission.id },
        { name: 'Harvest a Sitka Deer using a .357 revolver with no scope from a distance between 20-25 meters.', mission_id: seventhMission.id },
        { name: 'Harvest a Sitka Deer using a .357 revolver with no scope from a distance between 30-35 meters.', mission_id: seventhMission.id },
        { name: 'Harvest a Sitka Deer using a .357 revolver with no scope from a distance between 40-45 meters.', mission_id: seventhMission.id },

        { name: 'First: Start a hunt from Afterland Lodge in Whiterime Ridge.', mission_id: eighthMission.id },
        { name: 'Then: Harvest a Sitka Deer buck with a score of 50 or more from a Tree Stand or tripod.', mission_id: eighthMission.id },
        { name: 'Harvest another Sitka Deer buck with a score of 50 or more from a Tree Stand or tripod in the same hunt.', mission_id: eighthMission.id },

        { name: 'Harvest a Sitka Deer with a shot to the heart.', mission_id: ninthMission.id },
        { name: 'Harvest another Sitka Deer with a shot to the heart.', mission_id: ninthMission.id },
        { name: 'Harvest another Sitka Deer with a shot to the heart.', mission_id: ninthMission.id },

        { name: 'Harvest the Sitka Deer, “Wendigo” with a shotgun loaded with slugs in the northern forests of Whiterime Ridge near the frozen waterfall (X: -4167, Y: -11501).', mission_id: tenthMission.id },
    ];
}

async function snowGooseMissions() {
    const firstMission = await findMissionBy('name', 'When Snow Falls, Nature Listens');
    const secondMission = await findMissionBy('name', 'Geese of a Feather');
    const thrirdMission = await findMissionBy('name', 'Meat Market');
    const fourthMission = await findMissionBy('name', 'The Fat Of The Land');
    const fifthMission = await findMissionBy('name', 'Let It Snow, Let It Snow, Let It Snow');
    const sixthMission = await findMissionBy('name', 'Blind Call');
    const seventhMission = await findMissionBy('name', 'A Fox With An Eagle Eye');
    const eighthMission = await findMissionBy('name', 'Catch .22');
    const ninthMission = await findMissionBy('name', 'Snowflakes Are Kisses From Heaven');
    const tenthMission = await findMissionBy('name', 'A Bad Deed Written On Snow');

    return [
        { name: 'ID the call of a Snow Goose', mission_id: firstMission.id },
        { name: 'Then ID the droppings of a Snow Goose in the same hunt.', mission_id: firstMission.id },

        { name: 'Harvest an airborne Snow Goose.', mission_id: secondMission.id },
        { name: 'Then harvest another airborne Snow Goose in the same hunt.', mission_id: secondMission.id },
        { name: 'Then harvest an airborne Snow Goose (Blue color variation) in the same hunt.', mission_id: secondMission.id },

        { name: 'Harvest an airborne Snow Goose weighing at least 3.2 kg (Approx. 7 lbs).', mission_id: thrirdMission.id },
        { name: 'Then harvest another airborne Snow Goose weighing at least 3.2 kg (Approx. 7 lbs) in the same hunt.', mission_id: thrirdMission.id },
        { name: 'Then harvest another airborne Snow Goose weighing at least 3.2 kg (Approx. 7 lbs) in the same hunt.', mission_id: thrirdMission.id },

        { name: 'Harvest an airborne Snow Goose scoring at least 3500.', mission_id: fourthMission.id },
        { name: 'Then harvest another airborne Snow Goose scoring at least 3500 in the same hunt.', mission_id: fourthMission.id },
        { name: 'Then harvest another airborne Snow Goose scoring at least 3500 in the same hunt.', mission_id: fourthMission.id },

        { name: 'Harvest an airborne Snow Goose using a 12 GA Single Shot Shotgun.', mission_id: fifthMission.id },
        { name: 'Then harvest another airborne Snow Goose using a 12 GA Single Shot Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Then harvest another airborne Snow Goose using a 12 GA Single Shot Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Then harvest another airborne Snow Goose using a 12 GA Pump Action Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Then harvest another airborne Snow Goose using a 12 GA Pump Action Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Then harvest another airborne Snow Goose using a 12 GA Pump Action Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Then harvest another airborne Snow Goose using a 20 GA Semi-Automatic Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Then harvest another airborne Snow Goose using a 20 GA Semi-Automatic Shotgun in the same hunt.', mission_id: fifthMission.id },
        { name: 'Then harvest another airborne Snow Goose using a 20 GA Semi-Automatic Shotgun in the same hunt.', mission_id: fifthMission.id },

        { name: 'Harvest an airborne Snow Goose from a Waterfowl Blind at a maximum distance of 15 meter (approx. 49 ft.).', mission_id: sixthMission.id },
        { name: 'Then harvest another airborne Snow Goose from a Waterfowl Blind at a maximum distance of 15 meter (approx. 49 ft.) in the same hunt.', mission_id: sixthMission.id },
        { name: 'Then harvest another airborne Snow Goose from a Waterfowl Blind at a maximum distance of 15 meter (approx. 49 ft.) in the same hunt.', mission_id: sixthMission.id },
        { name: 'Then harvest another airborne Snow Goose from a Waterfowl Blind at a maximum distance of 15 meter (approx. 49 ft.) in the same hunt.', mission_id: sixthMission.id },

        { name: 'Harvest an airborne Snow Goose from a minimum of 60 meters (approx. 197 feet).', mission_id: seventhMission.id },
        { name: 'Harvest another airborne Snow Goose from a minimum of 70 meters (approx. 230 feet) in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another airborne Snow Goose from a minimum of 80 meters (approx. 262 feet) in the same hunt.', mission_id: seventhMission.id },

        { name: 'Harvest an airborne Snow Goose using a .22 ammo.', mission_id: eighthMission.id },
        { name: 'Harvest another airborne Snow Goose using a .22 ammo in the same hunt.', mission_id: eighthMission.id },
        { name: 'Harvest another airborne Snow Goose using a .22 ammo in the same hunt.', mission_id: eighthMission.id },

        { name: 'Harvest an airborne Snow Goose under 15 meters (approx. 49 feet) without using a Waterfowl Blind.', mission_id: ninthMission.id },

        { name: 'Harvest an airborne Snow Goose (blue color variation) using any Compound Bow.', mission_id: tenthMission.id },
    ];
}

async function snowshoeHareMissions() {
    const firstMission = await findMissionBy('name', 'Smelly Evidence');
    const secondMission = await findMissionBy('name', 'Finding the Intruder');
    const thrirdMission = await findMissionBy('name', 'The Tortoise and the Hare');
    const fourthMission = await findMissionBy('name', 'Don\'t Save the Queens');
    const fifthMission = await findMissionBy('name', 'Any Other Hare Around?');
    const sixthMission = await findMissionBy('name', 'Something to Eat');
    const seventhMission = await findMissionBy('name', 'Taking the Heirs');
    const eighthMission = await findMissionBy('name', 'Foxtrot is Secured');
    const ninthMission = await findMissionBy('name', 'Careful with the Choke');
    const tenthMission = await findMissionBy('name', 'Something to Compensate With');

    return [
        { name: 'ID droppings from a Snowshoe Hare.', mission_id: firstMission.id },
        { name: 'ID more droppings from a Snowshoe Hare in the same hunt.', mission_id: firstMission.id },

        { name: 'Harvest a Snowshoe Hare.', mission_id: secondMission.id },
        { name: 'Harvest a Snowshoe Hare.', mission_id: secondMission.id },

        { name: 'Harvest two Snowshoe Hares with 5 minutes of the first harvest.', mission_id: thrirdMission.id },

        { name: 'Harvest a female Snowshoe Hare.', mission_id: fourthMission.id },
        { name: 'Harvest another female Snowshoe Hare.', mission_id: fourthMission.id },
        { name: 'Harvest another female Snowshoe Hare.', mission_id: fourthMission.id },

        { name: 'Spot a Snowshoe Hare.', mission_id: fifthMission.id },
        { name: 'Spot another Snowshoe Hare in the same hunt.', mission_id: fifthMission.id },
        { name: 'Spot another Snowshoe Hare in the same hunt.', mission_id: fifthMission.id },
        { name: 'Spot another Snowshoe Hare in the same hunt.', mission_id: fifthMission.id },
        { name: 'Spot another Snowshoe Hare in the same hunt.', mission_id: fifthMission.id },

        { name: 'Harvest a Snowshoe Hare weighing at least 1,3 kg (approx. 2,87 lbs).', mission_id: sixthMission.id },
        { name: 'Harvest another Snowshoe Hare weighing at least 1,3 kg (approx. 2,87 lbs) in the same hunt.', mission_id: sixthMission.id },

        { name: 'Harvest a male Snowshoe Hare.', mission_id: seventhMission.id },
        { name: 'Harvest another male Snowshoe Hare in the same hunt.', mission_id: seventhMission.id },
        { name: 'Harvest another male Snowshoe Hare in the same hunt.', mission_id: seventhMission.id },

        { name: 'Find a set of Snowshoe Hare tracks.', mission_id: eighthMission.id },
        { name: 'Then find another set of Snowshoe Hare tracks in the same hunt.', mission_id: eighthMission.id },
        { name: 'Then ID droppings of a Snowshoe Hare in the same hunt.', mission_id: eighthMission.id },
        { name: 'Then spot a Snowshoe Hare in the same hunt.', mission_id: eighthMission.id },
        { name: 'Then harvest a Snowshoe Hare in the same hunt.', mission_id: eighthMission.id },

        { name: 'Harvest a Snowshoe Hare using any 12GA Shotgun from a distance of at least 30 meters (approx. 98 ft.).', mission_id: ninthMission.id },
        { name: 'Harvest another Snowshoe Hare using any 12GA Shotgun from a distance of at least 30 meters (approx. 98 ft.).', mission_id: ninthMission.id },
        { name: 'Harvest another Snowshoe Hare using any 12GA Shotgun from a distance of at least 30 meters (approx. 98 ft.).', mission_id: ninthMission.id },

        { name: 'Harvest a male Snowshoe Hare scoring at least 1500.', mission_id: tenthMission.id },
        { name: 'Harvest another male Snowshoe Hare scoring at least 1500.', mission_id: tenthMission.id },
    ];
}

async function turkeyMissions() {
    const firstMission = await findMissionBy('name', 'Turkey Training');
    const secondMission = await findMissionBy('name', 'Triple Turkey Tracker');
    const thrirdMission = await findMissionBy('name', 'Caruncle Crusher');
    const fourthMission = await findMissionBy('name', 'Longbeard');
    const fifthMission = await findMissionBy('name', 'The Bearded Lady');
    const sixthMission = await findMissionBy('name', 'I Got Spurs');
    const seventhMission = await findMissionBy('name', 'Turkey Special');
    const eighthMission = await findMissionBy('name', 'Eagle Eye');
    const ninthMission = await findMissionBy('name', 'I Believe I Can Fly');
    const tenthMission = await findMissionBy('name', 'Tommy Gunned');
    const eleventhMission = await findMissionBy('name', 'Three five seven...');

    return [
        { name: 'Harvest a male Turkey.', mission_id: firstMission.id },

        { name: 'Harvest a male Turkey.', mission_id: secondMission.id },
        { name: 'Harvest a male Turkey.', mission_id: secondMission.id },
        { name: 'Harvest a male Turkey.', mission_id: secondMission.id },

        { name: 'Take a male Turkey from under 9.144m (approx. 30ft.).', mission_id: thrirdMission.id },

        { name: 'Harvest a Turkey with a beard length of at least 3 inches.', mission_id: fourthMission.id },

        { name: 'Harvest a Turkey hen with a beard.', mission_id: fifthMission.id },

        { name: 'Harvest a male Turkey with a set of 1/2 inch spurs or more.', mission_id: sixthMission.id },

        { name: 'Harvest a male Turkey with a weight of at least 9.072kg (approx. 20lbs).', mission_id: seventhMission.id },

        { name: 'Spot a Turkey.', mission_id: eighthMission.id },
        { name: 'Spot another Turkey during the same hunt.', mission_id: eighthMission.id },
        { name: 'Spot another Turkey during the same hunt.', mission_id: eighthMission.id },

        { name: 'Harvest a Turkey from a Hunting Tower.', mission_id: ninthMission.id },
        { name: 'Harvest a Turkey from a Hunting Tower.', mission_id: ninthMission.id },
        { name: 'Harvest a Turkey from a Hunting Tower.', mission_id: ninthMission.id },

        { name: 'Harvest a male Turkey using the SxS Shotgun.', mission_id: tenthMission.id },
        { name: 'Harvest a male Turkey using the SxS Shotgun.', mission_id: tenthMission.id },

        { name: 'Harvest a male Turkey, with a .22 Pistol, from 13.5 m (approx. 44.3 ft.) or less.', mission_id: eleventhMission.id },
        { name: 'Harvest a male Turkey, with a .22 Pistol, from 13.5 m (approx. 44.3 ft.) or less.', mission_id: eleventhMission.id },
        { name: 'Harvest a male Turkey, with a .22 Pistol, from 13.5 m (approx. 44.3 ft.) or less.', mission_id: eleventhMission.id },
        { name: 'Harvest a male Turkey, with a .22 Pistol, from 13.5 m (approx. 44.3 ft.) or less.', mission_id: eleventhMission.id },
    ];
}

async function waterBuffaloMissions() {
    const firstMission = await findMissionBy('name', 'Where It All Began');
    const secondMission = await findMissionBy('name', 'Retracing Dawg\'s Steps');
    const thrirdMission = await findMissionBy('name', 'In the Swamps, They Roam');
    const fourthMission = await findMissionBy('name', 'Honorary Horns');
    const fifthMission = await findMissionBy('name', 'Brute Force Required');
    const sixthMission = await findMissionBy('name', 'So Many Horns, So Little Time');
    const seventhMission = await findMissionBy('name', 'The Bigger They Are, The Harder They Fall');
    const eighthMission = await findMissionBy('name', 'Stand Tall and Fear Nothing');
    const ninthMission = await findMissionBy('name', 'Even Small Fries Can Pack a Punch');
    const tenthMission = await findMissionBy('name', 'A New Legend is Born');

    return [
        { name: 'Visit Saint Pauli\'s Lighthouse (X: 7.553, Y: 8.725) in Piccabeen Bay.', mission_id: firstMission.id },

        { name: 'ID tracks or droppings from a Water Buffalo.', mission_id: secondMission.id },
        { name: 'Spot a Water Buffalo.', mission_id: secondMission.id },

        { name: 'Harvest a male Water Buffalo.', mission_id: thrirdMission.id },
        { name: 'Harvest a female Water Buffalo.', mission_id: thrirdMission.id },

        { name: 'Harvest an unspooked Water Buffalo with a score of 180 or higher.', mission_id: fourthMission.id },

        { name: 'Harvest a charging Water Buffalo.', mission_id: fifthMission.id },

        { name: 'Harvest a male Water Buffalo in the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest another male Water Buffalo in the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest another male Water Buffalo in the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest another male Water Buffalo in the same hunt.', mission_id: sixthMission.id },

        { name: 'First, harvest an unspooked Water Buffalo with a weight of 700 kg (Approx. 1874 lbs) or higher using the .340 Weatherby Magnum Bolt Action Rifle.', mission_id: seventhMission.id },
        { name: 'Then, harvest another unspooked Water Buffalo but with a weight of 900 kg (Approx. 1984 lbs) or higher using the .340 Weatherby Magnum Bolt Action Rifle.', mission_id: seventhMission.id },

        { name: 'Harvest a charging Water Buffalo with a score of 200 or higher while standing.', mission_id: eighthMission.id },

        { name: 'Harvest a Water Buffalo with one shot using any .454 revolver.', mission_id: ninthMission.id },

        { name: 'Harvest the "Ravager Buffalo" by the large beach north of Piccabeen Bay (X: 6.273, Y: 6.330) at under 10 meters (Approx. 32 feet) while it\'s charging.', mission_id: tenthMission.id },
    ];
}

async function whitetailDeerMissions() {
    const firstMission = await findMissionBy('name', 'Track a Whitetail Deer');
    const secondMission = await findMissionBy('name', 'Spot a Whitetail Deer');
    const thrirdMission = await findMissionBy('name', 'Harvest a Whitetail Deer');
    const fourthMission = await findMissionBy('name', 'Take a 8pt Whitetail Deer');
    const fifthMission = await findMissionBy('name', 'A Favor for a Friend');
    const sixthMission = await findMissionBy('name', 'Dinner for a Week');
    const seventhMission = await findMissionBy('name', 'Be Vewwy, Vewwy Qwiet');
    const eighthMission = await findMissionBy('name', 'The Long Shot');
    const ninthMission = await findMissionBy('name', 'A Cull');
    const tenthMission = await findMissionBy('name', 'The Spotter, Pt. 1');
    const eleventhMission = await findMissionBy('name', 'The Spotter, Pt. 2');
    const twelfthMission = await findMissionBy('name', 'Big Rack');
    const thirteenthMission = await findMissionBy('name', 'Big Score');
    const fourteenthMission = await findMissionBy('name', 'Big Rack, up close!');
    const fifteenthMission = await findMissionBy('name', 'Shotgun Doe Cull');
    const sixteenthMission = await findMissionBy('name', 'Nice Sidearm...');
    const seventeenthMission = await findMissionBy('name', 'I\'ll give you a Buck for each...');

    return [
        { name: 'Locate 3 Whitetail Deer tracks from the same animal.', mission_id: firstMission.id },

        { name: 'Spot a Whitetail Deer.', mission_id: secondMission.id },

        { name: 'Harvest a Whitetail Deer.', mission_id: thrirdMission.id },

        { name: 'Harvest a Whitetail Deer buck with at least 8 typical points.', mission_id: fourthMission.id },

        { name: 'Harvest a Whitetail Deer buck with at least 10 typical points.', mission_id: fifthMission.id },

        { name: 'Harvest a Whitetail Deer buck with a weight of at least 68kg (approx. 150lbs).', mission_id: sixthMission.id },
        { name: 'Harvest a Whitetail Deer buck with a weight of at least 68kg (approx. 150lbs).', mission_id: sixthMission.id },

        { name: 'Harvest a Whitetail Deer Buck, from under 46m (approx. 150 ft.).', mission_id: seventhMission.id },

        { name: 'Take a Whitetail Deer buck with at least 8 typical points from 115m (approx. 377ft.) or more.', mission_id: eighthMission.id },

        { name: 'Harvest a Whitetail Deer doe.', mission_id: ninthMission.id },
        { name: 'Harvest a Whitetail Deer doe.', mission_id: ninthMission.id },

        { name: 'Spot a Whitetail Deer buck from a Hunting Tower.', mission_id: tenthMission.id },
        { name: 'Spot a Whitetail Deer doe from a Hunting Tower.', mission_id: tenthMission.id },

        { name: 'Harvest a Whitetail Deer from a Hunting Tower.', mission_id: eleventhMission.id },

        { name: 'Harvest a Whitetail Deer with at least 12 typical points.', mission_id: twelfthMission.id },

        { name: 'Harvest a male Whitetail Deer with a score of 150 or more.', mission_id: thirteenthMission.id },

        { name: 'Harvest a Whitetail Deer buck with at least 12 typical points using a Shotgun with Buckshot ammo.', mission_id: fourteenthMission.id },

        { name: 'Harvest a Whitetail Doe using a Shotgun with Buckshot ammo.', mission_id: fifteenthMission.id },
        { name: 'Harvest a Whitetail Doe using a Shotgun with Buckshot ammo.', mission_id: fifteenthMission.id },
        { name: 'Harvest a Whitetail Doe using a Shotgun with Buckshot ammo.', mission_id: fifteenthMission.id },
        { name: 'Harvest a Whitetail Doe using a Shotgun with Buckshot ammo.', mission_id: fifteenthMission.id },

        { name: 'Harvest Whitetail Deer Buck using a .44 Magnum Revolver.', mission_id: sixteenthMission.id },

        { name: 'Harvest a male Whitetail Deer using the .243 Rifle.', mission_id: seventeenthMission.id },
        { name: 'Harvest a male Whitetail Deer using the .270 Rifle.', mission_id: seventeenthMission.id },
        { name: 'Harvest a male Whitetail Deer using the .30-06 Rifle.', mission_id: seventeenthMission.id },
        { name: 'Harvest a male Whitetail Deer using the .300 Rifle.', mission_id: seventeenthMission.id },
        { name: 'Harvest a male Whitetail Deer using the .357 Magnum.', mission_id: seventeenthMission.id },
        { name: 'Harvest a male Whitetail Deer using a .44 Magnum Revolver.', mission_id: seventeenthMission.id },
        { name: 'Harvest a male Whitetail Deer using the 12 GA Pump-Action Shotgun.', mission_id: seventeenthMission.id },
    ];
}

async function wildBoarMissions() {
    const firstMission = await findMissionBy('name', 'An Old Acquaintance');
    const secondMission = await findMissionBy('name', 'Boared to Death');
    const thrirdMission = await findMissionBy('name', 'Three Little Piggies');
    const fourthMission = await findMissionBy('name', 'Mother\'s Day');
    const fifthMission = await findMissionBy('name', 'Family Values');
    const sixthMission = await findMissionBy('name', 'It\'s Lützen All Over Again');
    const seventhMission = await findMissionBy('name', 'Up Close and Personal');
    const eighthMission = await findMissionBy('name', 'Old School');
    const ninthMission = await findMissionBy('name', 'Older School');
    const tenthMission = await findMissionBy('name', 'There Can Be Only One');

    return [
        { name: 'ID a set of Wild Boar tracks.', mission_id: firstMission.id },
        { name: 'ID Wild Boar droppings.', mission_id: firstMission.id },

        { name: 'Spot a Wild Boar', mission_id: secondMission.id },
        { name: 'Harvest a Wild Boar.', mission_id: secondMission.id },

        { name: 'Harvest a Wild Boar.', mission_id: thrirdMission.id },
        { name: 'Harvest a Wild Boar during the same hunt.', mission_id: thrirdMission.id },
        { name: 'Harvest a Wild Boar during the same hunt.', mission_id: thrirdMission.id },

        { name: 'Harvest a male Wild Boar of at least 181.437 kg (approx. 400 lbs) and with at least an 800 point score.', mission_id: fourthMission.id },

        { name: 'Harvest a Wild Boar using a Tripod Stand.', mission_id: fifthMission.id },
        { name: 'Harvest a Wild Boar using a Tripod Stand.', mission_id: fifthMission.id },

        { name: 'Harvest a Wild Boar using a .50 Cap Lock Muzzleloader.', mission_id: sixthMission.id },
        { name: 'Harvest a Wild Boar using a .50 Cap Lock Muzzleloader during the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest a Wild Boar using a .50 Cap Lock Muzzleloader during the same hunt.', mission_id: sixthMission.id },
        { name: 'Harvest a Wild Boar using a .50 Cap Lock Muzzleloader during the same hunt.', mission_id: sixthMission.id },

        { name: 'Harvest a male Wild Boar from under 27.43 m (approx. 90 ft) without using a stand.', mission_id: seventhMission.id },
        { name: 'Harvest a female Wild Boar from under 27.43 m (approx. 90 ft) without using a stand.', mission_id: seventhMission.id },

        { name: 'Harvest a Wild Boar using a Tenpoint Carbon Fusion Crossbow.', mission_id: eighthMission.id },
        { name: 'Harvest a Wild Boar using a Tenpoint Carbon Fusion Crossbow.', mission_id: eighthMission.id },

        { name: 'Harvest a female Wild Boar using a Recurve Bow Modern.', mission_id: ninthMission.id },
        { name: 'Harvest a female Wild Boar using a Recurve Bow Modern.', mission_id: ninthMission.id },
        { name: 'Harvest a female Wild Boar using a Recurve Bow Modern.', mission_id: ninthMission.id },

        { name: 'Harvest the Dark Wild Boar near the southern Hunting Tower in Hirschfelden (X:8711, Y:1487).', mission_id: tenthMission.id },
    ];
}

exports.seed = function seed(knex) {
    Model.knex(knex);

    return knex('objectives').del()
        .then(async () => {
            await knex('objectives').insert(await alpineIbexObjectives());
            await knex('objectives').insert(await allDucksObjectives());
            await knex('objectives').insert(await arcticFoxMissions());
            await knex('objectives').insert(await bantengMissions());
            await knex('objectives').insert(await bighornSheepMissions());
            await knex('objectives').insert(await bisonMissions());
            await knex('objectives').insert(await blackBearMissions());
            await knex('objectives').insert(await blacktailDeerMissions());
            await knex('objectives').insert(await bobcatMissions());
            await knex('objectives').insert(await brownBearMissions());
            await knex('objectives').insert(await canadaGooseMissions());
            await knex('objectives').insert(await cottontailRabbitMissions());
            await knex('objectives').insert(await coyoteMissions());
            await knex('objectives').insert(await dallSheepMissions());
            await knex('objectives').insert(await eurasianLynxMissions());
            await knex('objectives').insert(await europeanRabbitMissions());
            await knex('objectives').insert(await feralGoatMissions());
            await knex('objectives').insert(await feralHogMissions());
            await knex('objectives').insert(await greyWolfMissions());
            await knex('objectives').insert(await grizzlyBearMissions());
            await knex('objectives').insert(await magpieGooseMissions());
            await knex('objectives').insert(await mallardMissions());
            await knex('objectives').insert(await mooseMissions());
            await knex('objectives').insert(await muleDeerMissions());
            await knex('objectives').insert(await pheasantMissions());
            await knex('objectives').insert(await polarBearMissions());
            await knex('objectives').insert(await redDeerMissions());
            await knex('objectives').insert(await redFoxMissions());
            await knex('objectives').insert(await redKangarooMissions());
            await knex('objectives').insert(await reindeerMissions());
            await knex('objectives').insert(await ptarmiganMissions());
            await knex('objectives').insert(await rockyMountainElkMissions());
            await knex('objectives').insert(await roeDeerMissions());
            await knex('objectives').insert(await rooseveltElkMissions());
            await knex('objectives').insert(await rusaDeerMissions());
            await knex('objectives').insert(await sambarDeerMissions());
            await knex('objectives').insert(await sitkaDeerMissions());
            await knex('objectives').insert(await snowGooseMissions());
            await knex('objectives').insert(await snowshoeHareMissions());
            await knex('objectives').insert(await turkeyMissions());
            await knex('objectives').insert(await waterBuffaloMissions());
            await knex('objectives').insert(await whitetailDeerMissions());
            await knex('objectives').insert(await wildBoarMissions());
        });
};
