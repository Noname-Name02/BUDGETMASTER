# BudgetMaster

**Sistema completo de gerenciamento de orçamentos e ordens de serviço desenvolvido com:**

* Node.js
* Express
* SQLite / PostgreSQL
* HTML + CSS + JavaScript
* API REST
* Frontend responsivo

## O sistema permite

* Criar orçamentos
* Calcular lucro e margem automaticamente
* Aprovar ou recusar orçamentos
* Gerenciar lixeira (soft delete)
* Restaurar registros
* Criar ordens de serviço
* Gerenciar status das ordens
* Dashboard visual simples e moderno

## Funcionalidades

**Orçamentos:**

* Criar orçamento
* Editar status
* Aprovar
* Recusar
* Pendente
* Soft delete
* Exclusão permanente
* Restaurar da lixeira
* Cálculo automático de:
  *lucro
  *margem

## Ordens de Serviço

* Criar ordem vinculada ao orçamento
* Apenas orçamentos aprovados podem gerar ordens
* Controle de status:
  *em andamento
  *finalizado

## Tecnologias

**Backend:**

* Node.js
* Express
* SQLite3
* PostgreSQL
* CORS

**Frontend:**

* HTML5
* CSS3
* JavaScript Vanilla

**Infraestrutura:**

* Docker
* Docker Compose

**Testes:**

* Jest

## Como Executar o Projeto

## Opção 1 - Ambiente Local (SQLite)

```bash
git clone <url-do-repositorio>
cd budgetmaster-app

npm install
npm start
```

A aplicação ficará disponível em:

```bash
http://localhost:3000
```

O banco SQLite será criado automaticamente na primeira execução.

---

## Opção 2 - Docker + PostgreSQL

Entre na pasta do Docker:

```bash
cd infra/docker
```

Suba os containers:

```bash
docker compose up -d
```

Verificar containers:

```bash
docker ps
```

A aplicação ficará disponível em:

```bash
http://localhost:3000
```

Banco PostgreSQL:

```bash
localhost:5433
```

Parar containers:

```bash
docker compose down
```

Serviços

| Serviço    | Porta |
| ---------- | ----- |
| API Node   | 3000  |
| PostgreSQL | 5433  |

## Rotas da API

**Listar orçamentos ativos:**

```bash
GET /orcamentos
```

## Listar lixeira

```bash
GET /orcamentos/apagados
```

## Buscar orçamento por ID

```bash
GET /orcamentos/:id
```

## Criar orçamento

```bash
POST /orcamentos
```

**Body:**

```bash
{
  "cliente": "",
  "descricao": "",
  "valor": "",
  "custo": ""
}
```

## Atualizar status

```bash
PUT /orcamentos/:id
```

**Body:**

```bash
{
  "status": "aprovado"
}
```

**Status disponíveis:**

* pendente
* aprovado
* recusado

## Enviar para lixeira

```bash
DELETE /orcamentos/:id
```

## Restaurar orçamento

```bash
PUT /orcamentos/:id/restaurar
```

## Excluir permanentemente

```bash
DELETE /orcamentos/:id/permanente
```

**Ordens de Serviço:**

* Listar ordens:

```bash
GET /ordens
```

## Criar ordem

```bash
POST /ordens
```

**Body:**

```bash
{
  "orcamento_id": 1
}
```

**Apenas orçamentos aprovados podem gerar ordens.**

## Atualizar status da ordem

```bash
PUT /ordens/:id
```

**Body:**

```bash
{
  "status": "finalizado"
}
```

## Regras de Negócio

**Orçamentos:**

* Cliente obrigatório
* Descrição obrigatória
* Valor deve ser maior que zero
* Custo não pode ser negativo
* Status inicial:
  *pendente

**Ordens:**

* Apenas orçamento aprovado pode gerar ordem
* Status válidos:
* em_andamento
* finalizado

## Fórmulas

* Lucro

```bash
lucro = valor - custo
```

* Margem

```bash
margem = (lucro / custo) * 100
```

## Estrutura do Projeto

```bash
budgetmaster-app
    ├───docs
    ├───infra
    │   ├───database
    │   ├───deploy
    │   ├───docker
    │   ├───nginx
    │   └───scripts
    ├───public
    │   ├───assets
    │   │   ├───animations
    │   │   ├───avatars
    │   │   ├───backgrounds
    │   │   ├───fonts
    │   │   ├───icons
    │   │   ├───images
    │   │   └───logos
    │   ├───css
    │   ├───js
    │   └───pages
    ├───src
    │   ├───config
    │   ├───controllers
    │   ├───middlewares
    │   ├───models
    │   ├───repository
    │   ├───routes
    │   ├───services
    │   └───utils
    └───tests
        ├───e2e
        ├───integration
        └───unit
```

## Testes

**Rodar testes:**

```bash
npm test
```

## Frontend

**O frontend possui:**

* Dashboard simples
* Menu lateral
* Separação por status
* Cards de orçamento
* Layout responsivo
* Atualização dinâmica via fetch API

## Melhorias Futuras

* Login e autenticação JWT
* Multiusuário
* Dashboard financeiro
* Upload de arquivos
* Relatórios PDF
* Busca avançada
* Paginação
* Tema dark mode
* Deploy cloud
* WebSocket em tempo real

## Deploy

**Possíveis plataformas:**

* Render
* Railway
* Vercel
* Docker

## Status do Projeto

| Item              | Status |
| ----------------- | ------ |
| API REST          | ✔      |
| CRUD Completo     | ✔      |
| SQLite            | ✔      |
| PostgreSQL        | ✔      |
| Docker            | ✔      |
| Frontend          | ✔      |
| Soft Delete       | ✔      |
| Lixeira           | ✔      |
| Ordens de Serviço | ✔      |
| Testes            | ✔      |

Desenvolvido para estudo e evolução do sistema
