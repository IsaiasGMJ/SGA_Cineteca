const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transaccionSchema = new Schema({
    tipo_transaccion: { type: String, required: true },
    monto: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    detalles: {
        productos: [
            {
                producto_id: { type: Schema.Types.ObjectId, ref: 'Producto' },
                cantidad: Number,
                precio_unitario: Number,
                total: Number
            }
        ],
        metodo_pago: String,
        descuento: Number,
        total_final: Number
    },
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Transaccion', transaccionSchema);
