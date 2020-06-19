import knex from 'knex';
import configuration from './knexfile';

let config;
switch (process.env.NODE_ENV) {
    case 'production':
        config = configuration.production;
        break;
    case 'test':
        config = configuration.test;
        break;
    default:
        config = configuration.development;
        break;
}

const connection = knex(config);

export default connection;
