import { getOrcamentos } from "./api.js";

export async function loadStats() {
  const data = await getOrcamentos();

  const total = data.length;
  const aprovados = data.filter(i => i.status === "aprovado").length;
  const recusados = data.filter(i => i.status === "recusado").length;
  const pendentes = data.filter(i => i.status === "pendente").length;

  document.getElementById("total").innerText = total;
  document.getElementById("aprovados").innerText = aprovados;
  document.getElementById("recusados").innerText = recusados;
  document.getElementById("pendentes").innerText = pendentes;
}