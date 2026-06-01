const ordemService = require('../../src/services/ordemService');
const orcamentoRepo = require('../../src/repositories/orcamentoRepository');

jest.mock('../../src/repositories/orcamentoRepository');

describe('Unit Ordem Service', () => {

  afterEach(() => jest.clearAllMocks());

  test('deve falhar se orçamento não existir', async () => {
    orcamentoRepo.buscarPorId.mockResolvedValue(null);

    await expect(
      ordemService.criarOrdem(1)
    ).rejects.toHaveProperty('message');
  });

});