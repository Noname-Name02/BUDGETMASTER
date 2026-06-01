const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   BANCO
========================= */
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '7931',
  database: process.env.DB_NAME || 'budgetdb',
  port: process.env.DB_PORT || 5432,
});

/* =========================
   FRONTEND
========================= */
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

/* =========================
   ROTAS ORÇAMENTOS
========================= */
app.get('/orcamentos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM orcamentos
      WHERE deletado IS NOT TRUE
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.post('/orcamentos', async (req, res) => {
  try {
    const { cliente, descricao, valor, custo } = req.body;

    if (!cliente || !descricao || !valor) {
      return res.status(400).json({ erro: 'Campos obrigatórios' });
    }

    const result = await pool.query(`
      INSERT INTO orcamentos (cliente, descricao, valor, custo, status, deletado)
      VALUES ($1, $2, $3, $4, $5, false)
      RETURNING *
    `, [
      cliente.trim(),
      descricao.trim(),
      Number(valor),
      Number(custo || 0),
      'pendente'
    ]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

/* =========================
   EXPORTAÇÃO CORRETA
========================= */
module.exports = {
  app,
  pool
};