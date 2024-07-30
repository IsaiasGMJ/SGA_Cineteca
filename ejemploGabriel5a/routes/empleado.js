// Importa el módulo express, que es un framework para construir aplicaciones web y APIs en Node.js
var express = require('express');
// Crea un router de Express, que se utiliza para definir rutas y manejar solicitudes HTTP
var router = express.Router();

router.get('/', function (req, res) {
    let valor_recibido = req.params.valor;
});

router.get('/get2/:valor', function (req, res) {
    // let valor_recibido = req.params.valor
    res.send("soy get de empleados valor recibido = " + req.params.valor);

    //res.send("soy post de empleados valor_recibido = " + valor_recibido);
});

router.post('/', function (req, res) {
    let valor_recibido = req.params.valor;

    res.send("soy post de empleado = ");
});

router.put('/', function (req, res) {
    res.send("soy put de empleados")
});

router.delete('/', function (req, res) {
    res.send("soy delete de empleados")
});

module.exports = router;