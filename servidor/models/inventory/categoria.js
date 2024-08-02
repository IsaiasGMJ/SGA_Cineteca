const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: false
    },
    imagen: {
        type: String,
        required: false
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
}, { collection: 'categorias' });

module.exports = mongoose.model('Categoria', CategoriaSchema);
