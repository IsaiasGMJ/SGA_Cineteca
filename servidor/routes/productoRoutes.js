const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para productos
const storageProductos = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/productos'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilterProductos = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb('Error: Solo imágenes (jpeg, jpg, png, gif)');
    }
};

const uploadProductos = multer({
    storage: storageProductos,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    fileFilter: fileFilterProductos
});

// Rutas para productos
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProducto);
router.post('/', uploadProductos.single('imagen'), productoController.crearProducto);
router.put('/:id', uploadProductos.single('imagen'), productoController.actualizarProducto);
router.patch('/:id/estado', productoController.cambiarEstadoProducto);
router.patch('/stock/:id', productoController.actualizarStockProducto);
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;
