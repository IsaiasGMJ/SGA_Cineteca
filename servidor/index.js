const express = require('express');
const conectarDB = require('./config/database');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const cors = require('cors');

dotenv.config();

const app = express();

// Conectar a la base de datos
conectarDB();

// Crear los directorios para imágenes si no existen
const categoriaImagePath = path.join(__dirname, 'public', 'images', 'categorias');
if (!fs.existsSync(categoriaImagePath)) {
    fs.mkdirSync(categoriaImagePath, { recursive: true });
}
const productoImagePath = path.join(__dirname, 'public', 'images', 'productos');
if (!fs.existsSync(productoImagePath)) {
    fs.mkdirSync(productoImagePath, { recursive: true });
}

// Middleware para parsear JSON
app.use(express.json());

// Middleware para manejar uploads de archivos
app.use(fileUpload());

// Habilitar CORS
app.use(cors());

// Servir archivos estáticos (imágenes)
app.use('/public/categorias', express.static(categoriaImagePath));
app.use('/public/productos', express.static(productoImagePath));

// Rutas
app.use('/api/productos', require('./routes/inventory/productoRoutes'));
app.use('/api/categorias', require('./routes/inventory/categoriaRoutes'));

// Definimos el puerto
const PORT = process.env.PORT || 4000;

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
