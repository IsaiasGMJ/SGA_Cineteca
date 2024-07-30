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
        if (!req.body.nombre || !req.body.categoria || !req.body.precio || req.body.cantidad === undefined) {
            return res.status(400).send('Faltan datos requeridos');
        }

        const producto = new Producto({
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
            cantidad: req.body.cantidad
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
        const { nombre, categoria, precio, descripcion, imagen, cantidad } = req.body;
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.precio = precio;
        producto.descripcion = descripcion;
        producto.imagen = imagen;
        producto.cantidad = cantidad;

        if (cantidad === 0) {
            producto.estado = 'agotado';
        } else {
            producto.estado = 'activo';
        }

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

        if (producto.cantidad === 0) {
            producto.estado = 'agotado';
        } else {
            producto.estado = 'activo';
        }

        producto = await Producto.findByIdAndUpdate({ _id: req.params.id }, producto, { new: true }).populate('categoria');
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};
