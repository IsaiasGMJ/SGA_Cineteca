// Importa el módulo express, que es un framework para construir aplicaciones web y APIs en Node.js
var express = require('express');
// Crea un router de Express, que se utiliza para definir rutas y manejar solicitudes HTTP
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send("hola");
});

module.exports = router;
