const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Ajustado para o caminho que aparece na sua imagem:
const Tarefa = require('./backend/models/Tarefa'); 

const app = express();

app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas conectado'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

// Rotas da API
app.post('/tarefas', async (req, res) => {
  const t = await Tarefa.create(req.body);
  res.json(t);
});

app.get('/tarefas', async (req, res) => {
  const t = await Tarefa.find();
  res.json(t);
});

app.put('/tarefas/:id', async (req, res) => {
  const t = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(t);
});

app.delete('/tarefas/:id', async (req, res) => {
  await Tarefa.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));