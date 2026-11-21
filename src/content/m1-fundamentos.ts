import type { Module } from './types'

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`

export const fundamentos: Module = {
  id: 'fundamentos',
  title: 'Antes de tudo',
  description: 'O mínimo que você precisa entender pra não ficar perdido quando a IA começar a gerar código.',
  lessons: [
    {
      id: 'o-que-e-programar',
      title: 'O que é programar hoje',
      summary: 'Programar mudou. Você não precisa decorar tudo, mas precisa entender o que está pedindo.',
      minutes: 6,
      blocks: [
        {
          type: 'p',
          text: 'Programar é dar instruções precisas pro computador. Antes, isso significava escrever cada linha na mão. Hoje, boa parte do código pode ser escrita por uma IA, e o seu papel vira outro: **saber o que pedir, conferir o que veio e juntar as peças**.',
        },
        {
          type: 'p',
          text: 'Isso é o que chamam de **vibe coding**: você descreve o que quer em português, a IA gera o código, você testa e ajusta. Funciona muito bem pra começar. O problema é quando a pessoa aceita tudo sem entender nada e trava no primeiro erro.',
        },
        {
          type: 'tip',
          title: 'A ideia desta trilha',
          text: 'Usar IA desde o primeiro dia, mas aprender o suficiente pra não depender dela às cegas. Você vai sair daqui com um projeto publicado na internet.',
        },
        {
          type: 'map',
          title: 'O que um vibecoder precisa saber',
          root: {
            label: 'Vibe coding',
            children: [
              {
                label: 'Pedir bem',
                note: 'prompts claros',
                children: [{ label: 'Contexto' }, { label: 'Objetivo' }, { label: 'Restrições' }],
              },
              {
                label: 'Entender o básico',
                note: 'pra conferir',
                children: [{ label: 'HTML, CSS, JS' }, { label: 'Ler erros' }],
              },
              {
                label: 'Ferramentas',
                children: [{ label: 'Claude: código' }, { label: 'ChatGPT: prompts e artes' }, { label: 'GitHub: guardar e publicar' }],
              },
            ],
          },
        },
        {
          type: 'links',
          items: [
            { label: 'Vídeos: o que é vibe coding', url: yt('o que é vibe coding'), kind: 'video' },
            { label: 'Vídeos: lógica de programação para iniciantes', url: yt('lógica de programação para iniciantes'), kind: 'video' },
          ],
        },
        {
          type: 'quiz',
          id: 'q-programar',
          questions: [
            {
              prompt: 'No vibe coding, qual é o seu papel principal?',
              options: [
                'Decorar todos os comandos da linguagem',
                'Descrever bem o que quer, testar e conferir o que a IA gerou',
                'Aceitar o primeiro código que a IA mandar',
              ],
              correct: 1,
              explain: 'Isso. A IA escreve, mas quem decide se está certo é você.',
            },
            {
              prompt: 'Por que vale aprender o básico mesmo usando IA?',
              options: [
                'Pra conseguir entender e corrigir quando algo der errado',
                'Porque a IA não sabe programar',
                'Não vale, a IA resolve tudo',
              ],
              correct: 0,
              explain: 'Exato. Erro vai acontecer, e quem entende o básico resolve em minutos.',
            },
          ],
        },
      ],
    },
    {
      id: 'como-a-web-funciona',
      title: 'Como um site funciona',
      summary: 'HTML, CSS e JavaScript: as três peças de qualquer página.',
      minutes: 8,
      blocks: [
        {
          type: 'p',
          text: 'Quando você abre um site, o navegador baixa arquivos e monta a página. Quase todo site tem três tipos de código trabalhando juntos:',
        },
        {
          type: 'list',
          items: [
            '**HTML**: a estrutura. Títulos, textos, botões, imagens. É o esqueleto.',
            '**CSS**: a aparência. Cores, fontes, tamanhos, posição. É a roupa.',
            '**JavaScript (JS)**: o comportamento. O que acontece quando você clica, digita ou rola. É o cérebro.',
          ],
        },
        {
          type: 'code',
          lang: 'html',
          code: `<!-- HTML: o botão existe -->
<button id="ola">Clique aqui</button>

<style>
  /* CSS: o botão fica laranja */
  #ola { background: orange; padding: 12px; }
</style>

<script>
  // JS: o botão faz alguma coisa
  document.getElementById('ola').onclick = () => alert('Oi!')
</script>`,
        },
        {
          type: 'p',
          text: 'Esse arquivo inteiro funciona sozinho. Salve como `teste.html`, abra no navegador e clique. Você acabou de rodar um site.',
        },
        {
          type: 'h',
          text: 'Front-end e back-end',
        },
        {
          type: 'p',
          text: '**Front-end** é o que roda no navegador da pessoa (o que vimos acima). **Back-end** é o que roda num servidor: guardar usuários, senhas, dados que precisam ficar salvos pra todo mundo. Pra começar, dá pra fazer muita coisa só com front-end. Quando precisar de login e banco de dados, serviços como **Firebase** ou **Supabase** fazem o back-end por você.',
        },
        {
          type: 'map',
          title: 'Peças de um site',
          root: {
            label: 'Site',
            children: [
              {
                label: 'Front-end',
                note: 'no navegador',
                children: [{ label: 'HTML', note: 'estrutura' }, { label: 'CSS', note: 'visual' }, { label: 'JS', note: 'comportamento' }],
              },
              {
                label: 'Back-end',
                note: 'no servidor',
                children: [{ label: 'Login' }, { label: 'Banco de dados' }, { label: 'APIs' }],
              },
              { label: 'Hospedagem', note: 'onde fica online', children: [{ label: 'GitHub Pages' }, { label: 'Vercel / Netlify' }] },
            ],
          },
        },
        {
          type: 'links',
          items: [
            { label: 'MDN: aprenda desenvolvimento web (em português)', url: 'https://developer.mozilla.org/pt-BR/docs/Learn', kind: 'doc' },
            { label: 'Vídeos: HTML, CSS e JavaScript para iniciantes', url: yt('html css javascript para iniciantes'), kind: 'video' },
            { label: 'Vídeos: diferença entre front-end e back-end', url: yt('diferença front-end back-end'), kind: 'video' },
          ],
        },
        {
          type: 'quiz',
          id: 'q-web',
          questions: [
            {
              prompt: 'Você quer mudar a cor de um botão. Qual linguagem resolve?',
              options: ['HTML', 'CSS', 'JavaScript'],
              correct: 1,
              explain: 'CSS cuida da aparência: cores, fontes, espaçamentos.',
            },
            {
              prompt: 'O que acontece quando alguém clica num botão é responsabilidade de...',
              options: ['JavaScript', 'CSS', 'Do navegador sozinho'],
              correct: 0,
              explain: 'JavaScript é quem reage a cliques, digitação e outros eventos.',
            },
            {
              prompt: 'Login com senha que funciona em qualquer computador precisa de:',
              options: ['Só HTML', 'Um back-end (ex: Firebase)', 'Um CSS mais forte'],
              correct: 1,
              explain: 'Dados compartilhados entre aparelhos precisam ficar num servidor.',
            },
          ],
        },
      ],
    },
    {
      id: 'ferramentas',
      title: 'Seu kit de ferramentas',
      summary: 'O que instalar (pouca coisa) e onde criar conta.',
      minutes: 5,
      blocks: [
        { type: 'p', text: 'Você não precisa de computador potente. Precisa disso aqui:' },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Um navegador** (Chrome, Edge ou Firefox). Ele roda seu site e mostra os erros.',
            '**VS Code**: editor de código gratuito. É onde você cola e organiza o que a IA gerar.',
            '**Conta no GitHub**: guarda seu código e publica seu site de graça.',
            '**Claude**: a IA que vamos usar pra escrever e corrigir código.',
            '**ChatGPT**: ajuda a montar prompts e criar imagens pro projeto.',
          ],
        },
        {
          type: 'tip',
          title: 'Sem computador?',
          text: 'O GitHub tem o **Codespaces**, um VS Code que roda no navegador. Dá pra fazer a trilha inteira por ele.',
        },
        {
          type: 'links',
          title: 'Onde baixar e criar conta',
          items: [
            { label: 'VS Code', url: 'https://code.visualstudio.com/', kind: 'tool' },
            { label: 'GitHub', url: 'https://github.com/', kind: 'tool' },
            { label: 'Claude', url: 'https://claude.ai/', kind: 'tool' },
            { label: 'ChatGPT', url: 'https://chatgpt.com/', kind: 'tool' },
            { label: 'Vídeos: como instalar e configurar o VS Code', url: yt('como instalar vs code iniciantes'), kind: 'video' },
          ],
        },
        {
          type: 'quiz',
          id: 'q-ferramentas',
          questions: [
            {
              prompt: 'Pra que serve o GitHub nesta trilha?',
              options: ['Escrever o código por você', 'Guardar seu código e publicar o site', 'Criar as imagens'],
              correct: 1,
              explain: 'GitHub guarda as versões do código e, com o GitHub Pages, deixa o site no ar.',
            },
          ],
        },
      ],
    },
  ],
}
