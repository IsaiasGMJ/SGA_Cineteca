const express = require('express');
const conectarDB = require('./config/database');
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar PUG
// app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/productos', require('./routes/inventory/productoRoutes'));
app.use('/api/categorias', require('./routes/inventory/categoriaRoutes'));

// Definimos el puerto
const PORT = 4000;

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
