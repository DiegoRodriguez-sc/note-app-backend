const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");


const validarJWT = async(req = request, res = response, next) =>{

  const token = req.header("x-token");
  if(!token){
   return res.status(401).json({
     msg:"No hay token en la peticion"
   });
  }
  try {
    const {uid} =  jwt.verify(token,process.env.SECRETORPRIVATEKEY);
    
    const usuario = await Usuario.findById(uid);

    // usuario no existe db

    if(!usuario){
     return res.status(401).json({
      status:false,
      msg:"token no valido"
    })
    }
    const {_id, name, email, ...user} = usuario;
    user.uid = _id;
    user.name = name;
    user.email= email;
    
    req.usuario = user;
    
    next();
  } catch (error) {
     console.log(error);
     res.status(401).json({
      msg:"token no valido"
     })
  }

}


module.exports={
 validarJWT
}