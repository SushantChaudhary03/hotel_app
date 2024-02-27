const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    dish:{
        type: String,
        require: true     
    },
    water:{
        type: Boolean,
        default: true,
    },
})

const menuItem = mongoose.model('menuItem', menuSchema);
module.exports = menuItem;