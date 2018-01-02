var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
        username: String,
        password: String,
        role: String,
        dateAdded: {
            type: Date,
            default: Date.now
        },
        lastLogin: Date,
        email: String,
        pin: Number,
        chatName: String,
        disabled: {
            type: Boolean,
            default: false
        }
    });
    
var users = mongoose.model('users', users);
module.exports = users;