const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ClienteSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const Cliente = mongoose.model('Cliente', ClienteSchema);
module.exports = Cliente;