import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Model } from 'objection';
import path from 'path';
import appRoot from 'app-root-path';
import express from 'express';

import routes from './Routes';
import knex from '../database/connection';

Model.knex(knex);

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use(express.static(path.join(appRoot.toString(), '../frontend/build')));
app.use(routes);
app.get('*', (_req, res) => {
    res.sendFile(path.join(appRoot.toString(), '../frontend/build', 'index.html'));
});

export default app;
