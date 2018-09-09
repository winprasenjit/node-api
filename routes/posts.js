var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

var Post = mongoose.model('Post');

router.get('/:postId', function(req, res, next) {
    Post.findOne({ _id: req.params.postId }, function(err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});

//GET Post listing.
router.get('/', function(req, res, next) {
    var postList = [];
    var limit = parseInt(req.query.count);
    var skip = (parseInt(req.query.skip));
    var createdBy = req.query.user;

    var searchCondition = {}//(createdBy) ? {createdBy:createdBy} : {};

    Post.find(searchCondition)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(function(err, posts) {
            if (err) {
                return next(err);
            }
            for (var i = 0; i < posts.length; i++) {
                posts[i].editable = (posts[i].createdBy === req.query.user) ? true : false;
                postList.push(posts[i]);
            }
            res.json(postList);
        });
});

//Add Post to mongodb
router.post('/', function(req, res, next) {
    var post = new Post(req.body);
    post.save(function(err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});

//Add Post to mongodb
router.put('/', function(req, res, next) {
    Post.findOne({ _id: req.body._id }, function(err, post) {
        if (err) {
            return res.status(500).send(err);
        }

        for (var x in req.body) {
            post[x] = req.body[x] || post[x]
        }

        post.save(function(err, post) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(post);
        });
    });
});

//Delete Post from mongodb
router.delete('/', function(req, res, next) {
    Post.findByIdAndRemove(req.body.id, function(err, post) {
        if (err) throw err;
        res.json(post);
    });
});

module.exports = router;