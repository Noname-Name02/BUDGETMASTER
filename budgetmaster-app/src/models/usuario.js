const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true // ( createdAt e updatedAt automático )
  }
);

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;