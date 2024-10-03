// models/usuario.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

usuarioSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
