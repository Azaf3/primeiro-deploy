import type { Module } from './types'

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`

export const projeto: Module = {
  id: 'projeto',
  title: 'Seu primeiro projeto',
  description: 'Da ideia ao site no ar, usando Claude pra construir e GitHub pra publicar.',
  lessons: [
    {
      id: 'escolha-o-projeto',
      title: 'Escolha um projeto pequeno',
      summary: 'O primeiro projeto precisa caber num fim de semana.',
      minutes: 5,
      blocks: [
        {
          type: 'p',
          text: 'O erro mais comum de quem começa é escolher algo grande demais ("um app tipo iFood"). Escolha algo que você consiga terminar e mostrar pra alguém em poucos dias.',
        },
        {
          type: 'list',
          items: [
            '**Página pessoal**: quem você é, o que faz, links pras redes.',
            '**Cardápio online** de um comércio do bairro.',
            '**Lista de tarefas** que fica salva no navegador.',
            '**Calculadora** útil: divisão de conta, IMC, conversão de receita.',
            '**Página de evento**: aniversário, chá de bebê, com contagem regressiva.',
          ],
        },
        {
          type: 'tip',
          title: 'Teste do fim de semana',
          text: 'Se você não consegue explicar o projeto em uma frase e listar no máximo 3 coisas que ele faz, ele ainda está grande demais.',
        },
        {
          type: 'prompt',
          title: 'Plano de 1 página',
          tool: 'ChatGPT',
          text: `Me ajude a planejar meu primeiro projeto de programação. Sou iniciante.

Projeto: [uma frase]

Monte um plano curto com:
1. Objetivo em uma frase
2. No máximo 3 funcionalidades essenciais
3. Seções da página, na ordem
4. O que fica pra uma versão 2 (coisas legais, mas não essenciais)

Seja direto e realista pra alguém que vai fazer isso em um fim de semana.`,
        },
        {
          type: 'quiz',
          id: 'q-escopo',
          questions: [
            {
              prompt: 'Qual destes é um bom primeiro projeto?',
              options: ['Uma rede social completa', 'Um cardápio online de uma lanchonete', 'Um app de banco'],
              correct: 1,
              explain: 'Pequeno, útil e dá pra terminar rápido.',
            },
          ],
        },
      ],
    },
    {
      id: 'do-prompt-ao-codigo',
      title: 'Do prompt ao código',
      summary: 'Mandar o pedido pro Claude, salvar o arquivo e ver funcionando.',
      minutes: 10,
      blocks: [
        { type: 'p', text: 'Com o plano em mãos, é hora de construir. O passo a passo:' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Crie uma pasta pro projeto no seu computador (ex: `meu-cardapio`).',
            'Abra a pasta no VS Code (**Arquivo > Abrir pasta**).',
            'Crie um arquivo chamado `index.html`. Esse nome importa: é a página inicial.',
            'Mande o prompt pro Claude.',
            'Copie o código inteiro da resposta e cole no `index.html`. Salve.',
            'Dê dois cliques no arquivo pra abrir no navegador.',
          ],
        },
        {
          type: 'prompt',
          title: 'Pedido de construção',
          tool: 'Claude',
          text: `Sou iniciante e vou construir meu primeiro site. Aqui está o plano:

[cole aqui o plano de 1 página]

Regras:
- Um único arquivo index.html com CSS dentro de <style> e JavaScript dentro de <script>
- Sem frameworks e sem bibliotecas externas
- Responsivo (bom no celular)
- Código com comentários curtos em português explicando cada seção
- Se precisar guardar dados, use localStorage

Me mande o arquivo completo. Depois, liste em tópicos curtos as partes do código, pra eu saber onde mexer quando quiser mudar algo.`,
        },
        { type: 'h', text: 'Fazendo mudanças' },
        {
          type: 'p',
          text: 'Na mesma conversa, peça mudanças pequenas, uma de cada vez. Sempre teste depois de cada mudança. Se quebrar, você sabe exatamente o que causou.',
        },
        {
          type: 'prompt',
          title: 'Pedido de ajuste',
          tool: 'Claude',
          text: `No código que você me mandou, quero só esta mudança:
[descreva a mudança]

Mantenha todo o resto igual. Me mande o arquivo completo atualizado e diga em uma frase o que mudou.`,
        },
        {
          type: 'tip',
          title: 'Guarde versões',
          text: 'Antes de pedir uma mudança grande, salve uma cópia do arquivo que funciona (ex: `index-v1.html`). Na aula de Git você vai aprender o jeito certo de fazer isso.',
        },
        {
          type: 'links',
          items: [
            { label: 'Vídeos: como abrir um arquivo HTML no navegador', url: yt('como criar e abrir arquivo html vs code'), kind: 'video' },
            { label: 'Extensão Live Server do VS Code (atualiza a página sozinha)', url: yt('live server vs code'), kind: 'video' },
          ],
        },
        {
          type: 'quiz',
          id: 'q-construcao',
          questions: [
            {
              prompt: 'Por que o arquivo se chama `index.html`?',
              options: [
                'É o nome que servidores abrem por padrão como página inicial',
                'É obrigatório em todo arquivo',
                'Pra IA entender',
              ],
              correct: 0,
              explain: 'Quando você publica, o GitHub Pages procura o index.html pra mostrar primeiro.',
            },
            {
              prompt: 'Qual o melhor jeito de pedir mudanças?',
              options: ['Várias de uma vez', 'Uma de cada vez, testando depois de cada', 'Só no final'],
              correct: 1,
              explain: 'Se quebrar, você sabe exatamente qual mudança causou o problema.',
            },
          ],
        },
      ],
    },
    {
      id: 'leia-antes-de-aceitar',
      title: 'Leia antes de aceitar',
      summary: 'Uma checagem rápida que separa quem usa IA de quem é usado por ela.',
      minutes: 6,
      blocks: [
        {
          type: 'p',
          text: 'Você não precisa entender cada linha. Mas antes de aceitar um código, passe por esta checagem:',
        },
        {
          type: 'list',
          items: [
            '**Funciona no caminho feliz?** Faça o que a página promete.',
            '**E fora dele?** Clique no botão sem preencher nada. Digite letras onde pede número. Abra no celular.',
            '**Tem alguma senha ou chave no código?** Se tiver, apague. Código no GitHub é público.',
            '**Você sabe onde mudar o texto e as cores?** Se não, peça pro Claude te mostrar.',
          ],
        },
        {
          type: 'prompt',
          title: 'Me explica esse código',
          tool: 'Claude',
          text: `Sou iniciante. Explique este trecho de código linha por linha, em português simples, como se eu nunca tivesse programado. No final, me diga uma coisa que poderia dar errado nele.

[cole o trecho]`,
        },
        {
          type: 'prompt',
          title: 'Revisão de problemas',
          tool: 'Claude',
          text: `Revise o código abaixo procurando problemas que um iniciante não perceberia: o que acontece se o usuário deixar campos vazios, digitar valores estranhos, usar no celular ou ficar sem internet. Liste os problemas em ordem de importância e corrija os 3 primeiros.

[cole o código]`,
        },
        {
          type: 'quiz',
          id: 'q-checagem',
          questions: [
            {
              prompt: 'A IA colocou uma chave de API direto no código. O que fazer antes de subir pro GitHub?',
              options: ['Nada, é normal', 'Remover a chave, porque o código fica público', 'Colocar em letras maiúsculas'],
              correct: 1,
              explain: 'Qualquer pessoa pode ver o código de um repositório público.',
            },
            {
              prompt: 'Testar "fora do caminho feliz" significa:',
              options: [
                'Testar só quando está de mau humor',
                'Fazer coisas que o usuário não deveria, tipo enviar formulário vazio',
                'Testar em outro computador',
              ],
              correct: 1,
              explain: 'Usuário real faz coisa inesperada. Melhor você descobrir antes.',
            },
          ],
        },
      ],
    },
    {
      id: 'quando-da-erro',
      title: 'Quando dá erro',
      summary: 'Erro não é fracasso, é informação. Aprenda a ler e pedir ajuda direito.',
      minutes: 8,
      blocks: [
        {
          type: 'p',
          text: 'Todo programador vê erro o dia inteiro. A diferença é saber onde olhar. No navegador, aperte **F12** (ou clique com o botão direito > Inspecionar) e abra a aba **Console**. Erros aparecem em vermelho.',
        },
        {
          type: 'code',
          lang: 'exemplo de erro no console',
          code: `Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at index.html:42`,
        },
        {
          type: 'list',
          items: [
            '**O tipo**: `TypeError` (usou algo do jeito errado).',
            '**A mensagem**: tentou usar `addEventListener` em algo que é `null`, ou seja, não existe.',
            '**O local**: linha 42 do `index.html`. Comece olhando lá.',
          ],
        },
        {
          type: 'p',
          text: 'Nesse caso clássico, o código procurou um elemento pelo id e não achou. Geralmente o id está escrito diferente no HTML e no JS.',
        },
        {
          type: 'prompt',
          title: 'Pedindo ajuda com erro',
          tool: 'Claude',
          text: `Meu site deu erro. Sou iniciante.

O que eu estava fazendo: [ex: cliquei no botão de adicionar]
O que esperava: [ex: o item aparecer na lista]
O que aconteceu: [ex: nada aconteceu]

Erro do console (copiado inteiro):
[cole o erro]

Código:
[cole o arquivo ou o trecho perto da linha do erro]

Me explique a causa em uma frase e mande a correção.`,
        },
        {
          type: 'tip',
          tone: 'warn',
          title: 'Se a IA entrar em loop',
          text: 'Se depois de 3 tentativas o erro continua, pare. Volte pra última versão que funcionava e peça a mudança de um jeito diferente, em passos menores.',
        },
        {
          type: 'links',
          items: [
            { label: 'Vídeos: como usar o DevTools e o console do Chrome', url: yt('chrome devtools console iniciantes'), kind: 'video' },
          ],
        },
        {
          type: 'quiz',
          id: 'q-erros',
          questions: [
            {
              prompt: 'Onde você vê os erros de JavaScript de uma página?',
              options: ['No console do navegador (F12)', 'No Bloco de Notas', 'Não dá pra ver'],
              correct: 0,
              explain: 'O console mostra o erro, a mensagem e a linha.',
            },
            {
              prompt: 'O que NÃO pode faltar quando você pede ajuda com um erro?',
              options: ['Um pedido de desculpas', 'A mensagem de erro completa e o código', 'Um print da tela inteira do computador'],
              correct: 1,
              explain: 'Com o erro exato e o código, a IA acha a causa muito mais rápido.',
            },
          ],
        },
      ],
    },
    {
      id: 'git-github',
      title: 'Git e GitHub sem medo',
      summary: 'Salvar versões do projeto e nunca mais perder o que funcionava.',
      minutes: 10,
      blocks: [
        {
          type: 'p',
          text: '**Git** é um programa que tira "fotos" do seu projeto ao longo do tempo. Cada foto se chama **commit**. Se algo quebrar, você volta pra foto anterior. **GitHub** é o site onde essas fotos ficam guardadas online.',
        },
        {
          type: 'map',
          title: 'Vocabulário do Git',
          root: {
            label: 'Git',
            children: [
              { label: 'Repositório', note: 'a pasta do projeto com histórico' },
              { label: 'Commit', note: 'uma foto salva com mensagem' },
              { label: 'Push', note: 'manda as fotos pro GitHub' },
              { label: 'Pull', note: 'traz as fotos do GitHub' },
            ],
          },
        },
        { type: 'h', text: 'Os comandos do dia a dia' },
        {
          type: 'code',
          lang: 'terminal',
          code: `# só na primeira vez, dentro da pasta do projeto
git init
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/meu-cardapio.git

# toda vez que quiser salvar uma versão
git add .
git commit -m "adiciona seção de bebidas"
git push -u origin main`,
        },
        {
          type: 'tip',
          title: 'Prefere clicar?',
          text: 'O VS Code tem uma aba de **Controle de Código-Fonte** (ícone de ramificação na lateral) que faz tudo isso com botões. E o GitHub Desktop também resolve sem terminal.',
        },
        {
          type: 'tip',
          title: 'Mensagens de commit',
          text: 'Escreva o que mudou, curto e no presente: "adiciona botão de pedido", "corrige preço das bebidas". Daqui a um mês você vai agradecer.',
        },
        {
          type: 'links',
          items: [
            { label: 'Livro Pro Git em português (gratuito)', url: 'https://git-scm.com/book/pt-br/v2', kind: 'doc' },
            { label: 'GitHub Desktop', url: 'https://desktop.github.com/', kind: 'tool' },
            { label: 'Vídeos: Git e GitHub para iniciantes', url: yt('git e github para iniciantes'), kind: 'video' },
          ],
        },
        {
          type: 'quiz',
          id: 'q-git',
          questions: [
            {
              prompt: 'O que é um commit?',
              options: ['Um erro no código', 'Uma versão salva do projeto, com uma mensagem', 'O site do GitHub'],
              correct: 1,
              explain: 'Commit é uma foto do projeto naquele momento.',
            },
            {
              prompt: 'Qual comando manda seus commits pro GitHub?',
              options: ['git push', 'git add', 'git init'],
              correct: 0,
              explain: '`git push` envia. `git add` prepara, `git init` começa o repositório.',
            },
          ],
        },
      ],
    },
    {
      id: 'publicando',
      title: 'Publicando no GitHub Pages',
      summary: 'Seu site com link pra mandar no grupo da família. De graça.',
      minutes: 6,
      blocks: [
        { type: 'p', text: 'Com o código no GitHub, publicar leva dois minutos:' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Abra o repositório no GitHub.',
            'Vá em **Settings** e depois **Pages** (no menu da esquerda).',
            'Em **Source**, escolha **Deploy from a branch**.',
            'Em **Branch**, escolha `main` e a pasta `/ (root)`. Clique em **Save**.',
            'Espere 1 ou 2 minutos e recarregue. O link aparece no topo: `https://SEU-USUARIO.github.io/meu-cardapio/`',
          ],
        },
        {
          type: 'tip',
          title: 'Atualizou o código?',
          text: 'Cada `git push` atualiza o site sozinho em cerca de um minuto. Se não mudou, aperte Ctrl + Shift + R pra forçar o navegador a baixar a versão nova.',
        },
        {
          type: 'tip',
          tone: 'warn',
          title: 'Deu 404?',
          text: 'Confira se o arquivo se chama exatamente `index.html` (tudo minúsculo) e se está na raiz do repositório, não dentro de uma subpasta.',
        },
        {
          type: 'links',
          items: [
            {
              label: 'Documentação oficial do GitHub Pages (em português)',
              url: 'https://docs.github.com/pt/pages/getting-started-with-github-pages',
              kind: 'doc',
            },
            { label: 'Vídeos: como publicar site no GitHub Pages', url: yt('como publicar site github pages'), kind: 'video' },
          ],
        },
        {
          type: 'quiz',
          id: 'q-pages',
          questions: [
            {
              prompt: 'Seu site publicado deu 404. Qual a primeira coisa a conferir?',
              options: ['Se o arquivo se chama index.html e está na raiz', 'Se o computador está ligado', 'A cor do site'],
              correct: 0,
              explain: 'É a causa número 1 de 404 no GitHub Pages.',
            },
          ],
        },
      ],
    },
  ],
}
