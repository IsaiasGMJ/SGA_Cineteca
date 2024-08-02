const path = require('path');
const fs = require('fs');
const Producto = require('../../models/inventory/producto');

// Obtener un producto por ID
exports.obtenerProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id).populate('categoria');

        if (!producto) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find({ estado: 'activo' }).populate('categoria');
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, categoria, precio, cantidad, descripcion } = req.body;

        // Imprimir req.body para depuración
        console.log('req.body:', req.body);
        console.log('req.files:', req.files);

        // Validar datos requeridos
        if (!nombre) {
            return res.status(400).json({ msg: 'El nombre es requerido' });
        }
        if (!categoria) {
            return res.status(400).json({ msg: 'La categoría es requerida' });
        }
        if (!precio) {
            return res.status(400).json({ msg: 'El precio es requerido' });
        }
        if (cantidad === undefined) {
            return res.status(400).json({ msg: 'La cantidad es requerida' });
        }

        let imagenPath;
        // Manejar la carga de la imagen si está presente
        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            const uploadPath = path.join(__dirname, '../../public/images/productos', imagen.name);
            imagen.mv(uploadPath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Hubo un error al subir la imagen');
                }
            });
            imagenPath = `/public/images/productos/${imagen.name}`;
        }

        // Crear un nuevo producto
        const producto = new Producto({
            nombre,
            categoria,
            precio,
            descripcion,
            imagen: imagenPath,
            cantidad,
            estado: cantidad > 0 ? 'activo' : 'agotado'
        });

        await producto.save();

        res.status(201).send(producto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

// Actualizar un producto existente
exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, categoria, precio, descripcion, cantidad } = req.body;
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            const uploadPath = path.join(__dirname, '../../public/images/productos', imagen.name);
            imagen.mv(uploadPath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Hubo un error al subir la imagen');
                }
            });
            producto.imagen = `/public/images/productos/${imagen.name}`;
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.precio = precio;
        producto.descripcion = descripcion;
        producto.cantidad = cantidad;

        producto.estado = cantidad > 0 ? 'activo' : 'agotado';

        producto = await Producto.findByIdAndUpdate({ _id: req.params.id }, producto, { new: true }).populate('categoria');
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

// Actualizar el estado de un producto
exports.cambiarEstadoProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        producto.estado = req.body.estado || 'inactivo';

        producto = await Producto.findByIdAndUpdate({ _id: req.params.id }, producto, { new: true }).populate('categoria');
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

// Actualizar el stock de un producto
exports.actualizarStockProducto = async (req, res) => {
    try {
        const { cantidad } = req.body;
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        producto.cantidad += cantidad;

        if (producto.cantidad < 0) {
            return res.status(400).json({ msg: 'La cantidad no puede ser negativa' });
        }

        producto.estado = producto.cantidad === 0 ? 'agotado' : 'activo';

        producto = await Producto.findByIdAndUpdate({ _id: req.params.id }, producto, { new: true }).populate('categoria');
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};
