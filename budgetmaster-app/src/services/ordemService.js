const repo = require('../repositories/ordemRepository');
const orcamentoRepo = require('../repositories/orcamentoRepository');

/* =========================
   CRIAR ORDEM
========================= */
exports.criarOrdem = async (orcamento_id) => {
  if (!orcamento_id) {
    throw { status: 400, message: 'Orçamento obrigatório' };
  }

  const orcamento = await orcamentoRepo.buscarPorId(orcamento_id);

  if (!orcamento) {
    throw { status: 404, message: 'Orçamento não encontrado' };
  }

  if (orcamento.status !== 'aprovado') {
    throw {
      status: 400,
      message: 'Orçamento precisa estar aprovado'
    };
  }

  return await repo.criar(orcamento_id);
};