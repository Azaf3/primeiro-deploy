import type { Module } from './types'

export const guiado: Module = {
  id: 'guiado',
  title: 'Projeto guiado',
  description: 'Juntando tudo: um cardápio online feito do zero, com IA, até estar no ar com link pra compartilhar.',
  lessons: [
    {
      id: 'guiado-construir',
      title: 'Cardápio do zero: planejar e construir',
      summary: 'Da ideia ao primeiro index.html funcionando, seguindo o fluxo ChatGPT, Claude e você.',
      minutes: 15,
      blocks: [
        {
          type: 'p',
          text: 'Agora é pra valer. Nestas duas aulas você vai construir um **cardápio online** de uma lanchonete (pode ser real, de alguém que você conhece, ou inventada). No final ele vai estar publicado com um link seu.',
        },
        {
          type: 'map',
          title: 'O caminho do projeto',
          root: {
            label: 'Cardápio online',
            children: [
              { label: '1. Planejar', note: 'ChatGPT', children: [{ label: 'Plano de 1 página' }, { label: 'Logo' }] },
              { label: '2. Construir', note: 'Claude', children: [{ label: 'index.html' }, { label: 'Ajustes' }] },
              { label: '3. Revisar', note: 'você', children: [{ label: 'Testar fora do caminho feliz' }, { label: 'Celular' }] },
              { label: '4. Publicar', note: 'GitHub', children: [{ label: 'Repositório' }, { label: 'Pages' }] },
            ],
          },
        },
        { type: 'h', text: 'Passo 1: o plano' },
        {
          type: 'p',
          text: 'Abra o ChatGPT e use o prompt abaixo. Responda as perguntas com calma. Se não souber algum preço, invente um valor realista: dá pra trocar depois.',
        },
        {
          type: 'prompt',
          title: 'Plano do cardápio',
          tool: 'ChatGPT',
          text: `Vou criar meu primeiro projeto de programação: um cardápio online de uma lanchonete. Sou iniciante.

Me faça até 6 perguntas, uma de cada vez, sobre: nome da lanchonete, categorias e itens (com preço), visual desejado e como o cliente faz o pedido.

No final, escreva um plano curto com:
1. Objetivo em uma frase
2. Lista completa de categorias e itens com nome, descrição curta e preço
3. No máximo 3 funcionalidades: mostrar o cardápio por categoria, montar um pedido somando os itens, e um botão que gera a mensagem do pedido pronta pra copiar
4. Paleta de cores (3 cores em hexadecimal) e uma fonte do Google Fonts
5. O que fica pra versão 2`,
        },
        {
          type: 'tip',
          title: 'Bônus: o logo',
          text: 'Na mesma conversa, use o prompt de logo da aula **Criando artes com IA**, trocando o nome e as cores pelas do seu plano. Salve a imagem como `logo.png` na pasta do projeto.',
        },
        { type: 'h', text: 'Passo 2: a construção' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Crie a pasta `meu-cardapio` e abra no VS Code.',
            'Crie o arquivo `index.html` (e coloque o `logo.png` na mesma pasta, se fez).',
            'Mande o prompt abaixo pro Claude, colando o plano no lugar indicado.',
            'Cole a resposta no `index.html`, salve e abra no navegador.',
          ],
        },
        {
          type: 'prompt',
          title: 'Construção do cardápio',
          tool: 'Claude',
          text: `Sou iniciante e estou fazendo meu primeiro site: um cardápio online. Aqui está o plano:

[cole aqui o plano do ChatGPT]

Regras:
- Um único arquivo index.html com CSS dentro de <style> e JavaScript dentro de <script>
- Sem frameworks e sem bibliotecas externas (só a fonte do Google Fonts)
- Os itens do cardápio ficam num array de objetos no JavaScript, pra eu editar fácil
- Cada item tem botões + e - pra escolher a quantidade
- Um resumo fixo no rodapé mostra o total do pedido em reais (formato R$ 0,00)
- Um botão "Copiar pedido" gera um texto com os itens, quantidades e total, e copia
- Se o pedido estiver vazio, o botão mostra um aviso em vez de copiar
- Responsivo (bom no celular)
- Se existir logo.png na pasta, mostre no topo
- Comentários curtos em português explicando cada seção

Me mande o arquivo completo. Depois, me diga em tópicos curtos: onde mudo os itens, onde mudo as cores e onde fica a função que monta a mensagem do pedido.`,
        },
        {
          type: 'tip',
          tone: 'warn',
          title: 'Não funcionou de primeira?',
          text: 'Normal. Abra o console (F12), copie o erro e use o prompt da aula **Quando dá erro**. Lembre: uma correção por vez, testando depois de cada uma.',
        },
        {
          type: 'quiz',
          id: 'q-guiado-1',
          questions: [
            {
              prompt: 'Por que pedir que os itens fiquem "num array de objetos no JavaScript"?',
              options: [
                'Pra deixar o código mais difícil',
                'Pra você conseguir adicionar e editar itens num lugar só, sem mexer no HTML',
                'Porque é obrigatório em todo site',
              ],
              correct: 1,
              explain: 'Dados num lugar só deixam o projeto fácil de manter. Você já sabe ler isso desde a aula de **Objetos**.',
            },
            {
              prompt: 'O Claude mandou o código e a página abriu em branco. Primeiro passo:',
              options: ['Pedir o projeto inteiro de novo', 'Abrir o console (F12) e ver o erro', 'Trocar de navegador'],
              correct: 1,
              explain: 'O console quase sempre diz exatamente o que quebrou e em qual linha.',
            },
          ],
        },
      ],
    },
    {
      id: 'guiado-publicar',
      title: 'Cardápio: revisar e publicar',
      summary: 'Testar como um cliente de verdade, entender a parte principal do código e colocar no ar.',
      minutes: 15,
      blocks: [
        {
          type: 'p',
          text: 'Com o cardápio funcionando no seu computador, falta deixar ele confiável e publicar. Essa é a parte que separa um projeto "feito com IA" de um projeto **seu**.',
        },
        { type: 'h', text: 'Passo 3: revisar como cliente' },
        {
          type: 'list',
          items: [
            'Clique em **Copiar pedido** sem escolher nada. Aparece um aviso?',
            'Adicione 3 itens, tire 1. O total bate com a conta de cabeça?',
            'Aperte o **-** num item que está em zero. Fica negativo? (não deveria)',
            'Abra no celular (ou F12 > ícone de celular). Dá pra usar com o dedo?',
            'Os preços aparecem com vírgula e 2 casas, tipo `R$ 18,50`?',
          ],
        },
        {
          type: 'prompt',
          title: 'Corrigindo o que achou',
          tool: 'Claude',
          text: `Testei o cardápio e achei estes problemas:
- [descreva cada problema, ex: "o botão - deixa a quantidade ficar negativa"]

Corrija só esses pontos, mantendo todo o resto igual. Me mande o arquivo completo e liste em uma linha o que mudou em cada correção.`,
        },
        { type: 'h', text: 'Entendendo o coração do código' },
        {
          type: 'p',
          text: 'A função que monta a mensagem do pedido é o centro do projeto. Escreva a sua versão abaixo: é parecida com o que o Claude gerou, e agora você sabe fazer na mão.',
        },
        {
          type: 'exercise',
          id: 'ex-mensagem-pedido',
          title: 'A mensagem do pedido',
          instructions:
            'Complete `mensagemPedido(itens)`. Cada item tem `nome`, `preco` e `quantidade`. Ignore itens com quantidade 0. Cada linha fica `"2x X-Salada"`, uma por linha (separadas por `"\\n"`), e a última linha é `"Total: R$ 37,00"`. Se nada foi pedido, devolva `"Pedido vazio"`.',
          starter: `function mensagemPedido(itens) {
  // 1. fique só com quantidade > 0
  // 2. se não sobrou nada, devolva "Pedido vazio"
  // 3. monte as linhas "2x Nome"
  // 4. calcule o total e formate com vírgula
}
`,
          tests: [
            {
              desc: 'dois itens com total',
              expr: 'mensagemPedido([{ nome: "X-Salada", preco: 18.5, quantidade: 2 }, { nome: "Suco", preco: 7, quantidade: 1 }])',
              expected: '2x X-Salada\n1x Suco\nTotal: R$ 44,00',
            },
            {
              desc: 'ignora quantidade 0',
              expr: 'mensagemPedido([{ nome: "X-Bacon", preco: 22, quantidade: 0 }, { nome: "Suco", preco: 7, quantidade: 3 }])',
              expected: '3x Suco\nTotal: R$ 21,00',
            },
            {
              desc: 'tudo zerado vira "Pedido vazio"',
              expr: 'mensagemPedido([{ nome: "Suco", preco: 7, quantidade: 0 }])',
              expected: 'Pedido vazio',
            },
            { desc: 'lista vazia vira "Pedido vazio"', expr: 'mensagemPedido([])', expected: 'Pedido vazio' },
          ],
          hint: 'Use `filter(i => i.quantidade > 0)`, depois `map(i => i.quantidade + "x " + i.nome)` e `join("\\n")`. O total sai de um `reduce`, e a formatação é `total.toFixed(2).replace(".", ",")`.',
          solution: `function mensagemPedido(itens) {
  const pedidos = itens.filter(i => i.quantidade > 0)
  if (pedidos.length === 0) return 'Pedido vazio'

  const linhas = pedidos.map(i => \`\${i.quantidade}x \${i.nome}\`)
  const total = pedidos.reduce((soma, i) => soma + i.preco * i.quantidade, 0)

  return [...linhas, \`Total: R$ \${total.toFixed(2).replace('.', ',')}\`].join('\\n')
}`,
        },
        { type: 'h', text: 'Passo 4: publicar' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Crie um repositório público no GitHub chamado `meu-cardapio` (sem README).',
            'Na pasta do projeto: `git init`, `git add .`, `git commit -m "primeira versão do cardápio"`.',
            '`git branch -M main`, `git remote add origin` com o link do repositório e `git push -u origin main`.',
            'No repositório: **Settings > Pages > Deploy from a branch > main / (root)**.',
            'Em 1 ou 2 minutos, seu link está no ar. Mande pra alguém testar!',
          ],
        },
        {
          type: 'tip',
          title: 'Você chegou ao fim da trilha',
          text: 'Você planejou com uma IA, construiu com outra, revisou como cliente, entendeu a lógica principal e publicou. Esse é o ciclo de qualquer projeto. Próximo passo: escolher outro projeto pequeno e repetir, agora sem o roteiro.',
        },
        {
          type: 'quiz',
          id: 'q-guiado-2',
          questions: [
            {
              prompt: 'Esse cardápio é um arquivo HTML puro. Qual opção de publicação usar no GitHub Pages?',
              options: ['Deploy from a branch, main / (root)', 'Precisa de um servidor pago', 'GitHub Actions com build'],
              correct: 0,
              explain: 'HTML puro não precisa de build: o GitHub publica o arquivo direto da branch.',
            },
            {
              prompt: 'Depois de publicado, você muda um preço. Como atualizar o site?',
              options: ['Criar outro repositório', 'Fazer commit e git push de novo', 'Esperar o GitHub perceber sozinho'],
              correct: 1,
              explain: 'Cada push atualiza o site em cerca de um minuto.',
            },
          ],
        },
      ],
    },
  ],
}
