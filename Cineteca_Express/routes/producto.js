const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear un producto
router.post('', async (req, res) => {
    const producto = new Producto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        precio: req.body.precio,
        cantidad: req.body.cantidad
    });
    try {
        const nuevoProducto = await producto.save();
        res.status(201).json(nuevoProducto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Exportar el router
module.exports = router;
