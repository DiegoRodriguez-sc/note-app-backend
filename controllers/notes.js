const { response, request } = require("express");
const Note = require("../models/note");

const getNotes = async (req = request, res = response) => {
   const { id } = req.params;

   try {
      const { uid } = req.usuario;

      if (id.toString() === uid.toString()) {
         const notes = await Note.find({
         usuario: id,
         });

         return res.status(200).json({
         status: true,
         results: notes,
         });
      } else {
         return res.status(401).json({
         status: false,
         msg: "No esta autorizado para hacer eso",
         });
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({
         status: false,
         msg: "hable con el administrador",
      });
   }
};



const postNote = async (req = request, res = response) => {
   const { usuario, ...nota } = req.body;
   const { uid } = req.usuario;

   try {
      const data = {
         ...nota,
         usuario: uid,
      };

      const notadb = new Note(data);
      await notadb.save();

      res.status(201).json({
         status: true,
         msg: "nota creada",
         nota:notadb,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         status: false,
         msg: "hable con el administrador",
      });
   }
};

const updateNote = async (req = request, res = response) => {
  const { usuario, ...nota } = req.body;
  const { id } = req.params;
  const { uid } = req.usuario;

  try {
    const data = {
      ...nota,
      usuario: uid,
    };

    const noteUpdate = await Note.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(201).json({
      status: true,
      msg:"nota actualizada",
      nota:noteUpdate
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteNote = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await Note.findByIdAndDelete(id);

    res.status(201).json({
      status: true,
      msg: "Nota Borrada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: "Hable con el administrador",
    });
  }
};

// crear usuario

module.exports = {
  getNotes,
  postNote,
  updateNote,
  deleteNote,
};
