-- Cria o banco de dados facilita_juridico, caso ele não exista
CREATE DATABASE IF NOT EXISTS kanban;

-- Seleciona o banco de dados facilita_juridico
\c kanban;

-- Remove a tabela de tarefas, caso ela já exista
DROP TABLE IF EXISTS tasks;

CREATE TYPE task_status AS ENUM ('to_do', 'doing', 'done');

-- Cria a tabela de tarefas
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(500),
  status task_status NOT NULL DEFAULT 'to_do',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
