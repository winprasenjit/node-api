/**
 * Created by Prasenjit on 11/6/2016.
 */
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    coverLetter: String,
    revisedPrice : Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contact: [{
        email: String,
        mobile: Number,
        aboutu: String
    }],
    user : { type: mongoose.Schema.Types, ref: 'Post' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    createdBy : String,
    time : { type : Date, default: Date.now }
});

mongoose.model('Comment', CommentSchema,'comment');
