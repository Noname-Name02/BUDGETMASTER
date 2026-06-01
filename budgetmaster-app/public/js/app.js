import {
  listarOrcamentos,
  listarLixeira,
  criarOrcamento,
  atualizarStatus,
  moverLixeira,
  restaurar,
  deletarPermanente
} from './api.js';

import { renderLista } from './renderLista.js';

const lista = document.getElementById('lista');

let paginaAtual = 'all';

async function carregar() {

  try {

    if (paginaAtual === 'lixeira') {

      const dados = await listarLixeira();

      console.log('Lixeira:', dados);

      renderLista(lista, dados, true);

      return;
    }

    const dados = await listarOrcamentos();

    console.log('Orçamentos:', dados);

    if (paginaAtual === 'all') {

      renderLista(lista, dados);

      return;
    }

    const filtrados = dados.filter(item => {
      return item.status === paginaAtual;
    });

    renderLista(lista, filtrados);

  } catch (erro) {

    console.error('Erro ao carregar:', erro);

    lista.innerHTML = `
      <div class="card">
        Erro ao carregar dados
      </div>
    `;
  }

}

window.filtrar = async function(status) {

  paginaAtual = status;

  await carregar();

};

window.mostrarLixeira = async function() {

  paginaAtual = 'lixeira';

  await carregar();

};

window.criar = async function() {

  try {

    const cliente = document.getElementById('cliente').value.trim();

    const descricao = document.getElementById('descricao').value.trim();

    const valor = document.getElementById('valor').value;

    const custo = document.getElementById('custo').value;

    if (!cliente || !descricao || !valor) {

      alert('Preencha os campos obrigatórios');

      return;
    }

    const novo = await criarOrcamento({
      cliente,
      descricao,
      valor,
      custo
    });

    console.log('Orçamento criado:', novo);

    document.getElementById('cliente').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('custo').value = '';

    paginaAtual = 'all';

    await carregar();

  } catch (erro) {

    console.error('Erro ao criar orçamento:', erro);

    alert('Erro ao criar orçamento: ' + erro.message);

  }

};

lista.addEventListener('click', async (e) => {

  try {

    const id = e.target.dataset.id;

    if (!id) return;

    if (e.target.classList.contains('approve-btn')) {

      await atualizarStatus(id, 'aprovado');

    }

    if (e.target.classList.contains('reject-btn')) {

      await atualizarStatus(id, 'recusado');

    }

    if (e.target.classList.contains('pending-btn')) {

      await atualizarStatus(id, 'pendente');

    }

    if (e.target.classList.contains('delete-btn')) {

      await moverLixeira(id);

    }

    if (e.target.classList.contains('restore-btn')) {

      await restaurar(id);

    }

    if (e.target.classList.contains('force-delete-btn')) {

      await deletarPermanente(id);

    }

    await carregar();

  } catch (erro) {

    console.error('Erro na ação:', erro);

    alert('Erro: ' + erro.message);

  }

});

carregar();