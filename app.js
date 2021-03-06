var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
    express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    controllers = require('./server/controllers/Namespace.js'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser');
    multer = require('multer');

var log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

var isLoggedIn = function (req){
  var loggedIn = (typeof(req.cookies.user) == 'undefined');
  return !loggedIn
}

var isAdmin = function(req){
  if(isLoggedIn(req)){
    return JSON.parse(req.cookies.user).isAdmin > 0;
  }
  return false;
}

mongoose.connect('mongodb://sa:pass@ds029454.mlab.com:29454/cavalriesere')
app.set('view engine', 'pug');
app.set('views', __dirname + '/public/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/', express.static(__dirname + '/public/views'));
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/css', express.static(__dirname + '/public/css'))

app.get('/', function(req,res){
  if(isLoggedIn(req)) res.redirect('/dashboard')
  res.render('index', {error: '', loggedIn: isLoggedIn(req)});
})
app.get('/register/:err?', controllers.User.register)
app.get('/country/create/:access?', controllers.Country.createForm)
app.get('/country/view/:code?', controllers.Country.view);
app.get('/dashboard', controllers.User.dashboard)
app.get('/user/signout', controllers.User.signout);
app.get('/sweepstakes/signup', controllers.Sweepstakes.signup);
app.get('/player/create', controllers.Player.createForm);
app.get('/tournament/manage', function(req,res){
  if(isAdmin(req)){
    res.render('tournament');
  } else {
    res.redirect('/')
  }
})
app.get('/tournament/get', controllers.Tournament.getTournament)

app.post('/user/login', controllers.User.login)
app.post('/country/create', controllers.Country.create)
app.post('/user/create', controllers.User.create)
app.post('/tournament/update', controllers.Tournament.update);

// Listen on port 3000, IP defaults to 127.0.0.1
app.listen(port, function(){
  console.log("Server now listening on port " + port);
})
