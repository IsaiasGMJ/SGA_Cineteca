var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch(err => {
    console.log('Error al conectarse a MongoDB', err);
  });

// Importar rutas
const productoRoutes = require('./routes/producto');
const transaccionRoutes = require('./routes/transacciones');
const usuarioRoutes = require('./routes/users');
const ventaRoutes = require('./routes/venta');

// Usar rutas
app.use('/api/productos', productoRoutes);
app.use('/api/transacciones', transaccionRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ventas', ventaRoutes);

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Captura 404 y reenvía al manejador de errores
app.use(function (req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function (err, req, res, next) {
  // Establece locales, solo proporciona error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza la página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
