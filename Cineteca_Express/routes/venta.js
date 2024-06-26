const express = require('express');
const router = express.Router();
const Venta = require('../models/venta');

// Obtener todas las ventas
router.get('/', async (req, res) => {
    try {
        const ventas = await Venta.find();
        res.json(ventas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear una venta
router.post('/', async (req, res) => {
    const venta = new Venta(req.body);
    try {
        const nuevaVenta = await venta.save();
        res.status(201).json(nuevaVenta);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar una venta
router.put('/:id', async (req, res) => {
    try {
        const ventaActualizada = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(ventaActualizada);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar una venta
router.delete('/:id', async (req, res) => {
    try {
        await Venta.findByIdAndDelete(req.params.id);
        res.json({ message: 'Venta eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
