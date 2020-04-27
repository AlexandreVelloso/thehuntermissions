const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const { Model } = require('objection');
const path = require('path');

const routes = require('./Routes');
const knex = require('../database/connection');

Model.knex(knex);

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.use(errors());

module.exports = app;
