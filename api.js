const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3001;

const pool = new Pool({
    user: process.env.DB_USER, // Meu usuário no banco postgresql
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE, // Nome do meu banco postgresql
    password: process.env.DB_PASSWORD, // Minha senha no banco postgresql
    port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

// Rotas para gerenciamento do kanban

// Rota para buscar as tasks existentes
app.get('/tasks', async (req, res) => {

    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar tasks' });
    }
});

// Rota para inserir novas tasks no banco
app.post('/tasks', async (req, res) => {
    const { name, description } = req.body;
    
    // Verifica se o nome está vazio
    if (!name) {
        return res.status(400).json({ error: 'É obrigatório preencher o nome da task.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO tasks (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao adicionar task' });
    }
});

// Rota para alterar o status de uma tarefa
app.put('/tasks/:id/status', async (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
        [status, taskId]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Task não encontrada.' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar status da task.' });
    }
});

// Rota para deletar uma tarefa do banco pelo ID
app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [taskId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task não encontrada.' });
        }
    
        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar task.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});