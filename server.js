var express = require("express");
var session = require("express-session")
var path = require("path");
var count = 0;
var app = express();
app.use(session({
    secret: 'gnomon',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {

    if(req.session.count){
        req.session.count += 1;
    }
    else{
        req.session.count = 1;
    }
    count = req.session.count;
    res.render("index", { count });
})
app.get('/add1', function (req, res) {
    req.session.count = count
   
    res.redirect('/');
})
app.get('/add2', function (req, res){
    req.session.count += 1;
    
    res.redirect('/')
})
app.get('/reset', function (req, res){
    req.session.destroy();
   
    res.redirect('/')
})
app.listen(8000, function () {
    console.log("listening on port 8000");
});

