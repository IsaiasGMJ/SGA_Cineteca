const express = require('express');
const conectarDB = require('./config/database');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const cors = require('cors');
const https = require('https');

const app = express();
dotenv.config();

// Conectar a la base de datos
conectarDB();

// Crear los directorios para imágenes si no existen
const categoriaImagePath = path.join(__dirname, 'public', 'images', 'categorias');
const productoImagePath = path.join(__dirname, 'public', 'images', 'productos');

if (!fs.existsSync(productoImagePath)) {
    fs.mkdirSync(productoImagePath, { recursive: true });
}

if (!fs.existsSync(categoriaImagePath)) {
    fs.mkdirSync(categoriaImagePath, { recursive: true });
}

// Servir archivos estáticos (imágenes)
app.use('/images/categorias', express.static(categoriaImagePath));
app.use('/images/productos', express.static(productoImagePath));

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/usuarios', require('./routes/userRoutes'));
app.use('/api/carrito', require('./routes/ventaRoutes'));

const ventaRoutes = require('./routes/ventaRoutes');
app.use('/api/ventas', ventaRoutes);

// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send(`Hola mundo desde el puerto 4001 con certificación autoSSL ${PUERTO}`);
    console.log('Petición GET para ejemplo');
});

// Definimos el puerto
const PORT = process.env.PORT || 4000;
const PUERTO_HTTPS = 4001;

// Inicia el servidor HTTPS con el certificado SSL autofirmado
https.createServer({
    cert: fs.readFileSync('server.cer'),
    key: fs.readFileSync('server.key')
}, app).listen(PUERTO_HTTPS, () => {
    console.log(`Servidor HTTPS en el puerto ${PUERTO_HTTPS}`);
});

// Inicia el servidor HTTP (opcional si no se requiere HTTPS en todas las rutas)
app.listen(PORT, () => {
    console.log(`El servidor HTTP está corriendo en el puerto ${PORT}`);
});
