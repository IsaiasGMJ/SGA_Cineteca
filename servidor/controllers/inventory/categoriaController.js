const Categoria = require('../../models/inventory/categoria');
const path = require('path');
const fs = require('fs');

// Crear nueva categoría con imagen
exports.crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        // Verificar si la categoría ya existe
        let categoriaExistente = await Categoria.findOne({ nombre });
        if (categoriaExistente) {
            return res.status(400).json({ msg: 'La categoría ya existe' });
        }

        let imagenPath;
        // Manejar la carga de la imagen si está presente
        if (req.file) {
            imagenPath = `/public/images/categorias/${req.file.filename}`;
        }

        // Crear nueva categoría
        const categoria = new Categoria({
            nombre,
            descripcion,
            imagen: imagenPath
        });
        await categoria.save();

        res.status(201).json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

// Obtener todas las categorías
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

// Obtener una categoría por ID
exports.obtenerCategoria = async (req, res) => {
    try {
        let categoria = await Categoria.findById(req.params.id);

        if (!categoria) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }

        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

// Actualizar una categoría con imagen
exports.actualizarCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        let categoria = await Categoria.findById(req.params.id);

        if (!categoria) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }

        if (req.file) {
            // Eliminar la imagen anterior si existe
            if (categoria.imagen) {
                const oldPath = path.join(__dirname, '../../../', categoria.imagen);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            categoria.imagen = `/public/images/categorias/${req.file.filename}`;
        }

        categoria.nombre = nombre || categoria.nombre;
        categoria.descripcion = descripcion || categoria.descripcion;

        categoria = await Categoria.findByIdAndUpdate({ _id: req.params.id }, categoria, {
            new: true
        });

        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

// Eliminar una categoría
exports.eliminarCategoria = async (req, res) => {
    try {
        let categoria = await Categoria.findById(req.params.id);

        if (!categoria) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }

        // Eliminar la imagen si existe
        if (categoria.imagen) {
            const imagePath = path.join(__dirname, '../../../', categoria.imagen);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Categoria.findByIdAndDelete({ _id: req.params.id });
        res.json({ msg: 'Categoría eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};
