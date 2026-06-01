const express = require('express');
const router = express.Router();

const controller = require('../controllers/orcamentoController');

// listar ativos
router.get('/', controller.listar);

// lixeira
router.get('/apagados', controller.listarApagados);

// buscar por id
router.get('/:id', controller.buscarPorId);

// criar
router.post('/', controller.criar);

// atualizar status (aprovado/recusado/pendente)
router.put('/:id', controller.atualizarStatus);

// soft delete
router.delete('/:id', controller.deletar);

// restaurar
router.put('/:id/restaurar', controller.restaurar);

// delete permanente
router.delete('/:id/permanente', controller.deletarPermanente);

module.exports = router;