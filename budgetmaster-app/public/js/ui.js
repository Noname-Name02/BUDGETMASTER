import {
  formatarMoeda,
  calcularLucro,
  calcularMargem
} from './utils.js';

export function renderLista(lista, dados, lixeira = false) {

  lista.innerHTML = '';

  if (!dados.length) {
    lista.innerHTML = `
      <div class="empty">
        Nenhum registro encontrado
      </div>
    `;
    return;
  }

  dados.forEach(item => {

    const lucro = calcularLucro(item.valor, item.custo);
    const margem = calcularMargem(item.valor, item.custo);

    const card = document.createElement('div');

    card.className = 'card';

    card.innerHTML = `
      <div class="card-header">
        <h3>${item.cliente}</h3>
        <span class="status ${item.status}">
          ${item.status}
        </span>
      </div>

      <p>${item.descricao}</p>

      <div class="values">
        <div>
          <small>Valor</small>
          <strong>${formatarMoeda(item.valor)}</strong>
        </div>

        <div>
          <small>Lucro</small>
          <strong>${formatarMoeda(lucro)}</strong>
        </div>

        <div>
          <small>Margem</small>
          <strong>${margem.toFixed(1)}%</strong>
        </div>
      </div>

      <div class="actions">
        ${
          lixeira
            ? `
              <button class="restore-btn" data-id="${item.id}">
                Restaurar
              </button>

              <button class="delete-btn" data-id="${item.id}">
                Excluir
              </button>
            `
            : `
              <button class="pending-btn" data-id="${item.id}">
                Pendente
              </button>

              <button class="approve-btn" data-id="${item.id}">
                Aprovar
              </button>

              <button class="reject-btn" data-id="${item.id}">
                Recusar
              </button>

              <button class="delete-btn" data-id="${item.id}">
                Lixeira
              </button>
            `
        }
      </div>
    `;

    lista.appendChild(card);
  });
}