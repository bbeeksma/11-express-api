'use strict';

const debug = require('debug')('server');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const storage = require('./model/storage');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.type('text/plain').send(`Hello from port:${PORT}`);
});

app.post('/workout', (req,res) => {
  storage.createItem('/workout',req.body.exercise,req.body.weight,req.body.rep,req.body.set)
    .then((item) => {
      res.json(item);
    }).catch(res.sendStatus(500));
});

app.get('*', (req, res) => res.sendStatus(404));
app.post('*', (req, res) => res.sendStatus(404));
app.put('*', (req, res) => res.sendStatus(404));
app.delete('*', (req, res) => res.sendStatus(404));

app.listen(PORT, () => debug(`started on port ${PORT}`));

module.exports = app;
