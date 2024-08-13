// routes/ventaRoutes.js
const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

// Rutas para el carrito
router.post('/agregar', ventaController.agregarProducto);
router.get('/ver/:userId', ventaController.verCarrito);
router.delete('/eliminar', ventaController.eliminarProducto);

// Rutas para ventas
router.post('/vender', ventaController.realizarVenta);
router.get('/ventas', ventaController.obtenerVentas);
router.get('/ventas/:id', ventaController.obtenerVentaPorId);

module.exports = router;
