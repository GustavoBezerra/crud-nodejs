var express = require('express');
var passport = require('passport');
var router = express.Router();

function authenticationMiddleware (){
  return function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/login?fail=true');
  }
}

/** Routes */

router.get('/', function(req, res, next) {
  res.render('login', {message: null});
});

router.get('/lista', authenticationMiddleware(), function(req, res, next) {
  global.db.findAll((e, docs) => {
    if(e) { return console.log(e); }
    res.render('index', {title: 'Lista de Clientes', docs: docs});
  })
});

router.get('/new', authenticationMiddleware(), function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro' });
});

router.post('/new', function(req, res){
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.insert({nome, idade}, (err, result) => {
    if(err) { return console.log(err); }
    res.redirect('/');
  });
});

router.get('/upload', authenticationMiddleware(), function(req, res){
  res.render('upload', { title: 'Upload de Arquivos' });
});

router.post('/upload', function(req, res, next){
  var formidable = require('formidable');
  var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      res.write('File uploaded - '+files.filetoupload.name);
      res.end();
    });
});

router.get('/login', function(req, res){
  if(req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretas!' });
  else
    res.render('login', { message: null });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/chat', failureRedirect: '/login?failure=true'})
);

module.exports = router;
