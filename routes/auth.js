const { Router } = require("express");
const { check } = require("express-validator");
const { loginUsuario, crearUsuario, revalidarTWJ } = require("../controllers/auth");
const { emailExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

router.post("/login", [
  check('email',   'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('password', 'El password debe contener al menos 6 letras').isLength({ min: 6 }),
  validarCampos
], loginUsuario );


router.post(
  "/new",
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener al menos 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExiste),
    validarCampos
  ],
  crearUsuario
);

router.get("/renew",[
  validarJWT
],revalidarTWJ);


module.exports=router;