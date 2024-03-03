const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    work: {
        type: String,
        require: true,
        enum: ["chef", "manager", "waiter"]
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    }
})

personSchema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) return next();
    try {
        // generate salt
        const salt = await bcrypt.genSalt(10);

        // generate hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();

    } catch (err) {
        return next(err);
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch (error) {
        throw error;
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;