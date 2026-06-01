const ordemService = require('../services/ordemService');

/* =========================
   CRIAR ORDEM
========================= */
exports.criar = async (req, res) => {
  try {
    const ordem = await ordemService.criarOrdem(req.body);

    res.status(201).json(ordem);
  } catch (err) {
    res.status(err.status || 500).json({
      erro: err.message || 'Erro ao criar ordem de serviço'
    });
  }
};

/* =========================
   LISTAR
========================= */
exports.listar = async (req, res) => {
  try {
    const ordens = await ordemService.listarOrdens();
    res.json(ordens);
  } catch {
    res.status(500).json({
      erro: 'Erro ao listar ordens de serviço'
    });
  }
};

/* =========================
   POR ID
========================= */
exports.buscarPorId = async (req, res) => {
  try {
    const ordem = await ordemService.buscarPorId(req.params.id);

    if (!ordem) {
      return res.status(404).json({
        erro: 'Ordem de serviço não encontrada'
      });
    }

    res.json(ordem);
  } catch {
    res.status(500).json({
      erro: 'Erro ao buscar ordem de serviço'
    });
  }
};

/* =========================
   STATUS
========================= */
exports.atualizarStatus = async (req, res) => {
  try {
    const resultado = await ordemService.atualizarStatus(
      req.params.id,
      req.body.status
    );

    res.json(resultado);
  } catch (err) {
    res.status(err.status || 500).json({
      erro: err.message || 'Erro ao atualizar ordem de serviço'
    });
  }
};

/* =========================
   DELETE
========================= */
exports.deletar = async (req, res) => {
  try {
    await ordemService.deletar(req.params.id);

    res.json({ mensagem: 'Ordem removida' });
  } catch {
    res.status(500).json({ erro: 'Erro ao deletar ordem de serviço' });
  }
};