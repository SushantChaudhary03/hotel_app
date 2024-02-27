const mongoose = require('mongoose');
// const mongoURL = process.env.LOCAL_URL;
const mongoURL = process.env.SERVER_URL;

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