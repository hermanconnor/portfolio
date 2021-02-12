const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');

router.get('/', (req, res) => {
  res.locals = projects;
  res.render('index', { projects });
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/project/:id', (req, res, next) => {
  const projectID = req.params.id;
  const project = projects.find(({ id }) => id === +projectID);

  if (project) {
    res.render('project', { project });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = `Looks like the project you requested doesn't exist`;
    next(err);
  }
});

module.exports = router;
