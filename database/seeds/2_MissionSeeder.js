const { Model } = require('objection');

const Animal = require('../models/Animal');

async function findAnimalBy(column, value) {
    return Animal.query()
        .where(column, value)
        .select('*')
        .first();
}

async function allDucksMissions() {
    const allDucks = await findAnimalBy('name', 'All Ducks');

    return [
        {
            name: 'First Audition', reward: 100, hint: '', animal_id: allDucks.id,
        },
        {
            name: 'The Soprano', reward: 200, hint: '', animal_id: allDucks.id,
        },
        {
            name: 'The Baritone', reward: 300, hint: '', animal_id: allDucks.id,
        },
        {
            name: 'Sprechgesang', reward: 400, hint: '', animal_id: allDucks.id,
        },
        {
            name: 'Backing Vocals', reward: 600, hint: '', animal_id: allDucks.id,
        },
        {
            name: 'Resonating Bodies', reward: 800, hint: '', animal_id: allDucks.id,
        },
        {
            name: 'Bird Rights', reward: 1000, hint: '', animal_id: allDucks.id,
        },
        {
            name: 'Silencing the Critics', reward: 1200, hint: '', animal_id: allDucks.id,
        },
        {
            name: 'Dress Rehearsal', reward: 1800, hint: '', animal_id: allDucks.id,
        },
        {
            name: 'The Grand Premiere', reward: 3600, hint: '', animal_id: allDucks.id,
        },
    ];
}

async function alpineIbexMissions() {
    const alpineIbex = await findAnimalBy('name', 'Alpine Ibex');

    return [
        {
            name: 'Above all Summits, it is Calm', reward: 100, hint: '', animal_id: alpineIbex.id,
        },
        {
            name: 'The Former Bear Biologist Who Stares at Goats', reward: 200, hint: '', animal_id: alpineIbex.id,
        },
        {
            name: 'Joy of Life', reward: 300, hint: '', animal_id: alpineIbex.id,
        },
        {
            name: 'Mountain Hooligans', reward: 400, hint: '', animal_id: alpineIbex.id,
        },
        {
            name: 'The Sound of a Goat in a Room', reward: 600, hint: '', animal_id: alpineIbex.id,
        },
        {
            name: 'It\'s Oh So Quiet', reward: 800, hint: '', animal_id: alpineIbex.id,
        },
        {
            name: 'Blame Science', reward: 1000, hint: 'The distances must be reached in the order they are listed. Even if your first kill is under 30 meter, the 60 meter objective will be completed.', animal_id: alpineIbex.id,
        },
        {
            name: 'Goats Blood', reward: 1200, hint: '', animal_id: alpineIbex.id,
        },
        {
            name: 'Again With the Bears', reward: 1800, hint: 'It is only required to shoot one bear to complete this mission. After you kill the first bear a message appears: Hey, stop what you are doing! Don’t kill any bears! This is General Major Petersen, president of the EHRCA, speaking. Rodriguez escaped the institution and once again planned to take out all things ursine. You report at my office as soon as you can. This thing is not over yet.', animal_id: alpineIbex.id,
        },
        {
            name: 'Taking Down the Bearkiller Goat', reward: 3600, hint: 'https://vignette.wikia.nocookie.net/thehuntergame/images/3/35/Devils_teapot.png/revision/latest?cb=20160304192331', animal_id: alpineIbex.id,
        },
    ];
}

async function arcticFoxMissions() {
    const arcticFox = await findAnimalBy('name', 'Arctic Fox');

    return [
        {
            name: 'Skittish', reward: 100, hint: '', animal_id: arcticFox.id,
        },
        {
            name: 'Seeing is Believing', reward: 200, hint: '', animal_id: arcticFox.id,
        },
        {
            name: 'Winter Pairs', reward: 300, hint: '', animal_id: arcticFox.id,
        },
        {
            name: 'North vs South', reward: 400, hint: 'Kosatka Harbor is the Point of Interest (! sign) north of Danforth\'s Refuge. Tatanka Hot Springs is the Point of Interest (! sign) north of Afterland Lodge.', animal_id: arcticFox.id,
        },
        {
            name: 'Oblivious Bang', reward: 600, hint: '', animal_id: arcticFox.id,
        },
        {
            name: 'Close Up Shot', reward: 800, hint: '', animal_id: arcticFox.id,
        },
        {
            name: '2 for 1', reward: 1000, hint: '', animal_id: arcticFox.id,
        },
        {
            name: 'The Big Dog', reward: 1200, hint: '', animal_id: arcticFox.id,
        },
        {
            name: 'Shivers', reward: 1800, hint: '', animal_id: arcticFox.id,
        },
        {
            name: 'Flush', reward: 3600, hint: '', animal_id: arcticFox.id,
        },
    ];
}

async function bantengMissions() {
    const banteng = await findAnimalBy('name', 'Banteng');

    return [
        {
            name: 'Source of the Problem', reward: 100, hint: '', animal_id: banteng.id,
        },
        {
            name: 'Retribution Will Follow', reward: 200, hint: '', animal_id: banteng.id,
        },
        {
            name: 'Tipping the Scales', reward: 300, hint: '', animal_id: banteng.id,
        },
        {
            name: 'Rumors', reward: 400, hint: 'https://vignette.wikia.nocookie.net/thehuntergame/images/c/c0/Pb_lighthouse.png/revision/latest?cb=20190429132140', animal_id: banteng.id,
        },
        {
            name: 'Revenge Will be Swift', reward: 600, hint: 'Shoot one banteng but do not harvest it. Shoot another one, harvest it and return to the first one to harvest within 10 minutes.', animal_id: banteng.id,
        },
        {
            name: 'Restoring Peace and Order', reward: 800, hint: '', animal_id: banteng.id,
        },
        {
            name: 'High on Caffeine', reward: 1000, hint: '', animal_id: banteng.id,
        },
        {
            name: 'The High Ground and Low Ground', reward: 1200, hint: '', animal_id: banteng.id,
        },
        {
            name: 'Hired Mercenaries', reward: 1800, hint: '', animal_id: banteng.id,
        },
        {
            name: 'Boss Banteng', reward: 3600, hint: 'https://vignette.wikia.nocookie.net/thehuntergame/images/1/12/Pb_boss_banteng.png/revision/latest?cb=20191209232005', animal_id: banteng.id,
        },
    ];
}

async function bighornSheepMissions() {
    const bighornSheep = await findAnimalBy('name', 'Bighorn Sheep');

    return [
        {
            name: 'Scoping the Sickness', reward: 100, hint: '', animal_id: bighornSheep.id,
        },
        {
            name: 'Foraging for Feces', reward: 200, hint: '', animal_id: bighornSheep.id,
        },
        {
            name: 'Confirm the Diagnosis', reward: 300, hint: '', animal_id: bighornSheep.id,
        },
        {
            name: 'Running Rampant', reward: 400, hint: '', animal_id: bighornSheep.id,
        },
        {
            name: 'Ewes in Trouble', reward: 600, hint: '', animal_id: bighornSheep.id,
        },
        {
            name: 'Grabbing the Disease by the Horns', reward: 800, hint: '', animal_id: bighornSheep.id,
        },
        {
            name: 'Out of Her Misery', reward: 1000, hint: '', animal_id: bighornSheep.id,
        },
        {
            name: 'The Ram Stops Here', reward: 1200, hint: '', animal_id: bighornSheep.id,
        },
        {
            name: 'Tying up Loose Ewes', reward: 1800, hint: '', animal_id: bighornSheep.id,
        },
        {
            name: 'Culling for the Cure', reward: 3600, hint: '', animal_id: bighornSheep.id,
        },
    ];
}

async function bisonMissions() {
    const bison = await findAnimalBy('name', 'Bison');

    return [
        {
            name: 'Off On the Wrong Foot', reward: 100, hint: '', animal_id: bison.id,
        },
        {
            name: 'A History Lesson', reward: 200, hint: '', animal_id: bison.id,
        },
        {
            name: 'The Man Who Saved the Buffalo', reward: 300, hint: '', animal_id: bison.id,
        },
        {
            name: 'Genetic Issues', reward: 400, hint: '', animal_id: bison.id,
        },
        {
            name: 'Bad Blood', reward: 600, hint: '', animal_id: bison.id,
        },
        {
            name: 'History Repeats Itself', reward: 800, hint: '', animal_id: bison.id,
        },
        {
            name: 'Plague-ridden', reward: 1000, hint: '', animal_id: bison.id,
        },
        {
            name: 'Dirty History', reward: 1200, hint: '', animal_id: bison.id,
        },
        {
            name: 'Viva la Revolution', reward: 1800, hint: '', animal_id: bison.id,
        },
        {
            name: 'Challenging Buffalo Bill', reward: 3600, hint: 'This is a very particular bison that spawns at the given coordinates. It is recommended to either move there very quickly, or start at a tent nearby. Pick up the tracks and follow the bull. If the mission does not complete shoot others or start over. https://vignette.wikia.nocookie.net/thehuntergame/images/1/1e/Bison_mission_10.png/revision/latest?cb=20171031201929', animal_id: bison.id,
        },
    ];
}

async function blackBearMissions() {
    const blackBear = await findAnimalBy('name', 'Black Bear');

    return [
        {
            name: 'What We Do For Science', reward: 100, hint: 'Despite the description pointing to Redfeather Falls, you can complete this mission in any reserve that holds Black Bears.', animal_id: blackBear.id,
        },
        {
            name: 'Mercy Cull', reward: 200, hint: 'Any male Black Bear with Chocolate fur variation will complete this mission. It is not a specific animal or in a specific place.', animal_id: blackBear.id,
        },
        {
            name: 'Coat of Many Colors', reward: 300, hint: '', animal_id: blackBear.id,
        },
        {
            name: 'Swamp Thing', reward: 400, hint: 'The bear is on "Bearmuda Island" just north of the shipwreck. https://vignette.wikia.nocookie.net/thehuntergame/images/a/af/Swamp_thing_location.png/revision/latest?cb=20160304173257', animal_id: blackBear.id,
        },
        {
            name: 'Bear Hug', reward: 600, hint: '', animal_id: blackBear.id,
        },
        {
            name: 'Aftershock', reward: 800, hint: '', animal_id: blackBear.id,
        },
        {
            name: 'Lead N Fur', reward: 1000, hint: '', animal_id: blackBear.id,
        },
        {
            name: 'Bloodlust', reward: 1200, hint: '', animal_id: blackBear.id,
        },
        {
            name: 'Getting Closer', reward: 1800, hint: '', animal_id: blackBear.id,
        },
        {
            name: 'Illegally Blonde', reward: 3600, hint: '', animal_id: blackBear.id,
        },
    ];
}

async function blacktailDeerMissions() {
    const blackTailDeer = await findAnimalBy('name', 'Blacktail Deer');

    return [
        {
            name: 'Breaking Ice', reward: 100, hint: '', animal_id: blackTailDeer.id,
        },
        {
            name: 'Dying To Impress', reward: 200, hint: '', animal_id: blackTailDeer.id,
        },
        {
            name: 'By The Book', reward: 300, hint: '', animal_id: blackTailDeer.id,
        },
        {
            name: 'A Long Distance Relation', reward: 400, hint: '', animal_id: blackTailDeer.id,
        },
        {
            name: 'Anywhere But Here', reward: 600, hint: '', animal_id: blackTailDeer.id,
        },
        {
            name: 'Making Nice', reward: 800, hint: '', animal_id: blackTailDeer.id,
        },
        {
            name: 'Getting Serious', reward: 1000, hint: 'The required towers can be found here: https://vignette.wikia.nocookie.net/thehuntergame/images/4/48/BTMissionSeven.png/revision/latest?cb=20160413124340', animal_id: blackTailDeer.id,
        },
        {
            name: 'Moving In', reward: 1200, hint: '', animal_id: blackTailDeer.id,
        },
        {
            name: '12 Counts of Affection', reward: 1800, hint: 'Prepare for a long hunt. It is best to start early in the day. As you can see on the animal map for blacktail deer at Redfeather Falls, they predominantly roam the north of the map. Consider running north, or starting at a tent in the north, or fast traveling to the campsite in the north. If you choose to use guns, you will only be able to take out one or two deer for each herd you find. The others will flee and you will have to track them down again or move on hoping for other herds or single roamers. It is a better choice to use a silent weapons, i.e. a bow or crossbow. If you manage to drop them on the spot from +25m, you can take multiple animals at a time. Even if a shot is bad and the rest of the bunch spooks, at least you are not spooking other animals in the vicinity with gunfire.', animal_id: blackTailDeer.id,
        },
        {
            name: 'Tying Up', reward: 3600, hint: '', animal_id: blackTailDeer.id,
        },
    ];
}

async function bobcatMissions() {
    const bobcat = await findAnimalBy('name', 'Bobcat');

    return [
        {
            name: 'Every Mewment Counts', reward: 100, hint: 'Possible location: Southern island, there is an open field just north of the narrow part. Mount a treestand and call. When a bobcat appears, spot it. Then shoot it, but read its tracks first to complete the mission. Do not harvest it yet.', animal_id: bobcat.id,
        },
        {
            name: 'Can Somebody Paw-lease Give This Man a Bobcat?', reward: 200, hint: 'Activate this mission before harvesting the bobcat from above.', animal_id: bobcat.id,
        },
        {
            name: 'Meow-sicians in Logger\'s Point', reward: 300, hint: 'https://vignette.wikia.nocookie.net/thehuntergame/images/b/be/Bobcat_mission_lp_campsites.png/revision/latest?cb=20181003135116 It is possible to fast travel to these campsites. It is however advisable to walk and get that call on the way.', animal_id: bobcat.id,
        },
        {
            name: 'Find All the Purrpetrators', reward: 400, hint: '', animal_id: bobcat.id,
        },
        {
            name: 'In Pursuit of Purrfection', reward: 600, hint: 'The objectives have to be met in the same hunt. To achieve 100% you may use\n.243 Bolt Action Rifle\n.223 Bolt Action Rifle', animal_id: bobcat.id,
        },
        {
            name: 'Cathletic Cats by the Creeks', reward: 800, hint: 'Look north of the Highland lodge. When you have a sign of a bobcat (call, nearby tracks), mount the treestand and call.', animal_id: bobcat.id,
        },
        {
            name: 'Everything Looking Paw-sitive', reward: 1000, hint: '', animal_id: bobcat.id,
        },
        {
            name: 'Endless Paw-sibilities', reward: 1200, hint: 'https://vignette.wikia.nocookie.net/thehuntergame/images/d/d2/Bobcat_mission_rb_riverhead_landing.png/revision/latest?cb=20181003193508 Avoid the swamps. There are less cats and stalking is more difficult.', animal_id: bobcat.id,
        },
        {
            name: 'Run, Bobcat, Run!', reward: 1800, hint: 'Use the middle tower of Logger\'s Point. Call a bobcat in. You can shoot it fleeing in all directions from there. Use the .243 Bolt Action Rifle. Slightly lead the shot.', animal_id: bobcat.id,
        },
        {
            name: 'The El Bobogato Ceremony', reward: 3600, hint: 'Do not collect the first shot bobcat but rather wait until you have shot a second. Then harvest both within 5 minutes.', animal_id: bobcat.id,
        },
    ];
}

async function brownBearMissions() {
    const brownBear = await findAnimalBy('name', 'Brown Bear');

    return [
        {
            name: 'The Comeback Kid', reward: 100, hint: '', animal_id: brownBear.id,
        },
        {
            name: 'Head Count', reward: 200, hint: '', animal_id: brownBear.id,
        },
        {
            name: 'Southpaw', reward: 300, hint: '', animal_id: brownBear.id,
        },
        {
            name: 'Heavy Hitter', reward: 400, hint: '', animal_id: brownBear.id,
        },
        {
            name: 'Slugger', reward: 600, hint: '', animal_id: brownBear.id,
        },
        {
            name: 'Bad News Bears', reward: 800, hint: '', animal_id: brownBear.id,
        },
        {
            name: 'Far-fetched', reward: 1000, hint: '', animal_id: brownBear.id,
        },
        {
            name: 'Biologist Schmiologist', reward: 1200, hint: '', animal_id: brownBear.id,
        },
        {
            name: 'This All Sounds Awfully Familiar', reward: 1800, hint: '', animal_id: brownBear.id,
        },
        {
            name: 'We Woke Up The Mama', reward: 3600, hint: 'https://vignette.wikia.nocookie.net/thehuntergame/images/9/9b/Brown_bear_mission_10_hint.png/revision/latest?cb=20160304173103 From Koppartorp Lodge walk towards the graveyard south-east.\nCrouch when coming close, and look for a track in the middle of the ancient rocks.\nFollow the tracks and spot ahead. Goldilocks won\'t be far.\nShe will not necessarily be a Gold variant of the brown bear species, so don\'t just look out for a golden bear.', animal_id: brownBear.id,
        },
    ];
}

async function canadaGooseMissions() {
    const canadaGoose = await findAnimalBy('name', 'Canada Goose');

    return [
        {
            name: 'Allright Then: Prove It', reward: 100, hint: '', animal_id: canadaGoose.id,
        },
        {
            name: 'Off On The Wrong Foot', reward: 200, hint: '', animal_id: canadaGoose.id,
        },
        {
            name: 'The Standard Procedure', reward: 300, hint: '', animal_id: canadaGoose.id,
        },
        {
            name: 'Easy Riding', reward: 400, hint: '', animal_id: canadaGoose.id,
        },
        {
            name: 'Full Throttle', reward: 600, hint: '', animal_id: canadaGoose.id,
        },
        {
            name: 'Surgeon With A Shotgun', reward: 800, hint: '', animal_id: canadaGoose.id,
        },
        {
            name: 'Antiquated Measurements', reward: 1000, hint: '', animal_id: canadaGoose.id,
        },
        {
            name: 'Trickery In The Name Of Justice', reward: 1200, hint: '', animal_id: canadaGoose.id,
        },
        {
            name: 'A Light At The End Of The Tunnel?', reward: 1800, hint: '', animal_id: canadaGoose.id,
        },
        {
            name: 'Like In The Olden Days', reward: 3600, hint: '', animal_id: canadaGoose.id,
        },
    ];
}

async function cottontailRabbitMissions() {
    const cottontailRabbit = await findAnimalBy('name', 'Cottontail Rabbit');

    return [
        {
            name: 'Hop To It', reward: 100, hint: '', animal_id: cottontailRabbit.id,
        },
        {
            name: 'Regicide', reward: 200, hint: '', animal_id: cottontailRabbit.id,
        },
        {
            name: 'Honour. Glory. Rabbit.', reward: 300, hint: '', animal_id: cottontailRabbit.id,
        },
        {
            name: 'Ode To Joy', reward: 400, hint: '', animal_id: cottontailRabbit.id,
        },
        {
            name: 'Warriors Of The Fields', reward: 600, hint: '', animal_id: cottontailRabbit.id,
        },
        {
            name: 'Losers Of The Fields', reward: 800, hint: 'https://youtu.be/LggvEYrYWb8', animal_id: cottontailRabbit.id,
        },
        {
            name: 'Restoring The Honour', reward: 1000, hint: '', animal_id: cottontailRabbit.id,
        },
        {
            name: 'Restoring The Glory', reward: 1200, hint: '', animal_id: cottontailRabbit.id,
        },
        {
            name: 'Losers No More', reward: 1800, hint: 'https://youtu.be/wvFafFxsjyQ', animal_id: cottontailRabbit.id,
        },
        {
            name: 'Duty First', reward: 3600, hint: '', animal_id: cottontailRabbit.id,
        },
    ];
}

async function coyoteMissions() {
    const coyote = await findAnimalBy('name', 'Coyote');

    return [
        {
            name: 'Eye Spy', reward: 100, hint: '', animal_id: coyote.id,
        },
        {
            name: 'It Takes Two', reward: 200, hint: '', animal_id: coyote.id,
        },
        {
            name: 'Scout', reward: 300, hint: '', animal_id: coyote.id,
        },
        {
            name: 'Barking Up The Wrong Tower', reward: 500, hint: '', animal_id: coyote.id,
        },
        {
            name: 'Northern Quarter', reward: 700, hint: 'The coyote must have spawned in this area. Shooting another coyote that you lured or chased there will not count. https://vignette.wikia.nocookie.net/thehuntergame/images/0/0b/Northernquarter.jpg/revision/latest?cb=20191005093643', animal_id: coyote.id,
        },
        {
            name: 'Bitchin\'', reward: 900, hint: '', animal_id: coyote.id,
        },
        {
            name: 'Lake Coyote?', reward: 1200, hint: 'This lake is Forest Lake in the North mid section of Whitehart Island. https://vignette.wikia.nocookie.net/thehuntergame/images/4/45/Forestlake001.jpg/revision/latest?cb=20160304193631', animal_id: coyote.id,
        },
        {
            name: 'Bow Wow', reward: 1600, hint: '', animal_id: coyote.id,
        },
        {
            name: 'Take Down', reward: 3500, hint: 'The big dog actually isn\'t that big of a male Coyote. He spawns around the Awi\'Usdi Stones and starts roaming the area like any other animal. https://vignette.wikia.nocookie.net/thehuntergame/images/6/62/Awi%27Usdi.png/revision/latest?cb=20160304193757 Consider placing a tent near the location to get there quickly. Walk to the stones, listen for calls and look for tracks. There can be other coyotes in the area. If you are using a hunting stand, you can take out multiple coyotes with a silent weapon (e.g. a Bow or Crossbow), which increases you chances for finding the "big dog".', animal_id: coyote.id,
        },
    ];
}

async function dallSheepMissions() {
    const dallSheep = await findAnimalBy('name', 'Dall Sheep');

    return [
        {
            name: 'Flocking To The Hills', reward: 100, hint: '', animal_id: dallSheep.id,
        },
        {
            name: 'Don\'t Be So Sheepish', reward: 200, hint: '', animal_id: dallSheep.id,
        },
        {
            name: 'I Only Have Eyes For Ewe', reward: 300, hint: '', animal_id: dallSheep.id,
        },
        {
            name: 'If You Can\'t Dodge It', reward: 400, hint: '', animal_id: dallSheep.id,
        },
        {
            name: 'Hoofin\' It', reward: 600, hint: '', animal_id: dallSheep.id,
        },
        {
            name: 'No Ewes Crying Over Spilt Milk', reward: 800, hint: '', animal_id: dallSheep.id,
        },
        {
            name: 'Mutton For Punishment', reward: 1000, hint: '', animal_id: dallSheep.id,
        },
        {
            name: '​_Shear Delights', reward: 1200, hint: 'Shoot one dall sheep but do not harvest it. Shoot and harvest a second dall sheep, then return to the first and collect it within 5 minutes.', animal_id: dallSheep.id,
        },
        {
            name: 'The Black Sheep', reward: 1800, hint: '', animal_id: dallSheep.id,
        },
        {
            name: 'Put To Good Ewes', reward: 3600, hint: '', animal_id: dallSheep.id,
        },
    ];
}

async function eurasianLynxMissions() {
    const eurasianLynx = await findAnimalBy('name', 'Eurasian Lynx');

    return [
        {
            name: 'The Search for Pakasuchus', reward: 100, hint: '', animal_id: eurasianLynx.id,
        },
        {
            name: 'Modern Fossil Requirement', reward: 200, hint: '', animal_id: eurasianLynx.id,
        },
        {
            name: 'The Brachiosaurus Lynx', reward: 300, hint: '', animal_id: eurasianLynx.id,
        },
        {
            name: 'The Velocilynx', reward: 400, hint: '', animal_id: eurasianLynx.id,
        },
        {
            name: 'The Predator Becomes the Prey', reward: 600, hint: '', animal_id: eurasianLynx.id,
        },
        {
            name: 'Upgrading Equipment', reward: 800, hint: 'Shoot one lynx but do not collect it. Rather mark or remember the place. Shoot a second lynx, harvest it, then return within 10 minutes to the first kill to harvest.', animal_id: eurasianLynx.id,
        },
        {
            name: 'The Argentinosaurus Lynx', reward: 1000, hint: '', animal_id: eurasianLynx.id,
        },
        {
            name: 'The T-Lynx', reward: 1200, hint: '', animal_id: eurasianLynx.id,
        },
        {
            name: 'Pakasuchus', reward: 1800, hint: '', animal_id: eurasianLynx.id,
        },
        {
            name: 'A Distant Relative', reward: 3600, hint: '', animal_id: eurasianLynx.id,
        },
    ];
}

async function europeanRabbitMissions() {
    const europeanRabbit = await findAnimalBy('name', 'European Rabbit');

    return [
        {
            name: 'Finding the clues', reward: 100, hint: '', animal_id: europeanRabbit.id,
        },
        {
            name: 'Rabbit Therapy', reward: 200, hint: '', animal_id: europeanRabbit.id,
        },
        {
            name: 'Too many, too fast', reward: 300, hint: '', animal_id: europeanRabbit.id,
        },
        {
            name: 'Non Strategical Rabbits', reward: 400, hint: '', animal_id: europeanRabbit.id,
        },
        {
            name: 'Power In Numbers', reward: 600, hint: '', animal_id: europeanRabbit.id,
        },
        {
            name: 'Keeping Them On Their Toes', reward: 800, hint: '', animal_id: europeanRabbit.id,
        },
        {
            name: 'Home Invasion', reward: 1000, hint: '', animal_id: europeanRabbit.id,
        },
        {
            name: 'A Necessary Evil', reward: 1200, hint: '', animal_id: europeanRabbit.id,
        },
        {
            name: 'Can\'t Break Their Spirit', reward: 1800, hint: '', animal_id: europeanRabbit.id,
        },
        {
            name: 'Rabbit Rampage', reward: 3600, hint: 'This mission is completed in the Val-des-Bois reserve. https://vignette.wikia.nocookie.net/thehuntergame/images/4/45/VDB_Euro_Mission_10.png/revision/latest?cb=20191102205128', animal_id: europeanRabbit.id,
        },
    ];
}

async function feralGoatMissions() {
    const feralGoat = await findAnimalBy('name', 'Feral Goat');

    return [
        {
            name: 'The Usual Suspects', reward: 100, hint: '', animal_id: feralGoat.id,
        },
        {
            name: 'Dragnet Operation', reward: 200, hint: '', animal_id: feralGoat.id,
        },
        {
            name: 'Covert Action', reward: 300, hint: '', animal_id: feralGoat.id,
        },
        {
            name: 'Police Lineup', reward: 400, hint: '', animal_id: feralGoat.id,
        },
        {
            name: 'The Scapegoat', reward: 600, hint: '', animal_id: feralGoat.id,
        },
        {
            name: 'Silence of the Goats', reward: 800, hint: 'https://youtu.be/tw23QGKY2a8', animal_id: feralGoat.id,
        },
        {
            name: 'The war on shrubs', reward: 1000, hint: 'Permitted ammo are .44, .357, 10mm and .308.', animal_id: feralGoat.id,
        },
        {
            name: 'An offer you can\'t refuse', reward: 1200, hint: '', animal_id: feralGoat.id,
        },
        {
            name: 'Collateral Damage', reward: 1800, hint: '', animal_id: feralGoat.id,
        },
        {
            name: 'The Goatfather', reward: 3600, hint: '', animal_id: feralGoat.id,
        },
    ];
}

async function feralHogMissions() {
    const feralHog = await findAnimalBy('name', 'Feral Hog');

    return [
        {
            name: 'On the Matter of Pigs', reward: 100, hint: '', animal_id: feralHog.id,
        },
        {
            name: 'Blowing in the Wind', reward: 200, hint: '', animal_id: feralHog.id,
        },
        {
            name: 'Squealer', reward: 300, hint: 'You can complete this mission with any hog you find. Roam the area until you find clues or hear a call. Then lure them to the middle (small) lake. Feral Hogs tend to come in packs. A fast reloading strong rifle such as the .30-06 Lever Action Rifle will facilitate the task as it allows for multiple shots in quick succession. You can however just shoot one and then lure the others back. Make sure to complete both harvests in the same hunt. https://vignette.wikia.nocookie.net/thehuntergame/images/b/b2/LoggersThreeLakes.png/revision/latest?cb=20160304175556', animal_id: feralHog.id,
        },
        {
            name: 'Electric Lady Land', reward: 400, hint: 'This mission will trigger the spawning of a pack of feral hogs near the electric station in the south-east end of Logger\'s Point. To complete the mission, two animals from this group must be harvested. Make sure to arrive there quickly after the start. The easiest is to set up a tent near the station and start your hunt there. Follow the tracks near the station until you catch up with the pigs, and harvest two of them. Harvesting other pigs that were not part of the mission group will not count, even if you harvest them near the station.', animal_id: feralHog.id,
        },
        {
            name: 'All Along The Watchtower', reward: 600, hint: '', animal_id: feralHog.id,
        },
        {
            name: 'Unnatural Selection', reward: 800, hint: '', animal_id: feralHog.id,
        },
        {
            name: 'Uninvited Guests', reward: 1000, hint: '', animal_id: feralHog.id,
        },
        {
            name: 'Eye of The Hog', reward: 1200, hint: '', animal_id: feralHog.id,
        },
        {
            name: 'Range Finder', reward: 1800, hint: '', animal_id: feralHog.id,
        },
        {
            name: 'God Save the Queen', reward: 3600, hint: '', animal_id: feralHog.id,
        },
    ];
}

async function greyWolfMissions() {
    const greyWolf = await findAnimalBy('name', 'Grey Wolf');

    return [
        {
            name: 'On All Fours', reward: 100, hint: '', animal_id: greyWolf.id,
        },
        {
            name: 'Taking on the Pack', reward: 200, hint: '', animal_id: greyWolf.id,
        },
        {
            name: 'Traditional Hunting Methods', reward: 300, hint: '', animal_id: greyWolf.id,
        },
        {
            name: 'The Capitoline Wolf', reward: 400, hint: '', animal_id: greyWolf.id,
        },
        {
            name: 'On the Prowl', reward: 600, hint: '', animal_id: greyWolf.id,
        },
        {
            name: 'Fangs like an Assassin', reward: 800, hint: 'Do not collect the first shot wolf but rather wait until you have shot a second. Then harvest both within 5 minutes.', animal_id: greyWolf.id,
        },
        {
            name: 'The Night Lurker, Amarok', reward: 1000, hint: '', animal_id: greyWolf.id,
        },
        {
            name: 'Alpha, Beta, Omega', reward: 1200, hint: '', animal_id: greyWolf.id,
        },
        {
            name: 'The Remaining Followers', reward: 1800, hint: '', animal_id: greyWolf.id,
        },
        {
            name: 'The Legendary Fenrir', reward: 3600, hint: 'https://vignette.wikia.nocookie.net/thehuntergame/images/f/fe/Grey_wolf_mission_fenrir.png/revision/latest?cb=20171016152443', animal_id: greyWolf.id,
        },
    ];
}

async function grizzlyBearMissions() {
    const grizzlyBear = await findAnimalBy('name', 'Grizzly Bear');

    return [
        {
            name: 'Majesty at Best', reward: 100, hint: '', animal_id: grizzlyBear.id,
        },
        {
            name: 'To Catch a Thief', reward: 200, hint: '', animal_id: grizzlyBear.id,
        },
        {
            name: 'From Afar', reward: 300, hint: '', animal_id: grizzlyBear.id,
        },
        {
            name: 'Fast and Precise', reward: 400, hint: '', animal_id: grizzlyBear.id,
        },
        {
            name: 'Silence is Key', reward: 600, hint: '', animal_id: grizzlyBear.id,
        },
        {
            name: 'Face to Face', reward: 800, hint: '', animal_id: grizzlyBear.id,
        },
        {
            name: 'The Trap is Set', reward: 1000, hint: '', animal_id: grizzlyBear.id,
        },
        {
            name: 'Trickery at Best', reward: 1200, hint: '', animal_id: grizzlyBear.id,
        },
        {
            name: 'Revenge is Sweet', reward: 1800, hint: '', animal_id: grizzlyBear.id,
        },
        {
            name: 'One Final Trophy', reward: 3600, hint: '', animal_id: grizzlyBear.id,
        },
    ];
}

async function magpieGooseMissions() {
    const magpieGoose = await findAnimalBy('name', 'Magpie Goose');

    return [
        {
            name: 'The Budgie Who Could', reward: 100, hint: '', animal_id: magpieGoose.id,
        },
        {
            name: 'Rack Off the Intruders', reward: 200, hint: '', animal_id: magpieGoose.id,
        },
        {
            name: 'Fair Dinkum Shootin\'', reward: 300, hint: '', animal_id: magpieGoose.id,
        },
        {
            name: 'A Goose Bigger than Dawg', reward: 400, hint: '', animal_id: magpieGoose.id,
        },
        {
            name: 'Straight to the Pool Room', reward: 600, hint: '', animal_id: magpieGoose.id,
        },
        {
            name: 'Aussie Salute', reward: 800, hint: 'The tasks must be done in the order described.', animal_id: magpieGoose.id,
        },
        {
            name: 'For the Journos', reward: 1000, hint: 'The mission requires 10 geese in total.', animal_id: magpieGoose.id,
        },
        {
            name: 'Fair Shake of the Sauce Bottle', reward: 1200, hint: 'Be sure to lead the shot a bit with the .17 HMR rifle.', animal_id: magpieGoose.id,
        },
        {
            name: 'Tell Dawg He\'s Dreamin\'', reward: 1800, hint: 'Use the Magpie Goose Short Range Caller to get the geese to fly close, then step out of the waterfowl blind for the shot. Alternatively lie prone when calling the geese in.', animal_id: magpieGoose.id,
        },
        {
            name: 'No Wuckin\' Furries', reward: 3600, hint: 'Use a waterfowl blind close to an area where they might land. Again, use the Magpie Goose Short Range Caller to get the geese to fly close. Lead your shot.', animal_id: magpieGoose.id,
        },
    ];
}

async function mallardDuckMissions() {
    const mallardDuck = await findAnimalBy('name', 'Mallard Duck');

    return [
        {
            name: 'Mallard Hunting: Age Old Pastime', reward: 100, hint: '', animal_id: mallardDuck.id,
        },
        {
            name: 'The Plight Of Mrs Johnson', reward: 200, hint: '', animal_id: mallardDuck.id,
        },
        {
            name: 'The Long Arm Of The Law', reward: 300, hint: '', animal_id: mallardDuck.id,
        },
        {
            name: 'Introducing The Researcher', reward: 400, hint: '', animal_id: mallardDuck.id,
        },
        {
            name: 'They Talk!', reward: 600, hint: '', animal_id: mallardDuck.id,
        },
        {
            name: 'They Attack!', reward: 800, hint: '', animal_id: mallardDuck.id,
        },
        {
            name: 'They Are Getting Bigger!', reward: 1000, hint: '', animal_id: mallardDuck.id,
        },
        {
            name: 'The Secret Code', reward: 1200, hint: '', animal_id: mallardDuck.id,
        },
        {
            name: 'Breaking The Code', reward: 1800, hint: '', animal_id: mallardDuck.id,
        },
        {
            name: 'Exposing The Truth', reward: 3600, hint: '', animal_id: mallardDuck.id,
        },
    ];
}

async function mooseMissions() {
    const moose = await findAnimalBy('name', 'Moose');

    return [
        {
            name: 'It Takes Two', reward: 100, hint: '', animal_id: moose.id,
        },
        {
            name: 'Tankbuster', reward: 200, hint: 'Even though the description says "lung and/or heart shots only", the mission tasks can be completed if other organs are also hit, as long as heart or lungs are hit.', animal_id: moose.id,
        },
        {
            name: 'Out of Nowhere', reward: 300, hint: 'Use the Moose Caller to lure the moose close. Moose are not easily scared.', animal_id: moose.id,
        },
        {
            name: 'Sweet Sixteen', reward: 400, hint: '16 points means that the palm on each side needs 8 points. This is usually a decent score. Use the wide and open areas of Whiterime Ridge to spot the moose easier.', animal_id: moose.id,
        },
        {
            name: 'Road Kill', reward: 600, hint: 'The moose spawns at the given coordinates (see map) and moves around like any animal. The mission can be completed easier when placing a tent near these coordinates and get to the location as quickly as possible. https://vignette.wikia.nocookie.net/thehuntergame/images/1/10/Moose_road_kill_mission_coordinates.png/revision/latest?cb=20160413122842', animal_id: moose.id,
        },
        {
            name: 'Campers Delight', reward: 800, hint: '', animal_id: moose.id,
        },
        {
            name: 'Trespasser', reward: 1000, hint: 'The Trapper\'s Rest Road reaches from the Trapper\'s Rest Lodge to the eastern border of Redfeather Falls. https://vignette.wikia.nocookie.net/thehuntergame/images/d/d4/TrappersRestRoad.png/revision/latest?cb=20160413123315', animal_id: moose.id,
        },
        {
            name: 'Moose For a Week', reward: 1200, hint: '', animal_id: moose.id,
        },
        {
            name: 'Getting Slim', reward: 1800, hint: 'There is no rush to shoot 3 moose in quick suggestion. The mission does not require you to shoot, but to harvest them within 15 minutes. Don\'t start with the harvesting before you have shot the third moose.', animal_id: moose.id,
        },
        {
            name: 'Mad Bull', reward: 3600, hint: 'https://youtu.be/c24csiDHK7M', animal_id: moose.id,
        },
    ];
}

async function muleDeerMissions() {
    const muleDeer = await findAnimalBy('name', 'Mule Deer');

    return [
        {
            name: 'First Mule Deer', reward: 100, hint: '', animal_id: muleDeer.id,
        },
        {
            name: 'A Longer Range', reward: 200, hint: '', animal_id: muleDeer.id,
        },
        {
            name: 'More Points', reward: 300, hint: '8 points means the buck has a least 4 points on each of its antlers.', animal_id: muleDeer.id,
        },
        {
            name: 'Big Haul', reward: 400, hint: '', animal_id: muleDeer.id,
        },
        {
            name: 'Extreme Range', reward: 500, hint: 'There are many open meadows that provide more than enough distance to shoot 137m.', animal_id: muleDeer.id,
        },
        {
            name: 'Even Closer', reward: 600, hint: 'To get this close to a deer, just stay in a prone position, don\'t make any sudden movements, and try to call the deer in.', animal_id: muleDeer.id,
        },
        {
            name: 'Points o\'Plenty', reward: 800, hint: '10 points means the buck has at least 5 points on each side of its rack. Sometimes a 10 point buck is a monster, so it may be hard to shoot, but there are some fairly small bucks that don\'t spook as easily, which are also 10 pointers.', animal_id: muleDeer.id,
        },
        {
            name: 'Concerto', reward: 1000, hint: '', animal_id: muleDeer.id,
        },
        {
            name: 'Chasin Tail', reward: 1200, hint: 'All you have to do is find three different tracks from three different Mule Deer within 5 minutes. This is easiest if you follow tracks of a herd.', animal_id: muleDeer.id,
        },
        {
            name: '270 Degree Angle', reward: 1400, hint: '', animal_id: muleDeer.id,
        },
        {
            name: 'Easy Does It', reward: 2000, hint: '', animal_id: muleDeer.id,
        },
        {
            name: '5 From Above', reward: 3500, hint: 'Permanent Hunting towers can be found on Logger\'s Point.', animal_id: muleDeer.id,
        },
    ];
}

async function pheasantMissions() {
    const pheasant = await findAnimalBy('name', 'Pheasant');

    return [
        {
            name: 'Call Me', reward: 100, hint: '', animal_id: pheasant.id,
        },
        {
            name: 'Straight Flush', reward: 200, hint: '', animal_id: pheasant.id,
        },
        {
            name: 'Run n\' Gun', reward: 300, hint: '', animal_id: pheasant.id,
        },
        {
            name: 'Graduation Day', reward: 400, hint: '', animal_id: pheasant.id,
        },
        {
            name: 'Dinner For Two', reward: 600, hint: '', animal_id: pheasant.id,
        },
        {
            name: 'Lucas\'s Challenge', reward: 800, hint: '', animal_id: pheasant.id,
        },
        {
            name: 'A Family Matter', reward: 1000, hint: 'The required Pheasants are specific ones that only spawn in the given location when this mission is active. The birds will spawn under the bridge and roam around. Consider placing a tent nearby, so you should find its tracks soon enough. The location where you end up shooting the Pheasants does not matter as long as you harvest the ones that originated in the canyon.', animal_id: pheasant.id,
        },
        {
            name: 'Pheasant Cowboy', reward: 1200, hint: '', animal_id: pheasant.id,
        },
        {
            name: 'Shock \'n Awe', reward: 1800, hint: '', animal_id: pheasant.id,
        },
        {
            name: 'A Challenge You Can\'t Refuse', reward: 3600, hint: 'https://youtu.be/Em_GfphXVwU', animal_id: pheasant.id,
        },
    ];
}

async function polarBearMissions() {
    const polarBear = await findAnimalBy('name', 'Polar Bear');

    return [
        {
            name: 'An Odd Predicament', reward: 100, hint: '', animal_id: polarBear.id,
        },
        {
            name: 'Suspicious Findings', reward: 200, hint: '', animal_id: polarBear.id,
        },
        {
            name: 'A Shocking Discovery', reward: 300, hint: '', animal_id: polarBear.id,
        },
        {
            name: 'Someone\'s Prowling Around These Parts', reward: 400, hint: '', animal_id: polarBear.id,
        },
        {
            name: 'Signs of the Culprit', reward: 600, hint: '', animal_id: polarBear.id,
        },
        {
            name: 'Making Some Noise', reward: 800, hint: '', animal_id: polarBear.id,
        },
        {
            name: 'Clearing the Path', reward: 1000, hint: 'Do not harvest the first shot Polar Bear, but rather wait until you have shot a second. Then harvest both within 10 minutes.', animal_id: polarBear.id,
        },
        {
            name: 'In Pursuit of the Truth', reward: 1200, hint: '', animal_id: polarBear.id,
        },
        {
            name: 'Bear-demic', reward: 1800, hint: '', animal_id: polarBear.id,
        },
        {
            name: 'The Puppet', reward: 3600, hint: '', animal_id: polarBear.id,
        },
    ];
}

async function ptarmiganMissions() {
    const ptarmigans = await findAnimalBy('name', 'Ptarmigans');
    return [
        {
            name: 'Haud Yer Wheesht!', reward: 100, hint: '', animal_id: ptarmigans.id,
        },
        {
            name: 'All Ptarmigans a\' Jock Tamson\'s Bairns!', reward: 200, hint: '', animal_id: ptarmigans.id,
        },
        {
            name: 'It\'s a Lang Road That\'s No Goat a Turnin\'!', reward: 300, hint: 'Location: Mountains of Val-des-Bois.', animal_id: ptarmigans.id,
        },
        {
            name: 'Guid Gear Comes in Sma\' Bulk!', reward: 400, hint: 'Location: Mountains of Val-des-Bois', animal_id: ptarmigans.id,
        },
        {
            name: 'It\'s a Sair Ficht For Half a Loaf!', reward: 600, hint: 'Location: Western half of Hemmeldal', animal_id: ptarmigans.id,
        },
        {
            name: 'Noo Jist Haud On!', reward: 800, hint: 'Do not harvest the first shot ptarmigan, but rather wait until you have shot a second. Then harvest both within 10 minutes.', animal_id: ptarmigans.id,
        },
        {
            name: 'Dinnae Teach Yer Granny Tae Suck Eggs!', reward: 1000, hint: 'Location: Mountains of Timbergold Trails.', animal_id: ptarmigans.id,
        },
        {
            name: 'Bletherin\' Birds, Ah Tell Ye!', reward: 1200, hint: 'Location: Mountains of Timbergold Trails.', animal_id: ptarmigans.id,
        },
        {
            name: 'The Baw\'s on The Slates!', reward: 1800, hint: '', animal_id: ptarmigans.id,
        },
        {
            name: 'Speak o\' the Devil!', reward: 3600, hint: '', animal_id: ptarmigans.id,
        },
    ];
}

async function redDeerMissions() {
    const redDeer = await findAnimalBy('name', 'Red Deer');

    return [
        {
            name: 'Easy Going', reward: 100, hint: '', animal_id: redDeer.id,
        },
        {
            name: 'Drill Sergeant Doc', reward: 200, hint: '', animal_id: redDeer.id,
        },
        {
            name: 'A Touch Of Class', reward: 300, hint: '', animal_id: redDeer.id,
        },
        {
            name: 'Prime Cuts', reward: 400, hint: '', animal_id: redDeer.id,
        },
        {
            name: 'Meat Robbery', reward: 600, hint: '', animal_id: redDeer.id,
        },
        {
            name: 'Surgical Precision', reward: 800, hint: '', animal_id: redDeer.id,
        },
        {
            name: 'All In', reward: 1000, hint: 'This mission will only complete if you do step by step in the order listed.', animal_id: redDeer.id,
        },
        {
            name: 'Shame On You', reward: 1200, hint: '', animal_id: redDeer.id,
        },
        {
            name: 'On The Arrogance Of Deer', reward: 1800, hint: '', animal_id: redDeer.id,
        },
        {
            name: 'Leaving The Nest', reward: 3600, hint: '', animal_id: redDeer.id,
        },
    ];
}

async function redFoxMissions() {
    const redFox = await findAnimalBy('name', 'Red Fox');

    return [
        {
            name: 'Something Rotten In The Evergreen Hunting Reserve', reward: 100, hint: '', animal_id: redFox.id,
        },
        {
            name: 'This Town Ain\'t Big Enough For The Both Of Us', reward: 200, hint: 'https://youtu.be/kvSLmGnzy8U', animal_id: redFox.id,
        },
        {
            name: 'Making A Scene', reward: 300, hint: '', animal_id: redFox.id,
        },
        {
            name: 'Going Undercover', reward: 400, hint: '', animal_id: redFox.id,
        },
        {
            name: 'Playing Along', reward: 600, hint: '', animal_id: redFox.id,
        },
        {
            name: 'The Insider', reward: 800, hint: '', animal_id: redFox.id,
        },
        {
            name: 'It\'s All So Quiet', reward: 1000, hint: '', animal_id: redFox.id,
        },
        {
            name: 'Fat Boom', reward: 1200, hint: '', animal_id: redFox.id,
        },
        {
            name: 'Supernatural Ninja', reward: 1800, hint: '', animal_id: redFox.id,
        },
        {
            name: 'The Dignity Of Foxes', reward: 3600, hint: '', animal_id: redFox.id,
        },
    ];
}

async function redKangarooMissions() {
    const redKangaroo = await findAnimalBy('name', 'Red Kangaroo');

    return [
        {
            name: 'The Big Jumper', reward: 100, hint: '', animal_id: redKangaroo.id,
        },
        {
            name: 'Seeing Red', reward: 200, hint: '', animal_id: redKangaroo.id,
        },
        {
            name: 'Speedster', reward: 300, hint: '', animal_id: redKangaroo.id,
        },
        {
            name: 'True Kangaroo Hunter', reward: 400, hint: '', animal_id: redKangaroo.id,
        },
        {
            name: 'Gender Science', reward: 600, hint: '', animal_id: redKangaroo.id,
        },
        {
            name: 'Hat-trick', reward: 800, hint: '', animal_id: redKangaroo.id,
        },
        {
            name: 'Big And Slow', reward: 1000, hint: '', animal_id: redKangaroo.id,
        },
        {
            name: 'Little Hooligan', reward: 1200, hint: '', animal_id: redKangaroo.id,
        },
        {
            name: 'Big Boxer', reward: 1800, hint: '', animal_id: redKangaroo.id,
        },
        {
            name: 'Barely Seeing Red', reward: 3600, hint: '', animal_id: redKangaroo.id,
        },
    ];
}

async function reindeerMissions() {
    const reindeer = await findAnimalBy('name', 'Reindeer');

    return [
        {
            name: 'Opening Credits', reward: 100, hint: '', animal_id: reindeer.id,
        },
        {
            name: 'For Dramatic Effect', reward: 200, hint: '', animal_id: reindeer.id,
        },
        {
            name: 'Horrible Terrible Nature', reward: 300, hint: '', animal_id: reindeer.id,
        },
        {
            name: 'Tensions Rise', reward: 400, hint: '', animal_id: reindeer.id,
        },
        {
            name: 'Become Part Of The Herd', reward: 600, hint: '', animal_id: reindeer.id,
        },
        {
            name: 'Are We Reindeer? No We Are Human!', reward: 800, hint: '', animal_id: reindeer.id,
        },
        {
            name: 'The Reindeer Man Cometh', reward: 1000, hint: 'https://vignette.wikia.nocookie.net/thehuntergame/images/6/66/Reindeer_mission_7_towers.png/revision/latest?cb=20160413122258', animal_id: reindeer.id,
        },
        {
            name: 'Eye In The Sky', reward: 1200, hint: '', animal_id: reindeer.id,
        },
        {
            name: 'The Sleeping Reindeer', reward: 1800, hint: '', animal_id: reindeer.id,
        },
        {
            name: 'The Unraveling', reward: 3600, hint: '', animal_id: reindeer.id,
        },
    ];
}

async function rockyMountainElkMissions() {
    const rockyMountainElk = await findAnimalBy('name', 'Rocky Mountain Elk');

    return [
        {
            name: 'Fresh Produce', reward: 100, hint: '', animal_id: rockyMountainElk.id,
        },
        {
            name: 'Bugle Boy', reward: 200, hint: '', animal_id: rockyMountainElk.id,
        },
        {
            name: 'Turf Wars', reward: 300, hint: '', animal_id: rockyMountainElk.id,
        },
        {
            name: 'Fighting Flora', reward: 400, hint: '', animal_id: rockyMountainElk.id,
        },
        {
            name: 'Verification', reward: 600, hint: '10 points means that the bull needs 5 points (ends) on each antler.', animal_id: rockyMountainElk.id,
        },
        {
            name: 'Traditions', reward: 800, hint: '', animal_id: rockyMountainElk.id,
        },
        {
            name: 'Sensus', reward: 1000, hint: '', animal_id: rockyMountainElk.id,
        },
        {
            name: 'Rock and Roll', reward: 1200, hint: '12 points means that the bull needs 6 points (ends) on each antler.', animal_id: rockyMountainElk.id,
        },
        {
            name: 'True Love', reward: 1800, hint: '', animal_id: rockyMountainElk.id,
        },
        {
            name: 'Main Attraction', reward: 3600, hint: '14 points means that the bull needs 7 points (ends) on each antler.', animal_id: rockyMountainElk.id,
        },
    ];
}

async function roeDeerMissions() {
    const roeDeer = await findAnimalBy('name', 'Roe Deer');

    return [
        {
            name: 'An Unknown Friend', reward: 100, hint: '', animal_id: roeDeer.id,
        },
        {
            name: 'The Mystery Thickens', reward: 200, hint: '', animal_id: roeDeer.id,
        },
        {
            name: 'The Inside Man', reward: 300, hint: 'Orm\'s Stone is the rune stone west of the Drängstorp Lodge. Make sure to move close to the stone, then wait for the confirmation to be displayed. https://vignette.wikia.nocookie.net/thehuntergame/images/3/3b/Roe_deer_mission_3_hint.png/revision/latest?cb=20160413122355', animal_id: roeDeer.id,
        },
        {
            name: 'Foul Play', reward: 400, hint: '', animal_id: roeDeer.id,
        },
        {
            name: 'Payback', reward: 600, hint: 'Players have reported that 10 GA Buckshot Shells do not complete the mission.', animal_id: roeDeer.id,
        },
        {
            name: 'Death Notice', reward: 800, hint: '', animal_id: roeDeer.id,
        },
        {
            name: 'Cleaning Up', reward: 1000, hint: '', animal_id: roeDeer.id,
        },
        {
            name: 'Silent Justice', reward: 1200, hint: '', animal_id: roeDeer.id,
        },
        {
            name: 'Taking A Stand', reward: 1800, hint: '', animal_id: roeDeer.id,
        },
        {
            name: 'Boss Fight', reward: 3600, hint: '', animal_id: roeDeer.id,
        },
    ];
}

async function rooseveltElkMissions() {
    const rooseveltElk = await findAnimalBy('name', 'Roosevelt Elk');

    return [
        {
            name: 'Getting Hooked - Part 1', reward: 100, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Getting Hooked - Part 2', reward: 100, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Getting Hooked - Part 3', reward: 100, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Twilight Aria', reward: 200, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Renegades', reward: 200, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: '6 Points of Madness', reward: 300, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Introductions - Part 1', reward: 500, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Introductions - Part 2', reward: 500, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Acceptance', reward: 500, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Taking Down the King', reward: 700, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Requests & Favors', reward: 900, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Take an Elk from a Tower', reward: 1200, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Lucky 7', reward: 1500, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'In Your Face', reward: 1700, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Magnum Opus', reward: 2100, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Perfect Your Range', reward: 2600, hint: '', animal_id: rooseveltElk.id,
        },
        {
            name: 'Against the Clock...', reward: 3800, hint: '', animal_id: rooseveltElk.id,
        },
    ];
}

async function rusaDeerMissions() {
    const rusaDeer = await findAnimalBy('name', 'Rusa Deer');

    return [
        {
            name: 'The Fundamentals of the Rusa', reward: 100, hint: '', animal_id: rusaDeer.id,
        },
        {
            name: 'The Two Rusa', reward: 200, hint: '', animal_id: rusaDeer.id,
        },
        {
            name: 'The Return of the Rusa', reward: 300, hint: '', animal_id: rusaDeer.id,
        },
        {
            name: 'An Unexpected Rusa', reward: 400, hint: '', animal_id: rusaDeer.id,
        },
        {
            name: 'The Desolation of Rusa', reward: 600, hint: '', animal_id: rusaDeer.id,
        },
        {
            name: 'The Battle of the Five Rusa', reward: 800, hint: '', animal_id: rusaDeer.id,
        },
        {
            name: 'The Phantom Rusa', reward: 1000, hint: 'Do not harvest the first shot Rusa Deer, but rather wait until you have shot a second. Then harvest both within 5 minutes.', animal_id: rusaDeer.id,
        },
        {
            name: 'Revenge of the Rusa', reward: 1200, hint: '', animal_id: rusaDeer.id,
        },
        {
            name: 'The Rusa Awakens', reward: 1800, hint: '', animal_id: rusaDeer.id,
        },
        {
            name: 'The Last Rusa', reward: 3600, hint: 'This is only possible with a shotgun and buckshot ammo. Use a lure to bring two rusa deer (preferably females) come to the same spot so that they overlap. Then shot on chest level between both of them.', animal_id: rusaDeer.id,
        },
    ];
}

async function sambarDeerMissions() {
    const sambarDeer = await findAnimalBy('name', 'Sambar Deer');

    return [
        {
            name: 'Entering the Odd Zone', reward: 100, hint: '', animal_id: sambarDeer.id,
        },
        {
            name: 'Sample Analysis', reward: 200, hint: '', animal_id: sambarDeer.id,
        },
        {
            name: 'Second-Rate Results', reward: 300, hint: '', animal_id: sambarDeer.id,
        },
        {
            name: 'Sambar Epidemic', reward: 400, hint: '', animal_id: sambarDeer.id,
        },
        {
            name: 'Inconclusive Results', reward: 600, hint: '', animal_id: sambarDeer.id,
        },
        {
            name: 'Witchcraft? No. Science!', reward: 800, hint: 'These missions do not have to bee done in the prescribed order, and you may complete more than one at the time.', animal_id: sambarDeer.id,
        },
        {
            name: 'Shoot for Your Life', reward: 1000, hint: '', animal_id: sambarDeer.id,
        },
        {
            name: 'The Resistance', reward: 1200, hint: 'This mission can be completed with a single stag if all three requirements are met for the third task.', animal_id: sambarDeer.id,
        },
        {
            name: 'A Shocking Turn of Events', reward: 1800, hint: '', animal_id: sambarDeer.id,
        },
        {
            name: 'Patient Zero', reward: 3600, hint: '', animal_id: sambarDeer.id,
        },
    ];
}

async function sitkaDeerMissions() {
    const sitkaDeer = await findAnimalBy('name', 'Sitka Deer');

    return [
        {
            name: 'Theres Been a Disappearance', reward: 100, hint: '', animal_id: sitkaDeer.id,
        },
        {
            name: 'Got What it Takes?', reward: 200, hint: '', animal_id: sitkaDeer.id,
        },
        {
            name: 'Dinnertime', reward: 300, hint: 'Any doe will complete this mission.', animal_id: sitkaDeer.id,
        },
        {
            name: 'Unexpected Visitor', reward: 400, hint: '', animal_id: sitkaDeer.id,
        },
        {
            name: 'The Smell of Fear', reward: 600, hint: '', animal_id: sitkaDeer.id,
        },
        {
            name: 'Full Moon', reward: 800, hint: '', animal_id: sitkaDeer.id,
        },
        {
            name: 'Sneaky Suspicions', reward: 1000, hint: '', animal_id: sitkaDeer.id,
        },
        {
            name: 'The Legend of Afterland Lodge', reward: 1200, hint: '', animal_id: sitkaDeer.id,
        },
        {
            name: 'Stone Cold Heart', reward: 1800, hint: '', animal_id: sitkaDeer.id,
        },
        {
            name: 'Blood Moon Rising', reward: 3600, hint: 'https://vignette.wikia.nocookie.net/thehuntergame/images/6/61/Wendigo_coords.png/revision/latest?cb=20171013231433', animal_id: sitkaDeer.id,
        },
    ];
}

async function snowShoeHareMissions() {
    const snowShoeHare = await findAnimalBy('name', 'Snowshoe Hare');

    return [
        {
            name: 'Smelly Evidence', reward: 100, hint: 'https://youtu.be/WpmhkMmild8?t=67', animal_id: snowShoeHare.id,
        },
        {
            name: 'Finding the Intruder', reward: 200, hint: 'https://youtu.be/WpmhkMmild8?t=223', animal_id: snowShoeHare.id,
        },
        {
            name: 'The Tortoise and the Hare', reward: 300, hint: 'https://youtu.be/WpmhkMmild8?t=597', animal_id: snowShoeHare.id,
        },
        {
            name: 'Don\'t Save the Queens', reward: 400, hint: 'https://youtu.be/WpmhkMmild8?t=948', animal_id: snowShoeHare.id,
        },
        {
            name: 'Any Other Hare Around?', reward: 600, hint: 'https://youtu.be/WpmhkMmild8?t=1856', animal_id: snowShoeHare.id,
        },
        {
            name: 'Something to Eat', reward: 800, hint: 'https://youtu.be/WpmhkMmild8?t=2359', animal_id: snowShoeHare.id,
        },
        {
            name: 'Taking the Heirs', reward: 1000, hint: 'https://youtu.be/WpmhkMmild8?t=2638', animal_id: snowShoeHare.id,
        },
        {
            name: 'Foxtrot is Secured', reward: 1200, hint: 'https://youtu.be/WpmhkMmild8?t=3077', animal_id: snowShoeHare.id,
        },
        {
            name: 'Careful with the Choke', reward: 1800, hint: 'https://youtu.be/WpmhkMmild8?t=3300', animal_id: snowShoeHare.id,
        },
        {
            name: 'Something to Compensate With', reward: 3600, hint: '', animal_id: snowShoeHare.id,
        },
    ];
}

async function turkeyMissions() {
    const turkey = await findAnimalBy('name', 'Turkey');

    return [
        {
            name: 'Turkey Training', reward: 100, hint: '', animal_id: turkey.id,
        },
        {
            name: 'Triple Turkey Tracker', reward: 200, hint: '', animal_id: turkey.id,
        },
        {
            name: 'Caruncle Crusher', reward: 300, hint: '', animal_id: turkey.id,
        },
        {
            name: 'Longbeard', reward: 400, hint: '', animal_id: turkey.id,
        },
        {
            name: 'The Bearded Lady', reward: 500, hint: '', animal_id: turkey.id,
        },
        {
            name: 'I Got Spurs', reward: 600, hint: '', animal_id: turkey.id,
        },
        {
            name: 'Turkey Special', reward: 800, hint: '', animal_id: turkey.id,
        },
        {
            name: 'Eagle Eye', reward: 1000, hint: '', animal_id: turkey.id,
        },
        {
            name: 'I Believe I Can Fly', reward: 1300, hint: '', animal_id: turkey.id,
        },
        {
            name: 'Tommy Gunned', reward: 2000, hint: '', animal_id: turkey.id,
        },
        {
            name: 'Three five seven...', reward: 3800, hint: '', animal_id: turkey.id,
        },
    ];
}

async function waterBuffaloMissions() {
    const waterBuffalo = await findAnimalBy('name', 'Water Buffalo');

    return [
        {
            name: 'Where It All Began', reward: 100, hint: 'https://vignette.wikia.nocookie.net/thehuntergame/images/9/9a/Piccabeen_lighthouse_mission.png/revision/latest?cb=20181107190428', animal_id: waterBuffalo.id,
        },
        {
            name: 'Retracing Dawg\'s Steps', reward: 200, hint: '', animal_id: waterBuffalo.id,
        },
        {
            name: 'In the Swamps, They Roam', reward: 300, hint: '', animal_id: waterBuffalo.id,
        },
        {
            name: 'Honorary Horns', reward: 400, hint: '', animal_id: waterBuffalo.id,
        },
        {
            name: 'Brute Force Required', reward: 600, hint: '', animal_id: waterBuffalo.id,
        },
        {
            name: 'So Many Horns, So Little Time', reward: 800, hint: '', animal_id: waterBuffalo.id,
        },
        {
            name: 'The Bigger They Are, The Harder They Fall', reward: 1000, hint: '', animal_id: waterBuffalo.id,
        },
        {
            name: 'Stand Tall and Fear Nothing', reward: 1200, hint: '', animal_id: waterBuffalo.id,
        },
        {
            name: 'Even Small Fries Can Pack a Punch', reward: 1800, hint: 'Let the buffalo charge you and run to the side, then shoot the lungs from close.', animal_id: waterBuffalo.id,
        },
        {
            name: 'A New Legend is Born', reward: 3600, hint: 'https://vignette.wikia.nocookie.net/thehuntergame/images/d/d1/Ravager_buffalo_location.png/revision/latest?cb=20181107191723', animal_id: waterBuffalo.id,
        },
    ];
}

async function whitetailDeerMissions() {
    const whitetailDeer = await findAnimalBy('name', 'Whitetail Deer');

    return [
        {
            name: 'Track a Whitetail Deer', reward: 100, hint: 'All you need to do is find three tracks from the same Whitetail Deer. Once you find one track, just follow the clues on your HunterMate, and the other two tracks should be fairly easy to find.', animal_id: whitetailDeer.id,
        },
        {
            name: 'Spot a Whitetail Deer', reward: 100, hint: 'Find a Whitetail Deer and look at it through your Binoculars or rifle scope. Wait until an outline appears around the deer. An animal info box will appear in the upper right corner and you have successfully spotted the deer.', animal_id: whitetailDeer.id,
        },
        {
            name: 'Harvest a Whitetail Deer', reward: 100, hint: '', animal_id: whitetailDeer.id,
        },
        {
            name: 'Take a 8pt Whitetail Deer', reward: 200, hint: '8 points means that there are at least 4 points on each side.', animal_id: whitetailDeer.id,
        },
        {
            name: 'A Favor for a Friend', reward: 300, hint: '10 points means that there are at least 5 points on each side.', animal_id: whitetailDeer.id,
        },
        {
            name: 'Dinner for a Week', reward: 400, hint: '', animal_id: whitetailDeer.id,
        },
        {
            name: 'Be Vewwy, Vewwy Qwiet', reward: 500, hint: '', animal_id: whitetailDeer.id,
        },
        {
            name: 'The Long Shot', reward: 600, hint: 'To make a shoot from this distance, try hunting some of the large meadows, or straight roads that offer a long view.', animal_id: whitetailDeer.id,
        },
        {
            name: 'A Cull', reward: 700, hint: '', animal_id: whitetailDeer.id,
        },
        {
            name: 'The Spotter, Pt. 1', reward: 800, hint: 'This mission requires you to spot a buck first. If you spotted a doe before, it won\'t count even if you spot it again when task 1 completes. It must be a doe after the buck that you haven\'t yet spotted.', animal_id: whitetailDeer.id,
        },
        {
            name: 'The Spotter, Pt. 2', reward: 800, hint: 'Since this mission is attached to the previous mission, it should be pretty simple to shoot one of the Whitetail Deer that you have spotted in the herd from your tower. Make sure to activate the mission before harvesting one of the deer.', animal_id: whitetailDeer.id,
        },
        {
            name: 'Big Rack', reward: 1000, hint: 'Find and shoot a Whitetail Deer with at least 12 points. This means that there are at least 6 points on each side.', animal_id: whitetailDeer.id,
        },
        {
            name: 'Big Score', reward: 1300, hint: 'This will usually require 12 points and up to complete.', animal_id: whitetailDeer.id,
        },
        {
            name: 'Big Rack, up close!', reward: 1600, hint: 'Lure the buck towards you and shoot it from within 20-30m.', animal_id: whitetailDeer.id,
        },
        {
            name: 'Shotgun Doe Cull', reward: 2100, hint: 'Lure the does towards you and shoot them from within 20-30m.', animal_id: whitetailDeer.id,
        },
        {
            name: 'Nice Sidearm...', reward: 2600, hint: '', animal_id: whitetailDeer.id,
        },
        {
            name: 'I\'ll give you a Buck for each...', reward: 3800, hint: '', animal_id: whitetailDeer.id,
        },
    ];
}

async function wildBoarMissions() {
    const wildBoar = await findAnimalBy('name', 'Wild Boar');

    return [
        {
            name: 'An Old Acquaintance', reward: 100, hint: '', animal_id: wildBoar.id,
        },
        {
            name: 'Boared to Death', reward: 200, hint: '', animal_id: wildBoar.id,
        },
        {
            name: 'Three Little Piggies', reward: 300, hint: '', animal_id: wildBoar.id,
        },
        {
            name: 'Mother\'s Day', reward: 400, hint: '', animal_id: wildBoar.id,
        },
        {
            name: 'Family Values', reward: 600, hint: '', animal_id: wildBoar.id,
        },
        {
            name: 'It\'s Lützen All Over Again', reward: 800, hint: '', animal_id: wildBoar.id,
        },
        {
            name: 'Up Close and Personal', reward: 1000, hint: '', animal_id: wildBoar.id,
        },
        {
            name: 'Old School', reward: 1200, hint: '', animal_id: wildBoar.id,
        },
        {
            name: 'Older School', reward: 1800, hint: 'This mission can also be compelted with the Recurve Bow Carbon.', animal_id: wildBoar.id,
        },
        {
            name: 'There Can Be Only One', reward: 3600, hint: 'The hog will spawn and move around, so get to the site as soon as you can. The easiest is if you place a tent nearby and start your session there. The tower at these coordinates can be found here: https://vignette.wikia.nocookie.net/thehuntergame/images/5/5a/Wb_mission10_hint.png/revision/latest?cb=20160304174624', animal_id: wildBoar.id,
        },
    ];
}

exports.seed = (knex) => {
    Model.knex(knex);

    return knex('missions').del()
        .then(async () => {
            await knex('missions').insert(await allDucksMissions());
            await knex('missions').insert(await alpineIbexMissions());
            await knex('missions').insert(await arcticFoxMissions());
            await knex('missions').insert(await bantengMissions());
            await knex('missions').insert(await bighornSheepMissions());
            await knex('missions').insert(await bisonMissions());
            await knex('missions').insert(await blackBearMissions());
            await knex('missions').insert(await blacktailDeerMissions());
            await knex('missions').insert(await bobcatMissions());
            await knex('missions').insert(await brownBearMissions());
            await knex('missions').insert(await canadaGooseMissions());
            await knex('missions').insert(await cottontailRabbitMissions());
            await knex('missions').insert(await coyoteMissions());
            await knex('missions').insert(await dallSheepMissions());
            await knex('missions').insert(await eurasianLynxMissions());
            await knex('missions').insert(await europeanRabbitMissions());
            await knex('missions').insert(await feralGoatMissions());
            await knex('missions').insert(await feralHogMissions());
            await knex('missions').insert(await greyWolfMissions());
            await knex('missions').insert(await grizzlyBearMissions());
            await knex('missions').insert(await magpieGooseMissions());
            await knex('missions').insert(await mallardDuckMissions());
            await knex('missions').insert(await mooseMissions());
            await knex('missions').insert(await muleDeerMissions());
            await knex('missions').insert(await pheasantMissions());
            await knex('missions').insert(await polarBearMissions());
            await knex('missions').insert(await ptarmiganMissions());
            await knex('missions').insert(await redDeerMissions());
            await knex('missions').insert(await redFoxMissions());
            await knex('missions').insert(await redKangarooMissions());
            await knex('missions').insert(await reindeerMissions());
            await knex('missions').insert(await rockyMountainElkMissions());
            await knex('missions').insert(await roeDeerMissions());
            await knex('missions').insert(await rooseveltElkMissions());
            await knex('missions').insert(await rusaDeerMissions());
            await knex('missions').insert(await sambarDeerMissions());
            await knex('missions').insert(await sitkaDeerMissions());
            await knex('missions').insert(await snowShoeHareMissions());
            await knex('missions').insert(await turkeyMissions());
            await knex('missions').insert(await waterBuffaloMissions());
            await knex('missions').insert(await whitetailDeerMissions());
            await knex('missions').insert(await wildBoarMissions());
        });
};
