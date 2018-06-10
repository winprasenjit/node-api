var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var multer = require('multer'); // require multer for the file uploads
var DIR = 'public/uploads'; // set the directory for the uploads to the uploaded to
var path = require('path')
var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var uploadFolder;
        if (req.body.target) {
            uploadFolder = DIR + '/' + req.body.target;
        } else {
            uploadFolder = DIR;
        }
        if (!fs.existsSync(uploadFolder)) { //create directory if not exist
            fs.mkdirSync(uploadFolder);
        }
        cb(null, uploadFolder)
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
var upload = multer({ storage: storage }).single('photo');

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

//our file upload function.
router.post('/upload', function(req, res, next) {
    var imgPath = '';
    upload(req, res, function(err) {
        if (err) {
            console.log(err); // An error occurred when uploading
            return res.status(422).send("an Error occured")
        }

        // No error occured.
        imgPath = req.file.path.replace('public', '');
        var readStream = fs.createReadStream(path.join(__dirname + '\\..\\', req.file.path));

        //console.log(gm(path.join(__dirname + '\\..\\', req.file.path)))
        res.json({
            success: true,
            filePath: imgPath,
            filename: req.file.filename,
            originalname: req.file.originalname
        });
    });
});

/* router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts) {
        if (err) {
            return next(err);
        }

        res.json(posts);
    });
});

router.post('/posts', function(req, res, next) {

    var post = new Post(req.body);

    post.save(function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});
 */
module.exports = router;