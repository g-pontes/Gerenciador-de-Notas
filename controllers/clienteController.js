const Cliente = require('../models/cliente');
const mongoose = require('mongoose');

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).send(clientes);
  } catch (error) {
    console.error('Erro ao listar clientes!', error);
    res.status(500).send({ message: 'Erro ao listar clientes' });
  }
};

exports.criarCliente = async (req, res) => {
  const cliente = new Cliente(req.body);
  try {
    await cliente.save();
    res.status(201).send({ message: 'Cliente criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar cliente:', error);
    res.status(400).send({ message: 'Falha ao salvar cliente', error });
  }
};

exports.atualizarCliente = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID inválido' });
  }

  try {
    const clienteAtualizado = await Cliente.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!clienteAtualizado) {
      return res.status(404).send({ message: 'Cliente não encontrado' });
    }

    res.status(200).send({ message: 'Cliente atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).send({ message: 'Erro ao atualizar cliente', error });
  }
};

exports.deletarCliente = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID inválido' });
  }

  try {
    const clienteDeletado = await Cliente.findByIdAndDelete(id);

    if (!clienteDeletado) {
      return res.status(404).send({ message: 'Cliente não encontrado' });
    }

    res.status(200).send({ message: 'Cliente deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).send({ message: 'Erro ao deletar cliente', error });
  }
};