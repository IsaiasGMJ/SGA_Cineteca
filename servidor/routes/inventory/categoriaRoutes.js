const express = require('express');
const router = express.Router();
const categoriaController = require('../../controllers/inventory/categoriaController');
const multer = require('multer');
const path = require('path');

// Configurar multer para guardar las imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../public/images/categorias'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Agregar una marca de tiempo al nombre del archivo
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('imagen'), categoriaController.crearCategoria);
router.put('/:id', upload.single('imagen'), categoriaController.actualizarCategoria);
router.get('/', categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCategoria);
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
