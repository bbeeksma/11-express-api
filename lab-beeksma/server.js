'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());



app.get('*', (req, res) => res.status(404).send('404 Page not found'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
