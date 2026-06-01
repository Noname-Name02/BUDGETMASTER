let orcamentos = [];
let mostrandoLixeira = false;

const lista = document.getElementById('lista');

/* =========================
   CARREGAR ORÇAMENTOS
========================= */

async function carregar() {
  try {

    const rota = mostrandoLixeira
      ? '/orcamentos/apagados'
      : '/orcamentos';

    const response = await fetch(rota);

    orcamentos = await response.json();

    renderizar(orcamentos);

  } catch (err) {

    console.error(err);

    lista.innerHTML = `
      <div class="card">
        Erro ao carregar orçamentos
      </div>
    `;
  }
}

/* =========================
   RENDERIZAR
========================= */

function renderizar(dados) {

  if (!dados.length) {

    lista.innerHTML = `
      <div class="card">
        Nenhum orçamento encontrado
      </div>
    `;

    return;
  }

  lista.innerHTML = dados.map(item => `

    <div class="card">

      <h3>${item.cliente}</h3>

      <p>${item.descricao}</p>

      <br>

      <p>
        <strong>Valor:</strong>
        R$ ${Number(item.valor).toFixed(2)}
      </p>

      <p>
        <strong>Custo:</strong>
        R$ ${Number(item.custo || 0).toFixed(2)}
      </p>

      <p>
        <strong>Status:</strong>
        ${item.status}
      </p>

      <br>

      ${
        mostrandoLixeira
        ? `
          <button onclick="restaurar(${item.id})">
            Restaurar
          </button>

          <br><br>

          <button onclick="excluirPermanente(${item.id})">
            Excluir permanente
          </button>
        `
        : `
          <button onclick="alterarStatus(${item.id}, 'aprovado')">
            Aprovar
          </button>

          <br><br>

          <button onclick="alterarStatus(${item.id}, 'recusado')">
            Recusar
          </button>

          <br><br>

          <button onclick="alterarStatus(${item.id}, 'pendente')">
            Pendente
          </button>

          <br><br>

          <button onclick="moverLixeira(${item.id})">
            Lixeira
          </button>
        `
      }

    </div>

  `).join('');
}

/* =========================
   CRIAR
========================= */

async function criar() {

  const cliente =
    document.getElementById('cliente').value;

  const descricao =
    document.getElementById('descricao').value;

  const valor =
    document.getElementById('valor').value;

  const custo =
    document.getElementById('custo').value;

  if (!cliente || !descricao || !valor) {

    alert('Preencha todos os campos obrigatórios');

    return;
  }

  try {

    const response = await fetch('/orcamentos', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        cliente,
        descricao,
        valor,
        custo
      })

    });

    const data = await response.json();

    console.log(data);

    document.getElementById('cliente').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('custo').value = '';

    await carregar();

  } catch (err) {

    console.error(err);

    alert('Erro ao criar orçamento');
  }
}

/* =========================
   FILTROS
========================= */

function filtrar(status) {

  mostrandoLixeira = false;

  if (status === 'all') {

    renderizar(orcamentos);

    return;
  }

  const filtrados = orcamentos.filter(
    item => item.status === status
  );

  renderizar(filtrados);
}

/* =========================
   LIXEIRA
========================= */

async function mostrarLixeira() {

  mostrandoLixeira = true;

  await carregar();
}

/* =========================
   ALTERAR STATUS
========================= */

async function alterarStatus(id, status) {

  await fetch(`/orcamentos/${id}`, {

    method: 'PUT',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      status
    })

  });

  await carregar();
}

/* =========================
   EXCLUIR
========================= */

async function moverLixeira(id) {

  await fetch(`/orcamentos/${id}`, {
    method: 'DELETE'
  });

  await carregar();
}

/* =========================
   RESTAURAR
========================= */

async function restaurar(id) {

  await fetch(`/orcamentos/${id}/restaurar`, {
    method: 'PUT'
  });

  await carregar();
}

/* =========================
   EXCLUIR DEFINITIVO
========================= */

async function excluirPermanente(id) {

  await fetch(`/orcamentos/${id}/permanente`, {
    method: 'DELETE'
  });

  await carregar();
}

/* =========================
   EXPOR PARA O HTML
========================= */

window.criar = criar;
window.filtrar = filtrar;
window.mostrarLixeira = mostrarLixeira;
window.alterarStatus = alterarStatus;
window.moverLixeira = moverLixeira;
window.restaurar = restaurar;
window.excluirPermanente = excluirPermanente;

/* =========================
   INICIAR
========================= */

carregar();