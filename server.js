const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configurando o body-parser para lidar com JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meuBancoClientes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Verificando a conexãox'
mongoose.connection.on('connected', () => {
  console.log('Conectado ao banco de dados MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Desconectado do MongoDB');
});

const Cliente = require('./models/cliente');


app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).send(clientes);
  } catch (error) {
    console.error('deu erroooo', error);
  }
  res.status(500)
});

app.post('/clientes', async (req, res) => {
  const cliente = new Cliente(req.body);
  try {
    await cliente.save();
    res.status(201).send(cliente);
  } catch (error) {
    console.error('Erro ao salvar cliente:', error); // Log detalhado
    res.status(400).send({ message: 'Falha ao salvar cliente', error });
  }
});


app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;

  // Verifica se o ID é válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID inválido' });
  }

  try {
    const clienteAtualizado = await Cliente.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // 'new: true' retorna o cliente atualizado
    );

    // Verifica se o cliente foi encontrado
    if (!clienteAtualizado) {
      return res.status(404).send({ message: 'Cliente não encontrado' });
    }

    res.status(200).send(clienteAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).send({ message: 'Erro ao atualizar cliente', error });
  }
});

// Definindo a porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
