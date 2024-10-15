const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database'); // Importa a conexão com o DB
const clienteRoutes = require('./router/clienteRoutes'); // Importa as rotas de cliente

const app = express();

// Conectar ao banco de dados
connectDB();

// Configurações do Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usar as rotas de clientes
app.use('/clientes', clienteRoutes);

// Inicializar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
