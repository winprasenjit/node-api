var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Post = mongoose.model('Post');


//GET Post listing.
router.get('/', function(req, res, next) {
    Post.find(function(err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
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
    Post.remove({ name: req.body.name }, function(err, post) {
        if (err) throw err;
        res.json({
            success: true,
            message: 'Post successfully deleted!'
        });
    });
});

module.exports = router;