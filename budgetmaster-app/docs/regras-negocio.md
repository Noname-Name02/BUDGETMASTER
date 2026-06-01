# 📘 Regras de Negócio — BudgetMaster

Sistema de gerenciamento de orçamentos e ordens de serviço.

---

## 1. REGRAS FUNCIONAIS

---

## RF01 — Criar orçamento

O sistema deve permitir criar um orçamento.

Campos obrigatórios:

- cliente
- descricao
- valor
- custo

O status inicial deve ser sempre:

```txt
pendente
```

---

## RF02 — Cálculo automático de lucro

O sistema deve calcular automaticamente:

```txt
lucro = valor - custo
```

Exemplo:

```txt
valor = 1000
custo = 700

lucro = 300
```

---

## RF03 — Cálculo automático de margem

O sistema deve calcular automaticamente:

```txt
margem = (lucro / custo) * 100
```

Exemplo:

```txt
lucro = 300
custo = 700

margem = 42.85%
```

---

## RF04 — Listar orçamentos

O sistema deve listar:

- orçamentos ativos
- lixeira

A listagem deve ser ordenada:

```txt
mais recente → mais antigo
```

---

## RF05 — Atualizar status

O sistema deve permitir alterar o status do orçamento.

---

## STATUS PERMITIDOS

- pendente
- aprovado
- recusado

---

## RF06 — Exclusão lógica

Ao deletar um orçamento:

- ele NÃO deve ser removido do banco
- deve ir para lixeira
- campo `deletado` deve receber `1`

---

## RF07 — Restaurar orçamento

O sistema deve permitir restaurar um orçamento da lixeira.

Ao restaurar:

```txt
deletado = 0
```

---

## RF08 — Exclusão permanente

O sistema deve permitir remover permanentemente um orçamento.

Nesse caso:

```txt
registro removido do banco
```

---

## RF09 — Criar ordem de serviço

O sistema deve permitir criar ordens de serviço.

---

## REGRAS

- orçamento deve existir
- orçamento deve estar aprovado

---

## RF10 — Atualizar status da ordem

Status permitidos:

- em_andamento
- finalizado

---

## RF11 — Datas automáticas

O sistema deve preencher automaticamente:

## data_inicio

Ao criar a ordem.

---

## data_fim

Quando:

```txt
status = finalizado
```

---

## RF12 — Buscar por ID

O sistema deve permitir:

- buscar orçamento por ID
- buscar ordem por ID

---

## 2. REGRAS NÃO FUNCIONAIS

---

## RNF01 — Performance

As requisições devem responder em menos de:

```txt
2 segundos
```

em ambiente local.

---

## RNF02 — Disponibilidade

O sistema deve permanecer disponível enquanto:

```txt
Node.js estiver ativo
```

---

## RNF03 — Segurança básica

O sistema deve:

- aceitar apenas JSON válido
- utilizar CORS habilitado
- validar dados recebidos

---

## RNF04 — Responsividade

O frontend deve funcionar em:

- desktop
- tablet
- mobile

---

## RNF05 — Arquitetura organizada

O sistema deve utilizar separação por camadas:

| Camada | Responsabilidade |
| routes | rotas |
| controllers | entrada das requisições |
| services | regras de negócio |
| repositories | acesso ao banco |
| config | conexão com banco |
| tests | testes automatizados |

---

## RNF06 — Persistência

Os dados devem permanecer salvos após:

- reiniciar servidor
- reiniciar aplicação

---

## RNF07 — Escalabilidade futura

O sistema deve permitir futura implementação de:

- autenticação JWT
- usuários
- dashboard financeiro
- relatórios
- gráficos
- exportação PDF
- upload de arquivos

---

## RNF08 — Dockerização

O sistema deve funcionar em containers Docker.

---

## RNF09 — Testabilidade

O sistema deve permitir:

- testes unitários
- testes de integração

---

## 3. TECNOLOGIAS UTILIZADAS

- Node.js
- Express
- SQLite
- Docker
- Jest
- HTML
- CSS
- JavaScript

---

## 4. OBJETIVO DO SISTEMA

O BudgetMaster foi desenvolvido para:

- controlar orçamentos
- calcular lucro automaticamente
- calcular margem automaticamente
- gerenciar aprovações
- gerar ordens de serviço
- organizar lixeira
- facilitar gestão financeira

---

## 5. STATUS DO SISTEMA

✔ CRUD completo  
✔ API funcional  
✔ Frontend integrado  
✔ SQLite configurado  
✔ Docker configurado  
✔ Regras de negócio implementadas  
✔ Lixeira funcional  
✔ Ordens de serviço  
✔ Testes automatizados  
✔ Arquitetura em camadas
