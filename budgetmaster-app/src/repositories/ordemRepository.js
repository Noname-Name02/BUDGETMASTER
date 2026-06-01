const { pool } = require('../app/app');

/* =========================
   CRIAR ORDEM
========================= */
exports.criar = async (orcamento_id) => {
  const result = await pool.query(
    `
    INSERT INTO ordens (orcamento_id, status)
    VALUES ($1, 'em_andamento')
    RETURNING *
    `,
    [orcamento_id]
  );

  return result.rows[0];
};

/* =========================
   LISTAR ORDENS
========================= */
exports.listarTodos = async () => {
  const result = await pool.query(`
    SELECT * FROM ordens
    ORDER BY id DESC
  `);

  return result.rows;
};

/* =========================
   BUSCAR POR ID (IMPORTANTE)
========================= */
exports.buscarPorId = async (id) => {
  const result = await pool.query(
    `
    SELECT * 
    FROM ordens 
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] || null;
};

/* =========================
   ATUALIZAR STATUS
========================= */
exports.atualizarStatus = async (id, status) => {
  const validos = ['em_andamento', 'finalizado'];

  if (!validos.includes(status)) {
    throw new Error('Status inválido');
  }

  const result = await pool.query(
    `
    UPDATE ordens
    SET status = $1
    WHERE id = $2
    RETURNING *
    `,
    [status, id]
  );

  return result.rows[0] || null;
};

/* =========================
   DELETAR
========================= */
exports.deletar = async (id) => {
  const result = await pool.query(
    `DELETE FROM ordens WHERE id = $1`,
    [id]
  );

  return result.rowCount > 0;
};