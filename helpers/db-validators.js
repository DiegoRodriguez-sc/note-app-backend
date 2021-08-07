const Note = require("../models/note");
const Usuario = require("../models/usuario");

const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo (${email})  ya existe`);
  }
};

const existeUsuarioPorId = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El usuario con id (${id}) no existe`);
  }
};

const existeNotaPorId = async (id = "") => {
  const existeNotaPorId = await Note.findById(id);
  if (!existeNotaPorId) {
    throw new Error(`La nota con id (${id}) no existe`);
  }
};

module.exports = {
  emailExiste,
  existeNotaPorId,
  existeUsuarioPorId
};
