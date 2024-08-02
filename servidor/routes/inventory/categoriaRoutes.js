const express = require('express');
const router = express.Router();
const categoriaController = require('../../controllers/inventory/categoriaController');
const upload = require('../../config/multer'); // Ajusta el path según tu estructura de proyecto

router.post('/', upload.single('imagen'), categoriaController.crearCategoria);
router.get('/', categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCategoria);
router.put('/:id', upload.single('imagen'), categoriaController.actualizarCategoria);
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
