
# API de controle de dieta

API de controle de dieta, desafio da Rocketseat

## Stack utilizada

**Back-end:** Node, Fastify, Typescript, Knex.

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/talinedacosta/daily_diet_api.git
```

Entre no diretório do projeto

```bash
  cd daily_diet_api
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

### Estrutura de dados

#### Refeições (Meals)

- `id` - Identificador único
- `title` - Título da refeição
- `description` - Descrição da refeição
- `isDiet` - Informação se está na dieta ou não
- `user_id` - identificador do usuário
- `eaten_at` - Data da refeição
- `created_at` - Data de criação
- `updated_at` - Data de atualização

#### Usuários (Users)

- `id` - Identificador único
- `name` - Nome do usuário
- `email` - Email do usuário
- `password` - Senha do usuário
- `created_at` - Data de criação

## Documentação da API

### Usuários (Users)
Criar conta ou entrar na conta retorna um **token** que tem duração de 1h. O token é para ser usado nas requisições feitas nas rotas `/meals`.

#### Criar conta

```http
  GET /users/signup
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`       | `string` | **Obrigatório**. Nome |
| `email`      | `email` | **Obrigatório**. Email |
| `password`   | `string` | **Obrigatório**. Senha |

#### Entrar na conta

```http
  GET /users/signin
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `email` | **Obrigatório**. Email |
| `password`   | `string` | **Obrigatório**. Senha |



### Refeições (Meals)
Todas as requisiões para a rota `/meals` devem conter o header 'Authorization' com o token do usuário que é obtido ao criar conta ou entrar na conta.

| Header   | Tipo       | 
| :---------- | :--------- | 
| `Authorization` | `Bearer ${token}` | 

#### Busca todas as refeições

```http
  GET /meals/
```

#### Busca uma refeição

```http
  GET /meals/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`       | `string` | **Obrigatório**. Id em formato UUID |

#### Cria uma refeição

```http
  POST /meals/
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`       | `string` | **Obrigatório**. Título |
| `description` | `string` | **Obrigatório**. Descrição |
| `isDiet`      | `string` | **Obrigatório**. Valor pode ser 'true' ou 'false' |


#### Edita uma refeição

```http
  PUT /meals/:id
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`       | `string` | **Obrigatório**. Título |
| `description` | `string` | **Obrigatório**. Descrição |
| `isDiet`      | `string` | **Obrigatório**. Valor pode ser 'true' ou 'false' |

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`       | `string` | **Obrigatório**. Id em formato UUID |

#### Deletar uma refeição

```http
  DELETE /meals/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. Id em formato UUID |

#### Retorna resumo das refeições

```http
  GET /meals/summary
```

## Referência

 - [Rockseat](https://www.rocketseat.com.br/)
