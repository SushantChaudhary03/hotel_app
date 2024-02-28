const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();
const passport = require('./auth');

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// Middleware function

const logRequest = (req, res, next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();
}
app.use(logRequest);

// use authentication here 

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

// import routes

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// use the routes

app.use('/person', localAuthMiddleware, personRoutes);
app.use('/menu', menuItemRoutes);
  
const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })