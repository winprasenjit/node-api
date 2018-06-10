var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('User');

router.post('/testing', function(req, res, next) {
    /* Post.findOne({ _id: req.body.id }, function(err, post) {
        console.log(req.body.id);
        if (err) {
            return next(err);
        }
        res.json(post);
    }); */
    res.status(400).send('No Post found');
});

//AUthenticate user to mongodb
router.post('/authenticate', function(req, res, next) {
    var userFound = false;
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if(user){
            if(user.password !== req.body.password){
                res.status(400).send('Password doesn\'t match');
            } else {
                res.json(user);
            }
        } else {
            res.status(400).send('No User found');
        }
    });
});

//GET users listing.
router.get('/', function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            return next(err);
        }
        res.json(users);
    });
});

//Add user to mongodb
router.post('/', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});

//Add user to mongodb
router.put('/', function(req, res, next) {
    User.findOne({ _id: req.body._id }, function(err, user) {
        if (err) {
            return res.status(500).send(err);
        }

        for (var x in req.body) {
            user[x] = req.body[x] || user[x]
        }

        user.save(function(err, user) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(user);
        });
    });
});

//Delete user from mongodb
router.delete('/', function(req, res, next) {
    User.remove({ username: req.body.username }, function(err, user) {
        if (err) throw err;
        res.json({
            success: true,
            message: 'User successfully deleted!'
        });
    });
});

module.exports = router;