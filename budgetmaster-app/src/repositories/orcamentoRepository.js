const { pool } = require('../app/app');

/* =========================
   LISTAR ORÇAMENTOS
========================= */
exports.listarTodos = async () => {
  const result = await pool.query(`
    SELECT * FROM orcamentos
    WHERE deletado IS NOT TRUE
    ORDER BY id DESC
  `);

  return result.rows.map(r => {
    const valor = Number(r.valor) || 0;
    const custo = Number(r.custo) || 0;

    const lucro = valor - custo;
    const margem = custo > 0 ? (lucro / custo) * 100 : 0;

    return {
      ...r,
      lucro,
      margem
    };
  });
};

/* =========================
   BUSCAR POR ID (ESSENCIAL PRO TESTE)
========================= */
exports.buscarPorId = async (id) => {
  const result = await pool.query(
    `
    SELECT * 
    FROM orcamentos 
    WHERE id = $1 
    AND deletado IS NOT TRUE
    `,
    [id]
  );

  return result.rows[0] || null;
};

/* =========================
   CRIAR ORÇAMENTO
========================= */
exports.criar = async (data) => {
  const { cliente, descricao, valor, custo } = data;

  const result = await pool.query(
    `
    INSERT INTO orcamentos (cliente, descricao, valor, custo, status, deletado)
    VALUES ($1, $2, $3, $4, 'pendente', false)
    RETURNING *
    `,
    [
      cliente,
      descricao,
      Number(valor),
      Number(custo || 0)
    ]
  );

  return result.rows[0];
};

/* =========================
   ATUALIZAR STATUS
========================= */
exports.atualizarStatus = async (id, status) => {
  const validos = ['pendente', 'aprovado', 'recusado'];

  if (!validos.includes(status)) {
    throw new Error('Status inválido');
  }

  const result = await pool.query(
    `
    UPDATE orcamentos
    SET status = $1
    WHERE id = $2
    RETURNING *
    `,
    [status, id]
  );

  return result.rows[0] || null;
};