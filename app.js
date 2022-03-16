const path = require('path');
const express = require('express');

const mainRoutes = require('./routes/main');
const placesRoutes = require('./routes/places');
const participantsRoutes = require('./routes/participants');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(mainRoutes);
app.use(placesRoutes);
app.use(participantsRoutes);

app.listen(3000);