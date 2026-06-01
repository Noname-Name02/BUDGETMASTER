export function formatarMoeda(valor) {

  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

}

export function calcularLucro(valor, custo) {

  return Number(valor) - Number(custo);

}

export function calcularMargem(valor, custo) {

  valor = Number(valor);
  custo = Number(custo);

  if (valor <= 0) return 0;

  return ((valor - custo) / valor) * 100;

}