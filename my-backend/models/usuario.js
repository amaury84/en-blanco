// models/usuario.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  usser: { type: String, required: true },
  Password: { type: String, required: true }  // 
});

usuarioSchema.methods.toJSON =function(){
  const {__v, ...data} = this.toObject();
  return data;
}

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;

