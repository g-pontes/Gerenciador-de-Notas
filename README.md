# 📓 Gerenciador de Notas com MongoDB e CLI

O **Gerenciador de Notas com MongoDB e CLI** é uma solução simples, elegante e eficiente para gerenciamento de notas via terminal, desenvolvida com **Node.js** e **MongoDB**. Ideal para desenvolvedores e entusiastas que preferem interações rápidas diretamente da linha de comando, o projeto oferece uma interface minimalista com suporte a todas as operações CRUD (Create, Read, Update, Delete) de forma intuitiva e eficaz.

## 🚀 Visão Geral

Este projeto visa proporcionar uma maneira fácil de gerenciar notas diretamente do terminal. Com uma CLI poderosa construída com **Commander.js**, você pode adicionar, editar, listar, buscar e excluir notas em um banco de dados MongoDB, tudo sem sair do terminal. O foco está em simplicidade e produtividade, permitindo que as operações sejam realizadas com poucos comandos.

### 🔧 Tecnologias Utilizadas

- **Node.js**: Plataforma principal para o desenvolvimento do servidor e da CLI.
- **Commander.js**: Utilizada para criar e gerenciar os comandos da interface de linha de comando.
- **MongoDB**: Banco de dados NoSQL usado para armazenar e gerenciar as notas.
- **Mongoose**: ODM (Object Data Modeling) para facilitar a interação com o MongoDB.

## 🌟 Funcionalidades

- 📌 **Criar Notas**: Adicione novas notas com título e descrição diretamente pelo terminal.
- 📜 **Listar Notas**: Veja todas as suas notas de maneira organizada.
- 🔍 **Buscar Notas**: Encontre uma nota específica através do seu ID.
- 🖊️ **Atualizar Notas**: Edite o conteúdo de uma nota já existente de forma rápida.
- 🗑️ **Excluir Notas**: Apague notas indesejadas com um simples comando.

## 📂 Estrutura do Projeto

A organização do projeto foi planejada para ser clara e escalável, seguindo boas práticas de desenvolvimento. Abaixo, a estrutura básica do projeto:

/note-manager │ 
├── /cli # Módulos relacionados à CLI 
│ └── noteCLI.js # Arquivo principal da CLI 
├── /controllers # Controladores que lidam com as regras de negócio 
│ └── noteController.js ├── /models # Definições dos modelos de dados (MongoDB) 
│ └── note.js ├── /config # Configurações do banco de dados e ambiente 
│ └── database.js ├── server.js # Inicialização da aplicação (opcional) 
├── package.json # Definições e dependências do projeto 
└── README.md #

## Documentação do projeto

- **/cli**: Responsável por todas as interações da linha de comando.
- **/controllers**: Gerencia a lógica de criação, atualização, busca e remoção de notas.
- **/models**: Define a estrutura das notas no MongoDB.
- **/config**: Contém as configurações de banco de dados e outras variáveis de ambiente.
- **server.js**: Inicializa um servidor básico, caso queira expandir para uma API no futuro.

## 🛠️ Comandos da CLI

A CLI foi desenvolvida para ser extremamente intuitiva, oferecendo as seguintes funcionalidades:

- **Listar todas as notas**:
  ```bash
  node cli/noteCLI.js listar

  node cli/clienteCLI.js criar -n "João Silva" -e "joao.silva@email.com" -t "123456789"

  node cli/clienteCLI.js atualizar -i <id_da_nota> -n "Carlos Souza" -e "carlos.souza@email.com"

  node cli/clienteCLI.js deletar -i <id_da_nota>
  ```

## 📈 Escalabilidade e Expansão

Este projeto foi desenhado com uma estrutura modular, permitindo que novos recursos sejam adicionados de forma simples e organizada. Você pode facilmente expandi-lo para:

Adicionar novas funcionalidades à CLI, como categorias de notas ou filtros de busca.
Transformar o projeto em uma API com o uso do Express.js.
Integrar autenticação para um gerenciamento seguro das notas.

## Obrigado por conferir este projeto! 😄

Esse formato apresenta o projeto de maneira mais objetiva e profissional, destacando as funcionalidades, tecnologias, e potencial de expansão, sem focar em instruções passo a passo. Assim, ele valoriza a natureza do projeto e atrai contribuições de forma mais aberta.
