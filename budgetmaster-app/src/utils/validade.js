export function isValidOrcamento({ cliente, descricao, valor }) {
  return cliente && descricao && Number(valor) > 0;
}