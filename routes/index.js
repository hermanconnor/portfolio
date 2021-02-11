const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');

router.get('/', (req, res) => {
  res.locals = projects;
  res.render('index', { projects });
});

router.get('/about', (res, req) => {
  res.render('about');
});

module.exports = router;
