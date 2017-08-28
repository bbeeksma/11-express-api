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

app.get('/workout', (req,res) => {
  storage.fetchItem(req.path,req.query.id)
    .then((item) => {
      console.log(item);
      res.status(200).json(item);
    }).catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/workout', (req,res) => {
  storage.createItem(req.path,req.body.exercise,req.body.weight,req.body.rep,req.body.set)
    .then((item) => {
      console.log(item);
      res.status(200).json(item);
    }).catch((err) => {
      res.status(500).send(err);
    });
});

app.get('*', (req, res) => res.sendStatus(404));
app.post('*', (req, res) => res.sendStatus(404));
app.put('*', (req, res) => res.sendStatus(404));
app.delete('*', (req, res) => res.sendStatus(404));

app.listen(PORT, () => debug(`started on port ${PORT}`));

module.exports = app;
