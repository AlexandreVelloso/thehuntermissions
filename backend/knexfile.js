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
            host: 'brbaex93leeqblrd4wz7-mysql.services.clever-cloud.com',
            database: 'brbaex93leeqblrd4wz7',
            user: 'ukjjbcrcibz36pzy',
            password: 'I4x7BsexIKGTTSgGW4Vp',
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
