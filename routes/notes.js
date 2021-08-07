const { Router } = require("express");
const { check } = require("express-validator");
const { getNotes, postNote, updateNote, deleteNote } = require("../controllers/notes");
const { existeNotaPorId, existeUsuarioPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

// obtener notas 
router.get("/:id",
  [
   check("id","El id no es de mongo").isMongoId(),
   check("id").custom(existeUsuarioPorId),
   validarJWT,
   validarCampos
  ],getNotes);

// crear nota
router.post("/",
  [
    check('date', 'La fecha es obligatoria').not().isEmpty(),
    validarJWT,
    validarCampos
  ],postNote);

// actualizar nota
router.put("/:id",
  [
    check("id","El id no es de mongo").isMongoId(),
    check('id').custom( existeNotaPorId ),
    validarJWT,
    validarCampos
  ],updateNote);

router.delete("/:id",
  [
    check("id","El id no es de mongo").isMongoId(),
    check('id').custom( existeNotaPorId ),
    validarJWT,
    validarCampos
  ],deleteNote);


module.exports=router;