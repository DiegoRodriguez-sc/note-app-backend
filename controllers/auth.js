const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const loginUsuario = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // verificar si el correo existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        status:false,
        msg: `El ususario ${email} no existe `,
      });
    }

    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        status:false,
        msg: "El usuario | password no son correctos ",
      });
    }

    // generar el jwt
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(200).json({
      status:true,
      token,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status:false,
      msg: "hable con el administrador",
    });
  }
};

// crear usuario
const crearUsuario = async (req = request, res = response) => {
  const { name, email, password } = req.body;
  const usuario = new Usuario({ name, email, password });

  // encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // guardar en db HeroApp
  await usuario.save();

  res.json({
    status:true,
    message: "Usuario creado",
  });
};

const revalidarTWJ = async (req = request, res = response) => {

  const { uid, name } = req.usuario;

  // generar un nuevo token
  const token = await generarJWT(uid, name);
 
  res.json({
    status:true,
    _id,
    name,
    token,
  });
};

module.exports = {
  loginUsuario,
  crearUsuario,
  revalidarTWJ,
};
