// Import express and set up the app
const express = require('express');
const mainRoutes = require('./routes');
const app = express();

// Set view enging
app.set('view engine', 'pug');

// Set Static Folder
app.use('/static', express.static('public'));

app.use(mainRoutes);

/* ERROR HANDLERS */
/* 404 handler to catch undefined or non-existent route requests */
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = `Oops! It looks like the page you're looking for does not exist.`;
  console.log(`${err.message} Status: ${err.status}`);
  next(err);
});

/* Global error handler */
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).render('page-not-found', { err });
  } else {
    err.message = err.message || `Uh Oh! Something went wrong with the server!`;
    res.status(err.status || 500);
    res.render('error', { err });
  }
});

// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   res.locals.error = err;
//   res.status(err.status);
//   res.render('error', err);
// });

app.listen(3000, () => console.log('Server running on port 3000.'));
