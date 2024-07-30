// Rutas para producto
const express = require('express');
const router = express.Router();
const productoController = require('../../controllers/inventory/productoController');
// const { authMiddleware } = require('../../middlewares/authMiddleware');


// api/productos
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProducto);
router.post('/', productoController.crearProducto);
router.put('/:id', productoController.actualizarProducto);
router.patch('/:id/estado', productoController.cambiarEstadoProducto);
router.patch('/:id/stock', productoController.actualizarStockProducto); // Nueva ruta para actualizar el stock


module.exports = router