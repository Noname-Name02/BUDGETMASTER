const BASE = "http://127.0.0.1:3000/orcamentos";

export async function listarOrcamentos() {
  const res = await fetch(BASE);
  return await res.json();
}

export async function listarLixeira() {
  const res = await fetch(`${BASE}/apagados`);
  return await res.json();
}

export async function criarOrcamento(data) {

  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const resultado = await res.json();

  if (!res.ok) {
    throw new Error(resultado.erro || "Erro ao criar orçamento");
  }

  return resultado;
}

export async function atualizarStatus(id, status) {

  await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });

}

export async function moverLixeira(id) {

  await fetch(`${BASE}/${id}`, {
    method: "DELETE"
  });

}

export async function restaurar(id) {

  await fetch(`${BASE}/${id}/restaurar`, {
    method: "PUT"
  });

}

export async function deletarPermanente(id) {

  await fetch(`${BASE}/${id}/permanente`, {
    method: "DELETE"
  });

}