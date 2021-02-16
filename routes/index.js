const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');

// GET Home Route
router.get('/', (req, res) => {
  res.locals = projects;
  res.render('index', { projects });
});

// GET About Route
router.get('/about', (req, res) => {
  res.render('about');
});

// GET Project Routes
router.get('/project/:id', (req, res, next) => {
  const projectID = req.params.id;
  const project = projects.find(({ id }) => id === +projectID);

  if (project) {
    res.render('project', { project });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = `Looks like the project you requested doesn't exist.`;
    console.log(`${err.message} Status: ${err.status}`);
    next(err);
  }
});

/* GET Generated Error Route - Create and throw 500 server error */
router.get('/error', (req, res, next) => {
  // Log out custom error handler indication
  console.log('Custom error route called.');

  const err = new Error();
  err.message = `Custom 500 error thrown.`;
  err.status = 500;
  throw err;
});

module.exports = router;
