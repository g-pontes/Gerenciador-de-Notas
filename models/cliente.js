const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: String,
});

const Cliente = mongoose.model('Cliente', ClienteSchema);
module.exports = Cliente;