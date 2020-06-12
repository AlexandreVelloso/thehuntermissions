import Knex from 'knex';

exports.seed = (knex: Knex) => knex('animals').del()
    .then(() => knex('animals').insert([
        { name: 'All Ducks' },
        { name: 'Alpine Ibex' },
        { name: 'Arctic Fox' },
        { name: 'Banteng' },
        { name: 'Bighorn Sheep' },
        { name: 'Bison' },
        { name: 'Black Bear' },
        { name: 'Blacktail Deer' },
        { name: 'Bobcat' },
        { name: 'Brown Bear' },
        { name: 'Canada Goose' },
        { name: 'Cottontail Rabbit' },
        { name: 'Coyote' },
        { name: 'Dall Sheep' },
        { name: 'Eurasian Lynx' },
        { name: 'European Rabbit' },
        { name: 'Feral Goat' },
        { name: 'Feral Hog' },
        { name: 'Gadwall' },
        { name: 'Grey Wolf' },
        { name: 'Grizzly Bear' },
        { name: 'Magpie Goose' },
        { name: 'Mallard Duck' },
        { name: 'Moose' },
        { name: 'Mule Deer' },
        { name: 'Northern Pintail' },
        { name: 'Pheasant' },
        { name: 'Polar Bear' },
        { name: 'Ptarmigans' },
        { name: 'Red Deer' },
        { name: 'Red Fox' },
        { name: 'Red Kangaroo' },
        { name: 'Reindeer' },
        { name: 'Rock Ptarmigan' },
        { name: 'Rocky Mountain Elk' },
        { name: 'Roe Deer' },
        { name: 'Roosevelt Elk' },
        { name: 'Rusa Deer' },
        { name: 'Sambar Deer' },
        { name: 'Sitka Deer' },
        { name: 'Snow Goose' },
        { name: 'Snowshoe Hare' },
        { name: 'Turkey' },
        { name: 'Water Buffalo' },
        { name: 'Whitetail Deer' },
        { name: 'White-tailed Ptarmigan' },
        { name: 'Wild Boar' },
        { name: 'Willow Ptarmigan' },
        { name: 'Werewolf' },
    ]));