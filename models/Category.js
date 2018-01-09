/**
 * Created by Prasenjit on 11/6/2016.
 */
var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: String
});

mongoose.model('Category', CategorySchema, 'category');