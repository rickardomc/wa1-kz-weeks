'use strict';

const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');

// init express
const app = express();
const port = 3001;


// set up the middlewares
app.use(morgan('dev'));
app.use(express.json());

/*** APIs ***/
app.get('/api/exams', (req, res) => {
  dao.listExams()
    .then(exams => res.send(exams))
    .catch(() => res.status(500).end());
})

app.put('/api/exams/:code', async (req, res) => {
  const exam2update = req.body;
  if (req.params.code !== req.body.code) {
    res.status(503).json({ error: `Wrong exam code in the request body` });
    return;
  }
  try {
    await dao.updateExam(exam2update);
    res.status(200).end();
  }
  catch (e) {
    res.status(503).json({ error: `Database error while updating ${exam2update.code}` });
  }


  exam2update.code = exam2update.code ? exam2update : 'code';
  exam2update.laude = exam2update.laude ? exam2update : 'laude';
  exam2update.date = exam2update.date ? exam2update : 'date';
  exam2update.courseCode = exam2update.courseCode ? exam2update : 'courseCode';
})


// activate the server
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));