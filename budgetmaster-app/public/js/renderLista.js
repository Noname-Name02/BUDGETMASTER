import {
  formatarMoeda,
  calcularLucro,
  calcularMargem
} from './utils.js';

export function renderLista(lista, dados, lixeira = false) {

  lista.innerHTML = '';

  if (!dados.length) {

    lista.innerHTML = `
      <div class="card">
        Nenhum registro encontrado
      </div>
    `;

    return;
  }

  dados.forEach(item => {

    const lucro = calcularLucro(item.valor, item.custo);

    const margem = calcularMargem(item.valor, item.custo);

    const div = document.createElement('div');

    div.className = 'card';

    div.innerHTML = `
      <h3>${item.cliente}</h3>

      <p>${item.descricao}</p>

      <p>
        <strong>Status:</strong>
        ${item.status}
      </p>

      <p>
        <strong>Valor:</strong>
        ${formatarMoeda(item.valor)}
      </p>

      <p>
        <strong>Lucro:</strong>
        ${formatarMoeda(lucro)}
      </p>

      <p>
        <strong>Margem:</strong>
        ${margem.toFixed(1)}%
      </p>

      <div class="actions">

        ${
          lixeira
          ? `
            <button class="restore-btn" data-id="${item.id}">
              Restaurar
            </button>

            <button class="force-delete-btn" data-id="${item.id}">
              Excluir permanente
            </button>
          `
          : `
            <button class="approve-btn" data-id="${item.id}">
              Aprovar
            </button>

            <button class="reject-btn" data-id="${item.id}">
              Recusar
            </button>

            <button class="pending-btn" data-id="${item.id}">
              Pendente
            </button>

            <button class="delete-btn" data-id="${item.id}">
              Lixeira
            </button>
          `
        }

      </div>
    `;

    lista.appendChild(div);

  });

}