/**
 * Created by Prasenjit on 11/6/2016.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    firstname: String,
    lastname: String,
    username: String,
    password : String,
    type: String,
    mobile: String,
    email: String,
    location: String,
    role: String,
    sex: String,
    rating: { type: Object, "default": {
        "communication" : 1,
		"attitude" : 1,
		"sense" : 1
    }}
});

mongoose.model('User', UserSchema, 'user');