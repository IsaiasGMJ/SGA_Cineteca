var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://2123200401:Imposible98@clusterdeprueba.wdfctea.mongodb.net/ejemploGabriel2024");
//const Sensor = mongoose.model('Sensor');

//listado de modelos
require("./models/usuario");
require("./models/producto");

//listado de archivos routes (rutas)
var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var empleadosRouter = require("./routes/empleado");
var productosRouter = require("./routes/productos");
var sensorRouter = require("./routes/sensor");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use('/foto', express.static(__dirname + '/almacen/img'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cors
app.use(cors({
  "origin": ["http://localhost:4200","http://localhost:80"],
  //"oring": "*",
  "methods": "GET,PUT,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

//listado de url para cada archivo de rutas(rutas)
app.use('/', indexRouter);
app.use('/usuario', usuariosRouter);
app.use('/empleado', empleadosRouter);
app.use('/producto', productosRouter);
app.use('/sensor', sensorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
