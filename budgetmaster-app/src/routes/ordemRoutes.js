const express = require('express');
const router = express.Router();

const controller = require('../controllers/ordemController');

/* =========================
    LISTAR
========================= */
router.get('/', controller.listar);

/* =========================
    BUSCAR POR ID
========================= */
router.get('/:id', controller.buscarPorId);

/* =========================
    CRIAR ORDEM
   (só se orçamento aprovado)
========================= */
router.post('/', controller.criar);

/* =========================
    ATUALIZAR STATUS
   em_andamento → finalizado
========================= */
router.put('/:id', controller.atualizarStatus);

/* =========================
    DELETAR
========================= */
router.delete('/:id', controller.deletar);

module.exports = router;