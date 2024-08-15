const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas para usuarios
router.get('/:id', userController.obtenerUsuario);  // Ruta corregida
router.get('/', userController.obtenerUsuarios);  // Ruta corregida
router.post('/', userController.crearUsuario);
router.put('/:id', userController.actualizarEmailYRole);
router.put('/:id/password', userController.actualizarPassword);
router.delete('/:id', userController.eliminarUsuario);

module.exports = router;
