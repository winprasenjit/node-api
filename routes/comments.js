/**
 * Created by prasenjit on 7/1/2018.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

var Comment = mongoose.model('Comment');

//Get Comment for a post
router.get('/', function (req, res, next) {
    Comment.find({post:req.query.postid})
        .exec(function (err, comments) {
            if (err) {
                return next(err);
            }
            res.json(comments);
        });
});

//Add Comment to post
router.post('/', function (req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function (err, comment) {
        if (err) {
            return next(err);
        }
        res.json(comment);
    });
});

module.exports = router;