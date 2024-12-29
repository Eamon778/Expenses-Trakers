const { text } = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    expenses: [{
        text: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);