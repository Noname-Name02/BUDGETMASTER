const orcamentoService = require('../services/orcamentoService');

/* =========================
   CRIAR ORÇAMENTO
========================= */
exports.criar = async (req, res) => {
  try {
    const data = await orcamentoService.criarOrcamento(req.body);

    res.status(201).json(data);
  } catch (err) {
    res.status(err.status || 500).json({
      erro: err.message || 'Erro ao criar orçamento'
    });
  }
};

/* =========================
   LISTAR ATIVOS
========================= */
exports.listar = async (req, res) => {
  try {
    const data = await orcamentoService.listar();
    res.json(data);
  } catch {
    res.status(500).json({ erro: 'Erro ao listar orçamentos' });
  }
};

/* =========================
   LIXEIRA
========================= */
exports.listarApagados = async (req, res) => {
  try {
    const data = await orcamentoService.listarApagados();
    res.json(data);
  } catch {
    res.status(500).json({ erro: 'Erro ao listar lixeira' });
  }
};

/* =========================
   POR ID
========================= */
exports.buscarPorId = async (req, res) => {
  try {
    const data = await orcamentoService.buscarPorId(req.params.id);

    if (!data) {
      return res.status(404).json({ erro: 'Orçamento não encontrado' });
    }

    res.json(data);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar orçamento' });
  }
};

/* =========================
   STATUS
========================= */
exports.atualizarStatus = async (req, res) => {
  try {
    const data = await orcamentoService.atualizarStatus(
      req.params.id,
      req.body.status
    );

    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({
      erro: err.message || 'Erro ao atualizar status'
    });
  }
};

/* =========================
   SOFT DELETE
========================= */
exports.deletar = async (req, res) => {
  try {
    const data = await orcamentoService.deletar(req.params.id);

    res.json({
      mensagem: 'Movido para lixeira',
      item: data
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

/* =========================
   RESTAURAR
========================= */
exports.restaurar = async (req, res) => {
  try {
    const data = await orcamentoService.restaurar(req.params.id);

    res.json({
      mensagem: 'Restaurado com sucesso',
      item: data
    });
  } catch {
    res.status(500).json({ erro: 'Erro ao restaurar orçamento' });
  }
};

/* =========================
   DELETE FINAL
========================= */
exports.deletarPermanente = async (req, res) => {
  try {
    await orcamentoService.deletarPermanente(req.params.id);

    res.json({ mensagem: 'Apagado permanentemente' });
  } catch {
    res.status(500).json({ erro: 'Erro ao deletar orçamento' });
  }
};