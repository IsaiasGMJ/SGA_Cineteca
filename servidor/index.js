const express = require('express');
const conectarDB = require('./config/database');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Conectar a la base de datos
conectarDB();

// Crear el directorio para imágenes si no existe
const imagePath = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagePath)) {
    fs.mkdirSync(imagePath, { recursive: true });
}

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(require('cors')());

// Servir archivos estáticos (imágenes)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/productos', require('./routes/inventory/productoRoutes'));
app.use('/api/categorias', require('./routes/inventory/categoriaRoutes'));

// Definimos el puerto
const PORT = process.env.PORT || 4000;

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
