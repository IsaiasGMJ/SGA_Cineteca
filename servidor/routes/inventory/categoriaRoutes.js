const express = require('express');
const router = express.Router();
const categoriaController = require('../../controllers/inventory/categoriaController');

// Rutas para manejar categorías
router.post('/', categoriaController.crearCategoria);
router.get('/', categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCategoria);
router.put('/:id', categoriaController.actualizarCategoria);
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
