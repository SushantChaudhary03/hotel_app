const express = require('express');
const app = express();
const port = 5000;
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// import routes

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// use the routes

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);
  
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })