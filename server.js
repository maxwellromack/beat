// Load Node modules
var express = require('express');
const ejs = require('ejs');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.listen(8080);

// Display Pages
app.get('/producer', function (req, res) {
    var username = "Producer User";
    res.render('pages/producer', {
        username: username
    });
});

app.get('/listener', function (req, res) {
    var username = "Jimmy";
    res.render('pages/listener', {
        username: username
    });
});

app.get('/dj', function (req, res) {
    var username = "DJ User";
    res.render('pages/dj', {
        username: username
    });
});

