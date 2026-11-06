# Match Pet

Um app para animais encontrarem um lar e tutores encontrarem companhia. A pessoa interessada em adotar faz "match" com o pet que deseja e depois entra em contato com o responsável.

Projeto prático da disciplina de Desenvolvimento Web (Unidade 2).

- **Aplicação publicada:** https://match-pet-seven.vercel.app/
- **Repositório:** https://github.com/isabeckmann/match-pet

## Funcionalidades

- **Login e cadastro:** e-mail e senha ou conta Google (Firebase Authentication), com "Esqueceu a senha?" por e-mail. As telas de pets só abrem para quem está logado.
- **Descobrir:** cards de pets (cães, gatos e pets cadastrados por outros usuários) com idade, porte, cidade e personalidade. Botões "Passar" e "Match" (ou arraste o card) e filtro por espécie.
- **Meus Matches:** pets curtidos pelo usuário logado, busca por nome ou raça, modal com o contato do responsável e remoção com confirmação.
- **Cadastrar pet:** formulário com 12 campos, validação, mensagens de erro e upload de foto. O pet cadastrado aparece em "Descobrir" para **os outros usuários** (o dono não vê o próprio pet na fila).

## Tecnologias

React, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form, Zod, Axios, Firebase Authentication e Cloudinary.

## APIs usadas

| API        | Para quê                             | Operação          |
| ---------- | ------------------------------------ | ----------------- |
| TheDogAPI  | raças, fotos e temperamento de cães  | GET               |
| TheCatAPI  | raças, fotos e temperamento de gatos | GET               |
| MockAPI    | guardar matches e pets cadastrados   | GET, POST, DELETE |
| Cloudinary | upload da foto do pet cadastrado     | POST              |

Nome, idade, cidade e contato dos pets vindos da TheDogAPI e da TheCatAPI são gerados no próprio código, porque essas APIs não trazem esses dados.

## Requisitos mínimos

| Requisito                                   | Onde está                                                                                                      |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 3 telas responsivas                         | Descobrir, Meus Matches e Cadastrar pet (além de Login, Criar conta e Redefinir senha)                         |
| 2 componentes reutilizáveis                 | `PetCard`, `Modal`, `Field`, `AuthLayout`, `Navbar`, entre outros em `src/components`                          |
| 3 interações                                | filtro por espécie, busca nos matches, modal de contato e de confirmação, menu da conta, swipe/arrastar o card |
| Formulário com 5+ campos e validação        | Cadastrar pet (Zod + React Hook Form, mensagens de erro por campo)                                             |
| API com GET + 2 entre POST/PUT/PATCH/DELETE | GET (TheDogAPI, TheCatAPI, MockAPI), POST (matches, pets, foto) e DELETE (matches)                             |
| Acessibilidade (WCAG AA / Lighthouse)       | veja a seção abaixo                                                                                            |
| Versionamento de todos os integrantes       | histórico de commits e Pull Requests no GitHub                                                                 |
| Publicado em produção                       | Vercel (link no topo)                                                                                          |

## Acessibilidade

- Todos os campos têm `label`, e os erros são ligados ao campo com `aria-describedby` e anunciados com `role="alert"`.
- Cores com contraste mínimo de 4,5:1 para texto normal (texto branco sobre `#c2352a`, texto escuro sobre o coral).
- Foco visível em todos os elementos interativos e navegação completa pelo teclado (menu da conta fecha com Esc; modais usam `<dialog>` nativo).
- Alvos de toque com pelo menos 44 px nos botões principais e menu.
- Animações desativadas para quem pede menos movimento (`prefers-reduced-motion`).
- Ordem correta de títulos (`h1` > `h2`), `lang="pt-BR"` e imagens com texto alternativo.
- ESLint com `eslint-plugin-jsx-a11y` (`npm run lint`).

Para medir: abra o site publicado no Chrome, F12 > Lighthouse > categoria **Accessibility**.

## Como rodar o projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org) 20 ou superior
- [Git](https://git-scm.com)

### 2. Clonar e instalar

```bash
git clone https://github.com/isabeckmann/match-pet.git
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

## Variáveis de ambiente

```
VITE_DOG_API_KEY=
VITE_CAT_API_KEY=
VITE_MOCKAPI_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

Sem aspas e sem espaços. O grupo pode usar as mesmas chaves, desde que sejam compartilhadas em mensagem privada.

## Configurando os serviços

### TheDogAPI e TheCatAPI (chaves gratuitas)

1. Acesse [thedogapi.com](https://thedogapi.com) e peça a chave gratuita (**Get your API key**). Preencha e-mail, uma descrição do app (por exemplo, `Pet adoption app for a university web development project`) e marque **School/University Project**.
2. A chave chega por e-mail (olhe o spam se demorar).
3. Repita em [thecatapi.com](https://thecatapi.com). As duas chaves são diferentes.
4. Preencha `VITE_DOG_API_KEY` e `VITE_CAT_API_KEY`.

### MockAPI (guarda os matches e os pets cadastrados)

Basta **uma pessoa do grupo** criar. Todas as outras usam a mesma URL.

1. Acesse [mockapi.io](https://mockapi.io) e faça login.
2. Clique em **New Project** e dê o nome `match-pet`.
3. Dentro do projeto, clique em **New resource** e crie dois recursos, com estes nomes exatos (minúsculas):
   - `matches`
   - `pets`
4. Mantenha o schema padrão de cada recurso. A MockAPI aceita os campos extras que o app envia.
5. Na página do projeto, copie a URL da **API endpoint**, no formato `https://SEU-CODIGO.mockapi.io/match-pet/:endpoint`.
6. No `.env`, use **só a parte antes do `:endpoint`**, sem barra no final:

```
VITE_MOCKAPI_URL=https://SEU-CODIGO.mockapi.io/match-pet
```

Atenção: **não** termine a URL com `/matches` ou `/pets`. O código já acrescenta isso sozinho. Com a URL errada, a MockAPI responde erro 400.

Para conferir, abra no navegador `https://SEU-CODIGO.mockapi.io/match-pet/matches`. Deve aparecer uma lista (vazia ou com registros).

### Firebase (login)

1. No [console do Firebase](https://console.firebase.google.com), crie um projeto e adicione um app **Web**. Copie `apiKey`, `authDomain`, `projectId` e `appId` para o `.env`.
2. Em **Authentication > Sign-in method**, ative **E-mail/senha** e **Google**.
3. Em **Authentication > Settings > Authorized domains**, adicione o domínio da Vercel (`match-pet-seven.vercel.app`). Sem isso o login com Google falha na versão publicada.
4. Opcional: em **Authentication > Templates > Redefinição de senha**, personalize a URL de ação para `https://match-pet-seven.vercel.app/redefinir-senha`. Assim o link do e-mail abre a tela de nova senha do próprio app. Sem isso, o Firebase usa a página padrão dele, que também funciona.

### Cloudinary (foto do pet)

1. Crie uma conta em [cloudinary.com](https://cloudinary.com) e copie o **Cloud name** para `VITE_CLOUDINARY_CLOUD_NAME`.
2. Em **Settings > Upload > Upload presets**, crie um preset com **Signing mode: Unsigned** e coloque o nome dele em `VITE_CLOUDINARY_UPLOAD_PRESET`.

## Problemas comuns

| Sintoma                                    | Causa provável                                              | Solução                                                                                                                 |
| ------------------------------------------ | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Erro 400 ao dar match ou cadastrar         | `VITE_MOCKAPI_URL` termina em `/matches` ou `/pets`         | Deixe a URL só até `/match-pet` e reinicie o servidor                                                                   |
| Erro 404                                   | Nome do recurso diferente na MockAPI                        | Os recursos precisam se chamar `matches` e `pets`, em minúsculas                                                        |
| Erro 401 ao carregar os pets               | Chave da TheDogAPI ou da TheCatAPI errada ou ausente        | Confira o `.env` e reinicie o servidor                                                                                  |
| Erro 429                                   | Limite de requisições do plano gratuito                     | Aguarde alguns minutos                                                                                                  |
| Variável aparece como `undefined`          | `.env` com nome errado ou fora da pasta certa               | O arquivo deve se chamar `.env` (no Windows, confira que não virou `.env.txt`) e ficar na mesma pasta do `package.json` |
| Login com Google: "Domínio não autorizado" | Domínio da Vercel fora do Firebase                          | Adicione em Authentication > Settings > Authorized domains                                                              |
| Foto não envia                             | Variáveis do Cloudinary ausentes ou preset não é _Unsigned_ | Confira `VITE_CLOUDINARY_*` e o modo do preset                                                                          |
| Pet cadastrado não aparece para mim        | O dono não vê o próprio pet em "Descobrir"                  | Entre com outra conta para ver o pet                                                                                    |

## Scripts

| Comando           | O que faz                                  |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | servidor de desenvolvimento                |
| `npm run build`   | build de produção                          |
| `npm run preview` | visualiza o build localmente               |
| `npm run lint`    | ESLint, incluindo regras de acessibilidade |

## Publicação na Vercel

1. Entre em [vercel.com](https://vercel.com) com o GitHub e importe o repositório (**Add New > Project**).
2. Em **Settings > Environment Variables**, cadastre as **nove** variáveis da seção "Variáveis de ambiente".
3. Faça um novo deploy (variáveis novas só valem em deploys novos). A partir daí, cada push na `main` publica automaticamente.

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
├── components/   componentes reutilizáveis (PetCard, DiscoverCard, Modal, Field, Navbar, UserMenu...)
├── contexts/     estado de autenticação (AuthProvider)
├── hooks/        hooks personalizados (useAuth, usePets)
├── lib/          Axios, Firebase, tratamento de erros e schemas de validação
├── pages/        telas (Discover, Matches, RegisterPet, Login, Signup, ResetPassword)
├── services/     chamadas às APIs (petsService, matchesService, authService, uploadService)
├── types/        tipos TypeScript
├── App.tsx       rotas
└── main.tsx      ponto de entrada
```

## Equipe

- [Isadora Beckmann](https://github.com/isabeckmann)
- [Julia Picinini](https://github.com/jupicinink)
- [Luiza Graminho](https://github.com/Luiza-graminho)
