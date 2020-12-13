const express = require('express');

const app = express();

const cors = require('cors');

app.use(express.json());
app.use(express.static('build'));

const names = require('./names.json');

app.get('/api/names', cors(), (req, res) => {
  res.json(names);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);
