const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', ()=>{
  console.log('db is connected');
})

db.on('error', (err)=>{
  console.log('connection error in database', err);
})

db.on('disconnected', ()=>{
  console.log('db is disconnected');
})

module.exports = db;