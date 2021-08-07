
const {Schema, model} = require("mongoose");

const NoteSchema = Schema({
    title:{
      type: String,
    },
    body:{
      type:String,
    },
    img:{
      type:String
    },
    date:{
     type:Number,
     required:[true, "La fecha es obligatoria"]
    },
    usuario: {
     type: Schema.Types.ObjectId,
     ref: "Usuario",
     required: true,
   },
});

NoteSchema.methods.toJSON = function(){
  const { __v, _id, usuario, ...notes} = this.toObject();
  notes.id = _id;
  return notes;
}

module.exports = model("Note",NoteSchema);