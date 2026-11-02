# Match Pet

Um app para animais encontrarem um lar e tutores encontrarem companhia. A pessoa interessada em adotar faz "match" com o pet que deseja e depois entra em contato com o responsável.

Projeto prático da disciplina de Desenvolvimento Web (Unidade 2).

## Funcionalidades

- **Descobrir:** cards de pets (cães e gatos) com raça, idade, porte e personalidade, botões "Passar" e "Match" e filtro por espécie.
- **Meus Matches:** lista de pets curtidos, busca por nome ou raça, modal com o contato do responsável e remoção com confirmação.
- **Cadastrar pet:** formulário com validação e mensagens de erro para quem quer doar um animal.

## Tecnologias

React, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form, Zod, Axios.

## APIs usadas

| API | Para quê | Operação |
|---|---|---|
| TheDogAPI | raças, fotos e temperamento de cães | GET |
| TheCatAPI | raças, fotos e temperamento de gatos | GET |
| MockAPI | guardar matches e pets cadastrados | GET, POST, DELETE |

Nome, idade, cidade e contato dos pets vindos da TheDogAPI e da TheCatAPI são gerados no próprio código, porque essas APIs não trazem esses dados.

## Como rodar o projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org) 20 ou superior
- [Git](https://git-scm.com)

### 2. Clonar e instalar

```bash
git clone https://github.com/SEU-USUARIO/match-pet.git
cd match-pet
npm install
```

### 3. Criar o arquivo `.env`

O arquivo `.env` guarda as chaves e **não vai para o GitHub**. Cada pessoa cria o seu a partir do modelo:

```bash
# Windows (PowerShell)
copy .env.example .env

# Mac / Linux
cp .env.example .env
```

Depois, preencha as variáveis seguindo a seção abaixo.

### 4. Rodar

```bash
npm run dev
```

Abra `http://localhost:5173`.

> Sempre que alterar o `.env`, pare o servidor (`Ctrl+C`) e rode `npm run dev` de novo. O Vite só lê o arquivo ao iniciar.

## Configurando as APIs

### TheDogAPI e TheCatAPI (chaves gratuitas)

1. Acesse [thedogapi.com](https://thedogapi.com) e peça a chave gratuita (**Get your API key**). Preencha e-mail, uma descrição do app (por exemplo, `Pet adoption app for a university web development project`) e marque **School/University Project**.
2. A chave chega por e-mail (olhe o spam se demorar).
3. Repita em [thecatapi.com](https://thecatapi.com). As duas chaves são diferentes.
4. Coloque no `.env`:

```
VITE_DOG_API_KEY=sua_chave_do_dog
VITE_CAT_API_KEY=sua_chave_do_cat
```

Sem aspas e sem espaços. O grupo pode usar as mesmas chaves, desde que sejam compartilhadas em mensagem privada.

### MockAPI (guarda os matches e os pets cadastrados)

Basta **uma pessoa do grupo** criar. Todas as outras usam a mesma URL.

1. Acesse [mockapi.io](https://mockapi.io) e faça login.
2. Clique em **New Project** e dê o nome `match-pet`.
3. Dentro do projeto, clique em **New resource** e crie dois recursos, com estes nomes exatos (minúsculas):
   - `matches`
   - `pets`
4. Mantenha o schema padrão de cada recurso. A MockAPI aceita os campos extras que o app envia.
5. Na página do projeto, copie a URL da **API endpoint**. Ela tem o formato:

   ```
   https://SEU-CODIGO.mockapi.io/match-pet/:endpoint
   ```

6. No `.env`, use **só a parte antes do `:endpoint`**, sem barra no final:

```
VITE_MOCKAPI_URL=https://SEU-CODIGO.mockapi.io/match-pet
```

Atenção: **não** termine a URL com `/matches` ou `/pets`. O código já acrescenta isso sozinho. Com a URL errada, a MockAPI responde erro 400.

Para conferir, abra no navegador `https://SEU-CODIGO.mockapi.io/match-pet/matches`. Deve aparecer uma lista (vazia ou com registros).

### Resumo do `.env`

```
VITE_DOG_API_KEY=
VITE_CAT_API_KEY=
VITE_MOCKAPI_URL=
```

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Erro 400 ao dar match ou cadastrar | `VITE_MOCKAPI_URL` termina em `/matches` ou `/pets` | Deixe a URL só até `/match-pet` e reinicie o servidor |
| Erro 404 | Nome do recurso diferente na MockAPI | Os recursos precisam se chamar `matches` e `pets`, em minúsculas |
| Erro 401 ao carregar os pets | Chave da TheDogAPI ou da TheCatAPI errada ou ausente | Confira o `.env` e reinicie o servidor |
| Erro 429 | Limite de requisições do plano gratuito | Aguarde alguns minutos |
| Variável aparece como `undefined` | `.env` com nome errado ou fora da pasta certa | O arquivo deve se chamar `.env` (no Windows, confira que não virou `.env.txt`) e ficar na mesma pasta do `package.json` |
| Match some ou aparece de outra pessoa | Os matches também ficam no `localStorage` do navegador | No DevTools (`F12`) > Application > Local Storage, apague `matchpet:matches` e `matchpet:myPets` |

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run preview` | visualiza o build localmente |
| `npm run lint` | ESLint, incluindo regras de acessibilidade |

## Publicação na Vercel

1. Entre em [vercel.com](https://vercel.com) com o GitHub e importe o repositório (**Add New > Project**).
2. Em **Settings > Environment Variables**, cadastre as mesmas três variáveis do `.env`: `VITE_DOG_API_KEY`, `VITE_CAT_API_KEY` e `VITE_MOCKAPI_URL`.
3. Faça um novo deploy. A partir daí, cada push na `main` publica automaticamente.

O arquivo `vercel.json` já está configurado para as rotas do React Router funcionarem ao recarregar a página.

## Como o grupo trabalha no Git

```bash
git checkout -b feat/nome-da-tarefa
# ...alterações...
git add .
git commit -m "feat: descrição curta do que foi feito"
git push -u origin feat/nome-da-tarefa
```

Depois, abra um Pull Request no GitHub para outra pessoa revisar e fazer o merge na `main`. Use prefixos nos commits: `feat:`, `fix:`, `style:`, `docs:`.

**Nunca faça commit do `.env`.** O `.gitignore` já bloqueia o arquivo, mas confira com `git status` antes de commitar.

## Estrutura do projeto

```
src/
├── components/   componentes reutilizáveis (PetCard, Modal, Tag, Field, Navbar)
├── hooks/        hooks personalizados (usePets)
├── lib/          configuração do Axios, tratamento de erros e schemas de validação
├── pages/        telas (Discover, Matches, RegisterPet)
├── services/     chamadas às APIs (petsService, matchesService)
├── types/        tipos TypeScript
├── App.tsx       rotas
└── main.tsx      ponto de entrada
```

## Equipe

- Nome 1
- Nome 2
- Nome 3
- Nome 4
