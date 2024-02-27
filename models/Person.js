const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    mobile:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    work:{
        type: String,
        require: true,
        enum: ["chef", 'manager', "waiter"]
    }
})

const Person = mongoose.model('Person', personSchema);
module.exports = Person;