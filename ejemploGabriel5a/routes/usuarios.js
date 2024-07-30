// Importa el módulo express
var express = require('express');
// Crea un router de Express
var router = express.Router();
// Importa el módulo mongoose
const mongoose = require("mongoose");
// Importa el módulo bcrypt
const bcrypt = require('bcrypt');
// Importa funciones de express-validator
const { body, validationResult } = require("express-validator");
// Importa el modelo Usuario de mongoose
const Usuario = mongoose.model("Usuario");
// Importa el middleware de autenticación JWT
let autentificar = require("../middleware/autentificajwt");

/* GET users listing. */
router.get('/', autentificar, async function (req, res, next) {
  let usu = await Usuario.find({});

  res.send(usu);

});

router.get("/info/:dato", async (req, res) => {
  let usu = await Usuario.findOne({ usuario: req.params.dato });
  if (!usu) {
    return res.status(400).send("Usuario no encontrado");
  }
  res.send({ usu });

});

router.post('/', async (req, res,) => {

  salt = await bcrypt.genSalt(10);
  pass_encritado = await bcrypt.hash(req.body.password, salt);


  let usu_guardado = new Usuario({
    usuario: req.body.usuario,
    password: pass_encritado,
    tipo: req.body.tipo

  });

  await usu_guardado.save().then(() => console.log('meow'));

  res.status(201).send({ usu_guardado });

});



//inicio de session

router.post("/iniciosesion", [
  body("usuario").isEmail().withMessage("El usuario debe ser un email"),
  body("password").isStrongPassword({
    minLength: 5,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  }).withMessage("Se requiere minimo 5 caracteres, uno sea minuscula, uno mayuscula, uno simbolo, uno que sea numero")
], async (req, res) => {

  let error = validationResult(req);


  if (!error.isEmpty()) {
    return res.status(400).send({ errores: error.array() })
  }


  let usu = await Usuario.findOne({ usuario: req.body.usuario });

  if (!usu) {
    return res.status(400).send("Usuario o contrasena incorrecto");
  }

  //if (req.body.password != usu.password){
  if (!await bcrypt.compare(req.body.password, usu.password)) {
    return res.status(400).send("Usuario o contresena incorrectos");
  }

  // let jwtoken = usu.generadorJWT();

  let usu_enviado = {
    msj: "Bienvenido",
    email: usu.usuario,
    jwtoken: usu.generadorJWT()
  };

  res.send({ usu_enviado });
})

//actualizar password @Puma5
router.put("/pass", [
  body("password").isStrongPassword({
    minLength: 5, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1
  })
], autentificar, async (req, res) => {
  let error = validationResult(req);

  if (!error.isEmpty()) {
    returnres.status(400).send({ errores: error.array() })
  }

  let usu = await Usuario.findOne({ usuario: req.body.usuario });

  if (!usu) {
    return res.status.apply(400).send("Usuario no encontrando")
  }

  salt = await bcrypt.genSalt(10);
  pass_cifrado = await bcrypt.hash(req.body.password, salt);

  let usu_modificando = await Usuario.findOneAndUpdate(
    { usuario: req.body.usuario },
    {
      password: pass_cifrado
    },
    { new: true }

  );
  res.send({ usu_modificando })
});

router.put('/', async function (req, res,) {
  let usu = await Usuario.findOne({ usuario: req.body.usuario });

  if (!usu) {
    return res.status.apply(400).send("Usuario no encontrando")
  }

  let usu_modificando = await Usuario.findOneAndUpdate(
    { usuario: req.body.usuario },//campo de referencia
    {
      password: req.body.password,
      tipo: req.body.tipo
    },
    { new: true }
  );

  res.send({ usu_modificando })

});

router.delete('/borrar/:usario', async (req, res,) => {
  let use = await Usuario.findOne({ usuario: req.params.usuario });

  if (!usu) {
    return res.status(400).send("usuario no encontrado");
  }

  let usu_eliminado = await Usuario.findOneAndDelete({ usuario: req.params.usuario });

  res.send({ usu_eliminado });

});

module.exports = router;