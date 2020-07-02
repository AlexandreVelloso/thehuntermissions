// Update with your config settings.

import appRoot from 'app-root-path';

export default {
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
            host: 'bb06qqmjvoledl6necnt-mysql.services.clever-cloud.com',
            database: 'bb06qqmjvoledl6necnt',
            user: 'u10cxbahlfusaqed',
            password: 'jsfQnbvTxAy78J2hOYO6',
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
