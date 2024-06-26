const express = require('express');
const router = express.Router();
const Transaccion = require('../models/transaccion');

// Obtener todas las transacciones
router.get('/', async (req, res) => {
    try {
        const transacciones = await Transaccion.find();
        res.json(transacciones);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear una transacción
router.post('/', async (req, res) => {
    const transaccion = new Transaccion(req.body);
    try {
        const nuevaTransaccion = await transaccion.save();
        res.status(201).json(nuevaTransaccion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar una transacción
router.put('/:id', async (req, res) => {
    try {
        const transaccionActualizada = await Transaccion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(transaccionActualizada);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar una transacción
router.delete('/:id', async (req, res) => {
    try {
        await Transaccion.findByIdAndDelete(req.params.id);
        res.json({ message: 'Transacción eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
