const { program } = require('commander');
const mongoose = require('mongoose');
const Cliente = require('../models/cliente'); // Importa o modelo de cliente

// Conectar ao banco de dados
mongoose.connect('mongodb://localhost:27017/meuBancoClientes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
  process.exit(1);
});

// Definindo os comandos da CLI

// Comando para listar clientes
program
  .command('listar') // Nome do comando
  .description('Lista todos os clientes') // Descrição do que o comando faz
  .action(async () => {
    try {
      const clientes = await Cliente.find(); // Busca todos os clientes no banco de dados
      console.log(clientes); // Exibe a lista de clientes
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
    } finally {
      process.exit(); // Encerra o processo
    }
  });

// Comando para criar um novo cliente
program
  .command('criar') // Nome do comando
  .description('Cria um novo cliente') // Descrição do que o comando faz
  .requiredOption('-n, --nome <nome>', 'Nome do cliente') // Parâmetro obrigatório para o nome
  .requiredOption('-e, --email <email>', 'Email do cliente') // Parâmetro obrigatório para o email
  .option('-t, --telefone <telefone>', 'Telefone do cliente') // Parâmetro opcional para o telefone
  .action(async (cmd) => {
    try {
      const novoCliente = new Cliente({
        nome: cmd.nome, // Acessa o valor passado para o parâmetro nome
        email: cmd.email, // Acessa o valor passado para o parâmetro email
        telefone: cmd.telefone // Acessa o valor passado para o parâmetro telefone, se houver
      });
      await novoCliente.save(); // Salva o novo cliente no banco de dados
      console.log('Cliente criado com sucesso:', novoCliente); // Exibe uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao criar cliente:', error); // Mostra um erro caso algo dê errado
    } finally {
      process.exit(); // Encerra o processo
    }
  });

// Parseia os argumentos passados pelo terminal
program.parse(process.argv);
