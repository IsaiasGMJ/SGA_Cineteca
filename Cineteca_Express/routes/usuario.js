const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear un usuario
router.post('/', async (req, res) => {
    const usuario = new Usuario(req.body);
    try {
        const nuevoUsuario = await usuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(usuarioActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
