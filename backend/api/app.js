const express = require('express');
const cors = require('cors');
const { Model } = require('objection');
const path = require('path');
const appRoot = require('app-root-path');

const routes = require('./Routes');
const knex = require('../database/connection');
const { handleError } = require('./Helpers/ErrorHandler');

Model.knex(knex);

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(appRoot.toString(), '../frontend/build')));
app.use(routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(appRoot.toString(), '../frontend/build', 'index.html'));
});

app.use(handleError);

module.exports = app;
