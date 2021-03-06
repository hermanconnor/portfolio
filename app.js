// Import express and set up the app
const express = require('express');
const mainRoutes = require('./routes');
const app = express();

// Set view engine
app.set('view engine', 'pug');

// Set Static Folder
app.use('/static', express.static('public'));

// Use route definitions
app.use(mainRoutes);

/* ERROR HANDLERS */
/* 404 handler to catch undefined or non-existent route requests */
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = `Oops! It looks like the page you're looking for does not exist.`;
  next(err);
});

/* GLOBAL ERROR HANDLER */
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).render('page-not-found', { err });
    console.log(`${err.message} Status: ${err.status}`);
  } else {
    err.message = err.message || `Uh Oh! Something went wrong!`;
    res.status(err.status || 500);
    res.render('error', { err });
    console.log(`${err.message} Status: ${err.status}`);
  }
});

// Start Server On Port 3000
app.listen(3000, () => console.log('Server running on port 3000.'));
