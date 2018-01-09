var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Category = mongoose.model('Category');


//GET Category listing.
router.get('/', function(req, res, next) {
    Category.find(function(err, category) {
        if (err) {
            return next(err);
        }
        res.json(category);
    });
});

//Add Category to mongodb
router.post('/', function(req, res, next) {
    var category = new Category(req.body);
    category.save(function(err, category) {
        if (err) {
            return next(err);
        }
        res.json(category);
    });
});

//Add Category to mongodb
router.put('/', function(req, res, next) {
    Category.findOne({ _id: req.body._id }, function(err, category) {
        if (err) {
            return res.status(500).send(err);
        }

        for (var x in req.body) {
            category[x] = req.body[x] || category[x]
        }

        category.save(function(err, category) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(category);
        });
    });
});

//Delete Category from mongodb
router.delete('/', function(req, res, next) {
    Category.remove({ name: req.body.name }, function(err, category) {
        if (err) throw err;
        res.json({
            success: true,
            message: 'Category successfully deleted!'
        });
    });
});

module.exports = router;