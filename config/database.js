const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/meuBancoClientes', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Conectado ao banco de dados MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Finaliza a aplicação se houver erro na conexão
  }

  mongoose.connection.on('disconnected', () => {
    console.log('Desconectado do MongoDB');
  });
};

module.exports = connectDB;