'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.type('text/plain').send('routed');
});

app.get('*', (req, res) => res.sendStatus(404));
app.post('*', (req, res) => res.sendStatus(404));
app.put('*', (req, res) => res.sendStatus(404));
app.delete('*', (req, res) => res.sendStatus(404));

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

module.exports = app;
