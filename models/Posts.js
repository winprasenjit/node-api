/**
 * Created by Prasenjit on 11/6/2016.
 */
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: { type: Number, default: 0 },
    category: [{ type: String }],
    contact: [{
        email: String,
        mobile: Number,
        aboutu: String
    }],
    time : { type : Date, default: Date.now }
});

mongoose.model('Post', PostSchema, 'post');