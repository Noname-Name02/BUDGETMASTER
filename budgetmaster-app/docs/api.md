# BudgetMaster API

Sistema de gerenciamento de orçamentos e ordens de serviço.

---

## Base URL

```bash
http://127.0.0.1:3000
```

---

**ORÇAMENTOS:**

---

**LISTAR ORÇAMENTOS:**

## GET /orcamentos

Retorna todos os orçamentos ativos cadastrados.

### Response

```json
[
  {
    "id": 1,
    "cliente": "João",
    "descricao": "Serviço elétrico",
    "valor": 500,
    "custo": 300,
    "lucro": 200,
    "margem": 66.67,
    "status": "pendente"
  }
]
```

---

## LISTAR LIXEIRA

## GET /orcamentos/apagados

Retorna os orçamentos removidos logicamente.

**Response:**

```json
[
  {
    "id": 4,
    "cliente": "Carlos",
    "descricao": "Instalação",
    "valor": 1000,
    "status": "recusado"
  }
]
```

---

## BUSCAR ORÇAMENTO POR ID

## GET /orcamentos/:id

Retorna um orçamento específico.

### Exemplo

```bash
GET /orcamentos/1
```

**Response:**

```json
{
  "id": 1,
  "cliente": "João",
  "descricao": "Serviço elétrico",
  "valor": 500,
  "custo": 300,
  "lucro": 200,
  "margem": 66.67,
  "status": "pendente"
}
```

---

## CRIAR ORÇAMENTO

## POST /orcamentos

Cria um novo orçamento.

**Body:**

```json
{
  "cliente": "João",
  "descricao": "Troca de fiação",
  "valor": 500,
  "custo": 300
}
```

---

## CÁLCULOS AUTOMÁTICOS

O sistema calcula automaticamente:

```txt
lucro = valor - custo
```

```txt
margem = (lucro / custo) * 100
```

---

## REGRAS

* cliente é obrigatório
* descricao é obrigatório
* valor é obrigatório
* custo é obrigatório
* valor deve ser maior que 0
* custo não pode ser negativo
* status padrão: pendente

---

## RESPONSE

```json
{
  "id": 2,
  "cliente": "João",
  "descricao": "Troca de fiação",
  "valor": 500,
  "custo": 300,
  "lucro": 200,
  "margem": 66.67,
  "status": "pendente"
}
```

---

## ATUALIZAR STATUS

## PUT /orcamentos/:id

Atualiza o status do orçamento.

**Body:**

```json
{
  "status": "aprovado"
}
```

---

## STATUS PERMITIDOS

* pendente
* aprovado
* recusado

---

**RESPONSE:**

```json
{
  "id": 2,
  "cliente": "João",
  "descricao": "Troca de fiação",
  "valor": 500,
  "status": "aprovado"
}
```

---

## MOVER PARA LIXEIRA

## DELETE /orcamentos/:id

Realiza exclusão lógica.

**Response:**

```json
{
  "mensagem": "Movido para lixeira"
}
```

---

## RESTAURAR ORÇAMENTO

## PUT /orcamentos/:id/restaurar

Restaura um orçamento da lixeira.

**Response:**

```json
{
  "mensagem": "Restaurado com sucesso"
}
```

---

## EXCLUIR PERMANENTEMENTE

## DELETE /orcamentos/:id/permanente

Remove o orçamento definitivamente do banco.

**Response:**

```json
{
  "mensagem": "Apagado permanentemente"
}
```

---

## ORDENS DE SERVIÇO

---

## CRIAR ORDEM DE SERVIÇO

## POST /ordens

Cria uma ordem vinculada a um orçamento aprovado.

**Body:**

```json
{
  "orcamento_id": 1
}
```

---

**REGRAS:**

* orçamento precisa existir
* orçamento deve estar aprovado

---

**RESPONSE:**

```json
{
  "id": 1,
  "orcamento_id": 1,
  "status": "em_andamento"
}
```

---

## LISTAR ORDENS

## GET /ordens

**Response:**

```json
[
  {
    "id": 1,
    "orcamento_id": 1,
    "status": "em_andamento"
  }
]
```

---

## BUSCAR ORDEM POR ID

## GET /ordens/:id

**Response:**

```json
{
  "id": 1,
  "orcamento_id": 1,
  "status": "em_andamento"
}
```

---

## ATUALIZAR STATUS DA ORDEM

## PUT /ordens/:id

**Body:**

```json
{
  "status": "finalizado"
}
```

---

**STATUS PERMITIDOS:**

* em_andamento
* finalizado

---

## DELETAR ORDEM

## DELETE /ordens/:id

**Response:**

```json
{
  "mensagem": "Ordem removida"
}
```

---

## RESPOSTAS DE ERRO

---

## 400 — BAD REQUEST

```json
{
  "erro": "Cliente obrigatório"
}
```

---

## 404 — NOT FOUND

```json
{
  "erro": "Orçamento não encontrado"
}
```

---

## 500 — INTERNAL SERVER ERROR

```json
{
  "erro": "Erro interno do servidor"
}
```

---

## OBSERVAÇÃO IMPORTANTE

**O campo `id`:**

* não representa ordem
* não representa prioridade
* não possui significado lógico

Ele é apenas um identificador único gerado automaticamente pelo banco.

---

## STATUS DO SISTEMA

✔ API funcionando  
✔ SQLite conectado  
✔ CRUD completo  
✔ Frontend integrado  
✔ Lixeira funcional  
✔ Ordens de serviço  
✔ Cálculo automático de lucro  
✔ Cálculo automático de margem  
✔ Docker configurado  
✔ Testes automatizados
