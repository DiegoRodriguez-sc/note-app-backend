
const {Schema, model} = require("mongoose");

const UsuarioSchema = Schema({
    name:{
      type: String,
      required:[true, "El nombre es obligatorio"]
    },
    email:{
      type:String,
      required:[true, "El correo es obligatorio"],
      unique:true
    },
    password:{
      type:String,
      required:[true, "La contraseña es obligatorio"]
    }
});

UsuarioSchema.methods.toJSON = function(){
  const { __v, password, _id, ...newUsuario} = this.toObject();
  newUsuario.uid = _id;
  return newUsuario;
}

module.exports = model("Usuario",UsuarioSchema);