const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// import routes

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// use the routes

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);
  
const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })