// Import express and set up the app
const express = require('express');

const mainRoutes = require('./routes');
const projectRoutes = require('./routes/project');
const app = express();

// Set view enging
app.set('view engine', 'pug');

// Set Static Folder
app.use('/static', express.static('public'));

app.use(mainRoutes);
app.use('/project', projectRoutes);

app.listen(3000, () => console.log('Server running on port 3000.'));
