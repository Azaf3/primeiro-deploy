import type { Module } from './types'

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`

export const fundamentos: Module = {
  id: 'fundamentos',
  title: 'Antes de tudo',
  description: 'O mínimo que você precisa entender pra não ficar perdido quando a IA começar a gerar código.',
  lessons: [
    {
      id: 'git-e-github-conta',
      title: 'Git, GitHub e sua conta',
      summary: 'A diferença entre os dois (que todo mundo confunde) e sua conta criada em 10 minutos.',
      minutes: 10,
      onlyWithoutGithub: true,
      blocks: [
        {
          type: 'p',
          text: 'Antes de começar, vamos resolver uma confusão clássica: **Git** e **GitHub** não são a mesma coisa. Os nomes são parecidos, mas um é uma ferramenta e o outro é um site.',
        },
        { type: 'h', text: 'Git: o "salvar jogo" do código' },
        {
          type: 'p',
          text: 'Sabe quando você salva o jogo antes da fase difícil, pra poder voltar se der ruim? O **Git** faz isso com seu projeto. Ele é um programa que roda no **seu computador** e guarda versões do código ao longo do tempo. Cada versão salva se chama **commit**.',
        },
        {
          type: 'p',
          text: 'Com o Git você pode testar uma mudança sem medo: se quebrar tudo, você volta pra versão que funcionava. Ele funciona até sem internet.',
        },
        { type: 'h', text: 'GitHub: a nuvem onde o código mora' },
        {
          type: 'p',
          text: 'O **GitHub** é um **site** que guarda seus projetos do Git na internet. Pense nele como um Google Drive feito pra código. Com ele você:',
        },
        {
          type: 'list',
          items: [
            'Não perde o projeto se o computador quebrar.',
            'Acessa o código de qualquer lugar (até pelo navegador, com o Codespaces).',
            '**Publica seu site de graça** com o GitHub Pages. É assim que seu projeto vai ganhar um link.',
            'Monta um **portfólio**: recrutadores olham o GitHub de quem se candidata pra vaga de dev.',
          ],
        },
        {
          type: 'map',
          title: 'Git x GitHub',
          root: {
            label: 'Seu projeto',
            children: [
              {
                label: 'Git',
                note: 'programa no seu PC',
                children: [{ label: 'Salva versões (commits)' }, { label: 'Volta no tempo' }, { label: 'Funciona offline' }],
              },
              {
                label: 'GitHub',
                note: 'site na nuvem',
                children: [{ label: 'Guarda online' }, { label: 'Publica o site' }, { label: 'Vira portfólio' }],
              },
              { label: 'git push', note: 'a ponte', children: [{ label: 'Manda do Git pro GitHub' }] },
            ],
          },
        },
        {
          type: 'tip',
          title: 'Resumindo numa frase',
          text: 'Git é a ferramenta que salva as versões. GitHub é o lugar online onde essas versões ficam guardadas e viram site.',
        },
        { type: 'h', text: 'Criando sua conta no GitHub' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Acesse **github.com/signup** (link abaixo).',
            'Digite seu **email**. Use um que você acessa sempre: o GitHub manda um código de confirmação.',
            'Crie uma **senha** forte (pelo menos 15 caracteres, ou 8 com número e letra minúscula).',
            'Escolha seu **nome de usuário**. Ele aparece no link dos seus sites, tipo `seu-usuario.github.io`. Veja as dicas abaixo antes de escolher.',
            'Resolva o desafio de verificação (aquele "prove que não é robô").',
            'Abra seu email, copie o **código** que o GitHub mandou e cole na tela.',
            'Pronto! Se ele fizer perguntas sobre como você vai usar, pode pular ou responder qualquer coisa. Escolha o plano **Free**.',
          ],
        },
        {
          type: 'tip',
          tone: 'warn',
          title: 'Escolha bem o nome de usuário',
          text: 'Ele vai estar no link de todos os seus projetos e no seu currículo. Prefira algo curto e profissional, como seu nome ou apelido (`joaosilva`, `ana-dev`). Evite `xXmatadorXx2009`. Dá pra mudar depois, mas os links antigos param de funcionar.',
        },
        { type: 'h', text: 'Deixando a conta pronta' },
        {
          type: 'list',
          items: [
            '**Foto de perfil**: clique na sua foto (canto superior direito) > **Settings** > **Profile**. Uma foto sua ou um avatar simples.',
            '**Bio**: uma linha sobre você, tipo "Aprendendo programação e construindo meus primeiros projetos".',
            '**Verificação em duas etapas (2FA)**: em **Settings > Password and authentication**. O GitHub pede isso pra quem publica código. Use um app autenticador no celular (Google Authenticator, Microsoft Authenticator) e **guarde os códigos de recuperação** num lugar seguro.',
          ],
        },
        {
          type: 'links',
          title: 'Pra criar e aprender mais',
          items: [
            { label: 'Criar conta no GitHub', url: 'https://github.com/signup', kind: 'tool' },
            { label: 'Documentação do GitHub em português: primeiros passos', url: 'https://docs.github.com/pt/get-started', kind: 'doc' },
            {
              label: 'Vídeos: diferença entre Git e GitHub',
              url: 'https://www.youtube.com/results?search_query=diferen%C3%A7a+entre+git+e+github',
              kind: 'video',
            },
            {
              label: 'Vídeos: como criar conta no GitHub',
              url: 'https://www.youtube.com/results?search_query=como+criar+conta+no+github',
              kind: 'video',
            },
          ],
        },
        {
          type: 'quiz',
          id: 'q-git-github',
          questions: [
            {
              prompt: 'Qual a diferença entre Git e GitHub?',
              options: [
                'São a mesma coisa com nomes diferentes',
                'Git é um programa que salva versões no seu PC; GitHub é um site que guarda essas versões online',
                'Git é pago e GitHub é grátis',
              ],
              correct: 1,
              explain: 'Isso. Um é a ferramenta, o outro é o lugar onde o código fica online.',
            },
            {
              prompt: 'Você mudou o código e quebrou tudo. Quem te deixa voltar pra versão que funcionava?',
              options: ['O Git, pelos commits', 'O navegador', 'Ninguém, tem que refazer'],
              correct: 0,
              explain: 'Cada commit é um ponto salvo. Dá pra voltar pra qualquer um deles.',
            },
            {
              prompt: 'Por que escolher um nome de usuário profissional no GitHub?',
              options: [
                'Porque o GitHub bloqueia nomes engraçados',
                'Porque ele aparece no link dos seus sites e recrutadores vão ver',
                'Não importa',
              ],
              correct: 1,
              explain: 'Seu usuário vira parte do endereço dos seus projetos, tipo `seu-usuario.github.io`.',
            },
          ],
        },
        {
          type: 'tip',
          title: 'Feito?',
          text: 'Se você já criou a conta, conclua esta aula e siga pra próxima. Na aula **Git e GitHub sem medo**, mais pra frente, você vai usar o Git de verdade.',
        },
      ],
    },
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
