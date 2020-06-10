// Update with your config settings.

const appRoot = require('app-root-path');

module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: `${appRoot}/database/dev.sqlite`,
        },
        migrations: {
            directory: `${appRoot}/database/migrations`,
        },
        seeds: {
            directory: `${appRoot}/database/seeds`,
        },
        useNullAsDefault: true,
    },

    test: {
        client: 'sqlite3',
        connection: ':memory:',
        migrations: {
            directory: `${appRoot}/database/migrations`,
        },
        seeds: {
            directory: `${appRoot}/database/seeds`,
        },
        useNullAsDefault: true,
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'mysql',
        connection: {
            host: 'bzjvhmqmmqwfhgoxludj-mysql.services.clever-cloud.com',
            database: 'bzjvhmqmmqwfhgoxludj',
            user: 'uhsnsep4sdud12xx',
            password: 'lAnpEgU3Rn5Q8a2Nzvdj',
        },
        pool: {
            min: 1,
            max: 5,
        },
        migrations: {
            directory: `${appRoot}/database/migrations`,
        },
        seeds: {
            directory: `${appRoot}/database/seeds`,
        },
    },

};
