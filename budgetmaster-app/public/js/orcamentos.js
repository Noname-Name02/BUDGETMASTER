import {
  getOrcamentos,
  getLixeira,
  criarOrcamento,
  atualizarStatus,
  deletarOrcamento,
  restaurarOrcamento,
  apagarPermanentemente
} from './api.js';

import { renderLista } from './ui.js';

const lista = document.getElementById('lista');

export async function carregarAtivos() {
  const dados = await getOrcamentos();
  renderLista(lista, dados, false);
}

export async function carregarLixeira() {
  const dados = await getLixeira();
  renderLista(lista, dados, true);
}

export async function criar() {

  const cliente = document.getElementById('cliente').value;
  const descricao = document.getElementById('descricao').value;
  const valor = document.getElementById('valor').value;
  const custo = document.getElementById('custo').value;

  if (!cliente || !descricao || !valor) {
    alert('Preencha os campos');
    return;
  }

  await criarOrcamento({
    cliente,
    descricao,
    valor,
    custo
  });

  carregarAtivos();
}

window.carregarAtivos = carregarAtivos;
window.carregarLixeira = carregarLixeira;
window.criar = criar;

window.status = async (id, status) => {
  await atualizarStatus(id, status);
  carregarAtivos();
};

window.deletar = async (id) => {
  await deletarOrcamento(id);
  carregarAtivos();
};

window.restaurar = async (id) => {
  await restaurarOrcamento(id);
  carregarLixeira();
};

window.apagar = async (id) => {
  await apagarPermanentemente(id);
  carregarLixeira();
};