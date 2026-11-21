# Primeiro Deploy

Plataforma de ensino pra quem está começando a programar hoje: o básico de HTML, CSS e JavaScript pra entender o que a IA escreve, como usar Claude e ChatGPT pra construir um projeto, criar as artes e publicar no GitHub Pages.

Cada usuário tem login e progresso próprio.

## O que tem

- **5 módulos, 20 aulas** (21 pra quem ainda não tem GitHub): fundamentos, conversando com IA, primeiro projeto, JavaScript pra ler código de IA e um projeto guiado (cardápio online do zero ao deploy)
- **Blocos de conteúdo**: texto, mapas conceituais, prompts prontos pra copiar, links de vídeos e docs, dicas
- **Testes rápidos** (múltipla escolha) e **exercícios de código JS** com correção automática
- Código do aluno roda num **Web Worker** isolado, com timeout de 2s (loop infinito não trava a página)
- Aula só pode ser concluída depois de passar nos testes/exercícios dela
- No primeiro acesso a pessoa responde se já tem conta no GitHub; quem não tem ganha a aula extra "Git, GitHub e sua conta" (marcada com `onlyWithoutGithub` no conteúdo)
- Rascunho do código salvo automaticamente no navegador

## Stack

React 19 + TypeScript + Vite · React Router (HashRouter) · Firebase (Authentication + Firestore) · GitHub Pages via Actions

## Rodando local

```bash
npm install
npm run dev
```

A config do Firebase já está em `.env.development` e `.env.production` (é pública por design). Pra rodar em **modo local**, sem Firebase (contas e progresso só no `localStorage`), use `npm run dev -- --mode offline`.

## Ligando o Firebase

Projeto: `primeiro-deploy-3a94c`

1. **Authentication > Sign-in method**: ative **E-mail/senha** e **Google**.
2. **Authentication > Settings > Authorized domains**: adicione `azaf3.github.io` (o `localhost` já vem liberado).
3. **Firestore Database**: crie o banco em modo de produção (região `southamerica-east1`). Na aba **Regras**, cole o conteúdo de [`firestore.rules`](firestore.rules) e publique.
4. A config do app web já está nos arquivos `.env.development` e `.env.production`.

A `apiKey` do Firebase é pública por design. Quem protege os dados são as regras do Firestore: cada usuário só lê e grava o próprio progresso (`users/{uid}/progress/{lessonId}`).

## Deploy

1. No repositório: **Settings > Pages > Source: GitHub Actions**.
2. `git push` na `main`. O workflow em `.github/workflows/deploy.yml` builda e publica.

## Adicionando conteúdo

As aulas ficam em `src/content/` (um arquivo por módulo). Cada aula é uma lista de blocos tipados (`src/content/types.ts`):

```ts
{ type: 'exercise', id: 'ex-dobro', title: '...', instructions: '...',
  starter: 'function dobro(n) {\n}\n',
  tests: [{ desc: 'dobro(2) é 4', expr: 'dobro(2)', expected: 4 }],
  hint: '...', solution: '...' }
```

`id` de aula, quiz e exercício precisa ser único e estável: é o que fica salvo no progresso do usuário. Texto aceita `**negrito**` e `` `código` ``.

## Estrutura

```
src/
  content/      aulas (dados) e tipos
  components/   blocos: Quiz, CodeExercise, ConceptMap, prompts, links
  lib/          auth, progresso, runner de código, storage
  pages/        Home, Entrar, Trilha, Aula, 404
firestore.rules regras de segurança do banco
```
