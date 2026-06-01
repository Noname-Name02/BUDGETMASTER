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

// exporta pool para repositories
module.exports.pool = pool;

/* =========================
   FRONTEND
========================= */

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

/* =========================
   API ORÇAMENTOS
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
      VALUES ($1, $2, $3, $4, 'pendente', false)
      RETURNING *
    `, [
      cliente.trim(),
      descricao.trim(),
      Number(valor),
      Number(custo || 0)
    ]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.put('/orcamentos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const status = req.body.status;

    const permitidos = ['pendente', 'aprovado', 'recusado'];

    if (!permitidos.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido' });
    }

    const result = await pool.query(`
      UPDATE orcamentos
      SET status = $1
      WHERE id = $2
      RETURNING *
    `, [status, id]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.delete('/orcamentos/:id', async (req, res) => {
  try {
    const result = await pool.query(`
      UPDATE orcamentos
      SET deletado = true
      WHERE id = $1
      RETURNING *
    `, [req.params.id]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.put('/orcamentos/:id/restaurar', async (req, res) => {
  try {
    const result = await pool.query(`
      UPDATE orcamentos
      SET deletado = false
      WHERE id = $1
      RETURNING *
    `, [req.params.id]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.delete('/orcamentos/:id/permanente', async (req, res) => {
  try {
    await pool.query(`DELETE FROM orcamentos WHERE id = $1`, [req.params.id]);
    res.json({ mensagem: 'Excluído permanentemente' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = app;