// controllers/ventaController.js
const Cart = require('../models/cart');
const Product = require('../models/producto');
const User = require('../models/user');
const Sale = require('../models/venta');

// Añadir producto al carrito
exports.agregarProducto = async (req, res) => {
    try {
        const { userId, productoId, cantidad } = req.body;

        // Verificar si el usuario existe
        const usuario = await User.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el producto existe
        const producto = await Product.findById(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Verificar si hay suficiente cantidad en inventario
        if (producto.cantidad < cantidad) {
            return res.status(400).json({ message: 'No hay suficiente cantidad disponible' });
        }

        // Encontrar o crear el carrito para el usuario
        let carrito = await Cart.findOne({ user: userId });
        if (!carrito) {
            carrito = new Cart({ user: userId, items: [] });
        }

        // Verificar si el producto ya está en el carrito
        const itemIndex = carrito.items.findIndex(item => item.product.toString() === productoId);
        if (itemIndex > -1) {
            carrito.items[itemIndex].quantity += cantidad;
        } else {
            carrito.items.push({ product: productoId, quantity: cantidad });
        }

        await carrito.save();
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ver el carrito del usuario
exports.verCarrito = async (req, res) => {
    try {
        const { userId } = req.params;

        const carrito = await Cart.findOne({ user: userId }).populate('items.product');
        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar producto del carrito
exports.eliminarProducto = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const carrito = await Cart.findOne({ user: userId });
        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Filtrar el producto del carrito
        carrito.items = carrito.items.filter(item => item.product.toString() !== productId);
        await carrito.save();
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// controllers/ventaController.js
exports.realizarVenta = async (req, res) => {
    try {
        const { userId } = req.body;

        // Verificar si el carrito existe para el usuario
        const carrito = await Cart.findOne({ user: userId }).populate('items.product');
        if (!carrito || carrito.items.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }

        // Calcular el total
        const total = (await Promise.all(
            carrito.items.map(async item => {
                const producto = await Product.findById(item.product);
                return producto.precio * item.quantity; // Cambié price a precio para que coincida con el modelo de Producto
            })
        )).reduce((acc, cur) => acc + cur, 0);

        // Crear la venta
        const venta = new Sale({
            user: userId,
            items: carrito.items,
            total
        });
        await venta.save();

        // Actualizar el inventario después de la venta
        await Promise.all(
            carrito.items.map(async item => {
                const producto = await Product.findById(item.product);
                producto.cantidad -= item.quantity;
                if (producto.cantidad < 0) producto.cantidad = 0; // Para evitar cantidad negativa
                await producto.save();
            })
        );

        // Vaciar el carrito
        await Cart.deleteOne({ user: userId });

        res.status(201).json({ message: 'Venta realizada con éxito', venta });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las ventas
exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Sale.find().populate('user').populate('items.product');
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una venta específica
exports.obtenerVentaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const venta = await Sale.findById(id).populate('user').populate('items.product');
        if (!venta) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
