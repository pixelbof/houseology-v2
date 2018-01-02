var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pages = new Schema({
    title: String,
    url: {type:String, index:{unique:true}},
    content: String,
    menuIndex: Number,
    date: {
        type: Date,
        default: Date.now
    }    
});

var pages = mongoose.model('pages', pages);

module.exports = pages;