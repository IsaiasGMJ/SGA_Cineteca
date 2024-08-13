const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para categorías
const storageCategorias = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/categorias'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilterCategorias = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb('Error: Solo imágenes (jpeg, jpg, png, gif)');
    }
};

const uploadCategorias = multer({
    storage: storageCategorias,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    fileFilter: fileFilterCategorias
});

// Rutas para categorías
router.get('/', categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCategoria);
router.post('/', uploadCategorias.single('imagen'), categoriaController.crearCategoria);
router.put('/:id', uploadCategorias.single('imagen'), categoriaController.actualizarCategoria);

module.exports = router;
