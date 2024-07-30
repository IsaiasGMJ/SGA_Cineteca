const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UsuarioSchema = new mongoose.Schema({
    usuario: String,
    password: String,
    tipo: String,
});

UsuarioSchema.methods.generadorJWT = function () {
    return jwt.sign({
        email: this.usuario,
        tipo: this.tipo
    }, 'c0ntr4s3n14');
}

mongoose.model("Usuario", UsuarioSchema);
