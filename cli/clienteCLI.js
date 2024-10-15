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
        nome: cmd.nome,
        email: cmd.email,
        telefone: cmd.telefone
      });
      await novoCliente.save(); // Salva o novo cliente no banco de dados
      console.log('Cliente criado com sucesso:', novoCliente);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    } finally {
      process.exit(); // Encerra o processo
    }
  });

// Comando para atualizar um cliente existente
program
  .command('atualizar') // Nome do comando
  .description('Atualiza um cliente existente') // Descrição do que o comando faz
  .requiredOption('-i, --id <id>', 'ID do cliente a ser atualizado') // ID do cliente a ser atualizado
  .option('-n, --nome <nome>', 'Novo nome do cliente') // Parâmetro opcional para o nome
  .option('-e, --email <email>', 'Novo email do cliente') // Parâmetro opcional para o email
  .option('-t, --telefone <telefone>', 'Novo telefone do cliente') // Parâmetro opcional para o telefone
  .action(async (cmd) => {
    const { id, nome, email, telefone } = cmd;

    // Verifica se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID inválido');
      return process.exit(1);
    }

    try {
      const clienteAtualizado = await Cliente.findByIdAndUpdate(
        id,
        { nome, email, telefone },
        { new: true, runValidators: true }
      );

      if (!clienteAtualizado) {
        console.error('Cliente não encontrado');
        return process.exit(1);
      }

      console.log('Cliente atualizado com sucesso:', clienteAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    } finally {
      process.exit(); // Encerra o processo
    }
  });

// Comando para deletar um cliente
program
  .command('deletar') // Nome do comando
  .description('Deleta um cliente existente') // Descrição do que o comando faz
  .requiredOption('-i, --id <id>', 'ID do cliente a ser deletado') // ID do cliente a ser deletado
  .action(async (cmd) => {
    const { id } = cmd;

    // Verifica se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID inválido');
      return process.exit(1);
    }

    try {
      const clienteDeletado = await Cliente.findByIdAndDelete(id);

      if (!clienteDeletado) {
        console.error('Cliente não encontrado');
        return process.exit(1);
      }

      console.log('Cliente deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    } finally {
      process.exit(); // Encerra o processo
    }
  });

// Parseia os argumentos passados pelo terminal
program.parse(process.argv);
