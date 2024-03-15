# Gerenciador de tarefas
Esta é uma aplicação de gerenciamento de tarefas (Kanban), para usos diversos, que permite adicionar e remover tarefas, assim como alterar os seus status.

## Como executar:
Para instalar as dependências do projeto é necessário primeiro rodar o comando:
```
npm install
```

Crie um arquivo na raíz do projeto com o nome ".env" e coloque nele todo o conteúdo do arquivo "env.example". Neste arquivo estão as credenciais necessárias para executar as operações com o banco de dados.

Inicialize o banco postgreSQL e crie a tabela de tarefas usando os comandos informados no arquivo "database.sql" da pasta "sql". Não se esqueça de usar as credenciais corretas para a criação do banco.

Se quiser, popule a tabela com dados fictícios com os comandos informados no arquivo "mockup_data.sql", também da pasta "sql".

Para inicializar a API rode o seguinte comando no diretório raíz do projeto:
```
node api.js
```
E para rodar a aplicação rode o seguinte comando no diretório da pasta "app":
```
npm start
```

A aplicação irá começar a rodar no endereço: http://localhost:3000/.

## Informações adicionais sobre o projeto:
- No diretório raíz do projeto se encontra a parte relativa ao backend (feito em Node.js), no arquivo "api.js".

- Na pasta "app" se encontra a parte do frontend (feito em React).

- As instruções para a criação do banco PostgreSQL, assim como os dados fictícios utilizados como demonstração para este projeto se encontram nos arquivos contidos na pasta "sql".

- A versão do Node utilizada neste projeto foi a v14.17.6.
