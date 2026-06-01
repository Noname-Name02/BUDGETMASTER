const repo = require('../repositories/orcamentoRepository');

/* =========================
   CRIAR ORÇAMENTO
========================= */
exports.criarOrcamento = async (data) => {

  const valor = Number(data.valor) || 0;
  const custo = Number(data.custo) || 0;

  if (!data.cliente) {
    throw { status: 400, message: 'Cliente obrigatório' };
  }

  if (!data.descricao) {
    throw { status: 400, message: 'Descrição obrigatória' };
  }

  if (valor <= 0) {
    throw { status: 400, message: 'Valor inválido' };
  }

  if (custo < 0) {
    throw { status: 400, message: 'Custo inválido' };
  }

  const lucro = valor - custo;

  const margem = custo > 0
    ? (lucro / custo) * 100
    : 0;

  console.log("DEBUG:", { valor, custo, lucro, margem });

  return await repo.salvar({
    cliente: data.cliente,
    descricao: data.descricao,
    valor,
    custo,
    lucro,
    margem,
    status: 'pendente'
  });
};

/* =========================
   LISTAR
========================= */
exports.listar = () => repo.listarTodos();

/* =========================
   LIXEIRA
========================= */
exports.listarApagados = () => repo.listarLixeira();

/* =========================
   STATUS
========================= */
exports.atualizarStatus = (id, status) =>
  repo.atualizarStatus(id, status);

/* =========================
   DELETE
========================= */
exports.deletar = (id) => repo.deletar(id);

/* =========================
   RESTAURAR
========================= */
exports.restaurar = (id) => repo.restaurar(id);

/* =========================
   DELETE FINAL
========================= */
exports.deletarPermanente = (id) =>
  repo.deletarPermanente(id);