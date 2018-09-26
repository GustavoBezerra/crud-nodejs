var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  global.db.findAll((e, docs) => {
    if(e) { return console.log(e); }
    res.render('index', {title: 'Lista de Clientes', docs: docs});
  })
});

router.get('/new', function(req, res, next) {
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

module.exports = router;
