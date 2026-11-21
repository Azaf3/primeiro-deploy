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
      summary: 'Mandar o pedido pro Claude, salvar o arquivo e ver funcionando no seu computador.',
      minutes: 13,
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
        { type: 'h', text: 'Rodando local x rodando no ar' },
        {
          type: 'p',
          text: 'Seu projeto vai viver em dois lugares, e é importante saber qual você está vendo:',
        },
        {
          type: 'map',
          title: 'Onde o projeto roda',
          root: {
            label: 'Seu index.html',
            children: [
              {
                label: 'Local',
                note: 'só no seu PC',
                children: [
                  { label: 'Abre com dois cliques' },
                  { label: 'Ou com o Live Server' },
                  { label: 'Pra testar e mexer' },
                ],
              },
              {
                label: 'No ar',
                note: 'na internet',
                children: [{ label: 'GitHub Pages' }, { label: 'Link pra qualquer um' }, { label: 'Atualiza a cada push' }],
              },
            ],
          },
        },
        {
          type: 'list',
          items: [
            '**Local** é o arquivo rodando no seu computador. O endereço começa com `file://` (dois cliques) ou `http://127.0.0.1:5500` (Live Server). Só você vê. É aqui que você testa cada mudança antes de publicar.',
            '**No ar** é a versão publicada, com endereço tipo `https://seu-usuario.github.io/projeto/`. Qualquer pessoa abre. Ela só muda quando você manda as mudanças pro GitHub.',
          ],
        },
        {
          type: 'tip',
          title: 'Use o Live Server',
          text: 'No VS Code, instale a extensão **Live Server** e clique em **Go Live** (canto inferior direito). O site abre no navegador e **atualiza sozinho** toda vez que você salva o arquivo. Algumas coisas (como carregar arquivos de outra pasta) só funcionam assim, e não com dois cliques.',
        },
        {
          type: 'tip',
          title: 'Usando o Codespaces?',
          text: 'Lá não dá pra dar dois cliques no arquivo. Instale o **Live Server** no Codespaces, clique em **Go Live** e depois em **Abrir no navegador** no aviso que aparecer. Ele cria um link temporário só seu pra testar.',
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
              prompt: 'Você abriu seu projeto pelo Live Server e mandou o link `http://127.0.0.1:5500` pra um amigo. O que acontece?',
              options: [
                'Ele vê seu site normalmente',
                'Não abre: esse endereço é local, só funciona no seu computador',
                'Abre só no celular',
              ],
              correct: 1,
              explain: 'Endereço local só existe na sua máquina. Pra outras pessoas verem, o projeto precisa estar no ar (GitHub Pages).',
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
      title: 'Publicando: com o Claude ou na mão',
      summary: 'Conecte o Claude ao seu GitHub pra ele publicar por você. Regra da trilha: todo projeto vai pro ar.',
      minutes: 18,
      blocks: [
        {
          type: 'p',
          text: '**Regra desta trilha: todo projeto que você fizer aqui vai pro GitHub e fica no ar.** Projeto que só existe no seu computador não conta pra portfólio, não dá pra mandar pra ninguém e some se o PC quebrar. A partir de agora, as aulas de projeto só são concluídas com o link publicado.',
        },
        {
          type: 'map',
          title: 'Dois caminhos pro mesmo lugar',
          root: {
            label: 'Projeto no ar',
            children: [
              {
                label: 'Caminho A',
                note: 'o Claude publica',
                children: [{ label: 'claude.ai/code' }, { label: 'Conecta no seu GitHub' }, { label: 'Você só aprova' }],
              },
              {
                label: 'Caminho B',
                note: 'na mão, grátis',
                children: [{ label: 'git add / commit' }, { label: 'git push' }],
              },
              { label: 'GitHub Pages', note: 'nos dois', children: [{ label: 'Link seu-usuario.github.io' }] },
            ],
          },
        },
        { type: 'h', text: 'Caminho A: o Claude publica por você' },
        {
          type: 'p',
          text: 'O **Claude Code na web** (claude.ai/code) é uma versão do Claude que trabalha direto no seu GitHub: ele pega o repositório, escreve os arquivos, salva as versões e manda tudo pra lá. Você descreve o que quer e aprova o resultado.',
        },
        {
          type: 'tip',
          tone: 'warn',
          title: 'Precisa de plano pago',
          text: 'O Claude Code na web funciona nos planos **Pro** ou superiores do Claude, não no plano grátis. Se você está no grátis, use o **Caminho B** mais abaixo: o resultado é o mesmo.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Crie o repositório**: em github.com/new, dê o nome do projeto, deixe **Public** e marque **Add a README file**. O Claude Code precisa de um repositório que já exista e não esteja vazio.',
            '**Conecte o Claude ao GitHub**: entre em **claude.ai/code** com sua conta do Claude. Ele pede pra conectar o GitHub: siga o aviso, autorize na página do GitHub e você volta pro Claude. Isso é feito **uma vez só**.',
            '**Escolha o repositório** no seletor que fica embaixo da caixa de texto. Repositórios públicos já aparecem. (Pra usar repositórios privados, o Claude pede pra instalar o app **Claude** no seu GitHub.)',
            '**Escolha o modo** no controle de permissão: **Accept edits** (ele faz e publica sem parar pra perguntar) ou **Plan** (ele mostra o plano e espera você aprovar antes de mexer).',
            '**Mande o prompt** abaixo e acompanhe. Pode até fechar a aba: ele continua trabalhando.',
            'Quando terminar, ele **sobe uma branch** (uma versão paralela) com as mudanças. Confira no painel de diferenças, clique em **Create PR** e depois, no GitHub, em **Merge pull request**. Agora as mudanças estão na `main`.',
            '**Ligue o site**: no repositório, **Settings > Pages > Deploy from a branch > main / (root) > Save**. Em 1 ou 2 minutos está no ar.',
          ],
        },
        {
          type: 'prompt',
          title: 'Pedindo pro Claude construir e publicar',
          tool: 'Claude',
          text: `Este repositório vai ser meu projeto: [descreva em uma frase, ou cole o plano de 1 página].

Sou iniciante. Regras:
- Crie um único arquivo index.html na raiz, com CSS dentro de <style> e JavaScript dentro de <script>
- Sem frameworks e sem bibliotecas externas
- Responsivo (bom no celular)
- Comentários curtos em português explicando cada seção
- Atualize o README.md com uma descrição curta do projeto

Ao terminar, faça o commit com uma mensagem clara em português e me explique em tópicos curtos o que cada parte do código faz.`,
        },
        {
          type: 'tip',
          title: 'Por que o Claude não publica direto na main?',
          text: 'De propósito: ele trabalha numa branch separada e **você** decide se entra. O "Merge pull request" é você dizendo "conferi, pode publicar". É o mesmo jeito que times de dev trabalham.',
        },
        { type: 'h', text: 'Caminho B: na mão, com git (grátis)' },
        {
          type: 'p',
          text: 'Crie o repositório em github.com/new, **Public**, e dessa vez **sem** README (o seu projeto já tem arquivos). Depois, no terminal, dentro da pasta do projeto:',
        },
        {
          type: 'code',
          lang: 'terminal',
          code: `git init
git add .
git commit -m "primeira versão"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-PROJETO.git
git push -u origin main`,
        },
        {
          type: 'p',
          text: 'Depois ligue o site igual ao passo 7 do Caminho A: **Settings > Pages > Deploy from a branch > main / (root) > Save**.',
        },
        {
          type: 'tip',
          tone: 'warn',
          title: 'Deu 404?',
          text: 'Confira se o arquivo se chama exatamente `index.html` (tudo minúsculo), se está na raiz do repositório e se já passaram uns 2 minutos. Cada `git push` (ou merge) atualiza o site sozinho.',
        },
        {
          type: 'links',
          items: [
            { label: 'Claude Code na web', url: 'https://claude.ai/code', kind: 'tool' },
            { label: 'Guia oficial: começando com o Claude Code na web (em inglês)', url: 'https://code.claude.com/docs/en/web-quickstart', kind: 'doc' },
            { label: 'Criar repositório no GitHub', url: 'https://github.com/new', kind: 'tool' },
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
              prompt: 'O Claude Code terminou e subiu uma branch. O que falta pro site atualizar?',
              options: [
                'Nada, já está no ar',
                'Criar o PR e fazer o merge na main',
                'Apagar o repositório e criar de novo',
              ],
              correct: 1,
              explain: 'O site é publicado a partir da `main`. O merge é você aprovando as mudanças.',
            },
            {
              prompt: 'Seu site publicado deu 404. Qual a primeira coisa a conferir?',
              options: ['Se o arquivo se chama index.html e está na raiz', 'Se o computador está ligado', 'A cor do site'],
              correct: 0,
              explain: 'É a causa número 1 de 404 no GitHub Pages.',
            },
          ],
        },
        { type: 'h', text: 'Conferindo no ar' },
        {
          type: 'p',
          text: 'Publicou? Agora teste a versão **no ar**, não a local. Muita coisa funciona no seu PC e quebra online:',
        },
        {
          type: 'list',
          items: [
            'Abra o link do GitHub Pages e aperte **Ctrl + Shift + R**. Isso força o navegador a baixar a versão nova em vez de mostrar uma guardada.',
            'Abra o mesmo link **no celular**. É assim que a maioria das pessoas vai ver.',
            'Aperte **F12 > Console** no site publicado. Erro vermelho de arquivo não encontrado (404) quase sempre é nome de arquivo com letra maiúscula diferente: no seu PC `Logo.png` e `logo.png` podem ser iguais, no ar não são.',
            'Imagem ou arquivo que não aparece? Use caminhos relativos, tipo `logo.png` ou `img/logo.png`, nunca `C:/Users/...`.',
            'Mudou algo? Teste **local** primeiro, depois publique (push ou merge) e confira **no ar** de novo.',
          ],
        },
        {
          type: 'deploy',
          id: 'deploy-primeiro-projeto',
          title: 'Publique seu primeiro projeto',
          text: 'Publique o projeto que você construiu neste módulo (pelo Caminho A ou B) e cole os links abaixo. A plataforma confere se o repositório existe e se o site abre.',
        },
      ],
    },
  ],
}
