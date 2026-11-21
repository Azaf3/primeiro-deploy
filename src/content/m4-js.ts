import type { Module } from './types'

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`

export const js: Module = {
  id: 'js',
  title: 'JavaScript pra entender a IA',
  description: 'O básico de JS pra você ler o que a IA escreve. Com exercícios que rodam aqui mesmo.',
  lessons: [
    {
      id: 'variaveis-funcoes',
      title: 'Variáveis e funções',
      summary: 'Guardar valores e criar pequenas máquinas que transformam esses valores.',
      minutes: 10,
      blocks: [
        {
          type: 'p',
          text: 'Uma **variável** é uma caixinha com nome que guarda um valor. Em JS moderno, usamos `const` (não vai mudar) e `let` (pode mudar).',
        },
        {
          type: 'code',
          lang: 'javascript',
          code: `const nome = 'Ana'      // texto (string)
let idade = 20          // número
const estudante = true  // verdadeiro ou falso (boolean)

idade = idade + 1       // let pode mudar
console.log(nome, idade) // mostra: Ana 21`,
        },
        {
          type: 'p',
          text: 'Uma **função** recebe valores (parâmetros), faz algo e devolve um resultado com `return`. Você vai ver isso em todo código que a IA gerar.',
        },
        {
          type: 'code',
          lang: 'javascript',
          code: `function somar(a, b) {
  return a + b
}

somar(2, 3) // 5`,
        },
        {
          type: 'exercise',
          id: 'ex-dobro',
          title: 'Sua primeira função',
          instructions: 'Complete a função `dobro` pra ela devolver o número recebido multiplicado por 2. Em JS, multiplicação é `*`.',
          starter: `function dobro(numero) {
  // escreva aqui
}
`,
          tests: [
            { desc: 'dobro(2) devolve 4', expr: 'dobro(2)', expected: 4 },
            { desc: 'dobro(10) devolve 20', expr: 'dobro(10)', expected: 20 },
            { desc: 'dobro(-3) devolve -6', expr: 'dobro(-3)', expected: -6 },
          ],
          hint: 'Você precisa de `return`. Sem ele a função devolve `undefined`.',
          solution: `function dobro(numero) {
  return numero * 2
}`,
        },
        {
          type: 'exercise',
          id: 'ex-saudacao',
          title: 'Juntando textos',
          instructions: 'Complete `saudacao` pra devolver `"Olá, NOME!"`. Dica: textos podem ser juntados com `+`, por exemplo `"Olá, " + nome`.',
          starter: `function saudacao(nome) {
  // escreva aqui
}
`,
          tests: [
            { desc: 'saudacao("Ana") devolve "Olá, Ana!"', expr: 'saudacao("Ana")', expected: 'Olá, Ana!' },
            { desc: 'saudacao("Bruno") devolve "Olá, Bruno!"', expr: 'saudacao("Bruno")', expected: 'Olá, Bruno!' },
          ],
          hint: 'Cuidado com a vírgula, o espaço e a exclamação. O teste compara letra por letra.',
          solution: `function saudacao(nome) {
  return \`Olá, \${nome}!\`
}`,
        },
        {
          type: 'links',
          items: [
            { label: 'MDN: primeiros passos com JavaScript', url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps', kind: 'doc' },
            { label: 'Vídeos: variáveis e funções em JavaScript', url: yt('javascript variáveis e funções iniciantes'), kind: 'video' },
          ],
        },
      ],
    },
    {
      id: 'condicionais',
      title: 'Condicionais',
      summary: 'Fazer o código tomar decisões com if e else.',
      minutes: 8,
      blocks: [
        { type: 'p', text: 'Com `if` o código escolhe um caminho dependendo de uma condição.' },
        {
          type: 'code',
          lang: 'javascript',
          code: `function frete(total) {
  if (total >= 100) {
    return 0          // frete grátis
  } else {
    return 15
  }
}`,
        },
        {
          type: 'list',
          items: [
            '`===` igual a, `!==` diferente de',
            '`>` maior, `<` menor, `>=` maior ou igual, `<=` menor ou igual',
            '`&&` E (as duas precisam ser verdade), `||` OU (basta uma)',
          ],
        },
        {
          type: 'exercise',
          id: 'ex-entrada',
          title: 'Pode entrar?',
          instructions: 'Complete `podeEntrar(idade)`: devolve `true` se a idade for 18 ou mais, e `false` caso contrário.',
          starter: `function podeEntrar(idade) {
  // escreva aqui
}
`,
          tests: [
            { desc: 'podeEntrar(18) é true', expr: 'podeEntrar(18)', expected: true },
            { desc: 'podeEntrar(30) é true', expr: 'podeEntrar(30)', expected: true },
            { desc: 'podeEntrar(17) é false', expr: 'podeEntrar(17)', expected: false },
          ],
          hint: 'Use `>=`. Bônus: `return idade >= 18` já resolve numa linha.',
          solution: `function podeEntrar(idade) {
  return idade >= 18
}`,
        },
        {
          type: 'exercise',
          id: 'ex-nota',
          title: 'Situação do aluno',
          instructions: 'Complete `situacao(nota)`: devolve `"aprovado"` se a nota for 7 ou mais, `"recuperação"` se for de 5 até menos que 7, e `"reprovado"` abaixo de 5.',
          starter: `function situacao(nota) {
  // use if, else if e else
}
`,
          tests: [
            { desc: 'situacao(8) é "aprovado"', expr: 'situacao(8)', expected: 'aprovado' },
            { desc: 'situacao(7) é "aprovado"', expr: 'situacao(7)', expected: 'aprovado' },
            { desc: 'situacao(5) é "recuperação"', expr: 'situacao(5)', expected: 'recuperação' },
            { desc: 'situacao(4.9) é "reprovado"', expr: 'situacao(4.9)', expected: 'reprovado' },
          ],
          hint: 'Comece pelo caso maior: `if (nota >= 7)`, depois `else if (nota >= 5)`, e por último `else`.',
          solution: `function situacao(nota) {
  if (nota >= 7) return 'aprovado'
  else if (nota >= 5) return 'recuperação'
  else return 'reprovado'
}`,
        },
      ],
    },
    {
      id: 'arrays-loops',
      title: 'Listas e repetição',
      summary: 'Arrays guardam vários valores. Loops passam por cada um.',
      minutes: 10,
      blocks: [
        {
          type: 'p',
          text: 'Um **array** é uma lista. Cada item tem uma posição, começando do **0**.',
        },
        {
          type: 'code',
          lang: 'javascript',
          code: `const frutas = ['maçã', 'banana', 'uva']
frutas[0]        // 'maçã'
frutas.length    // 3
frutas.push('kiwi') // adiciona no final

for (const fruta of frutas) {
  console.log(fruta) // passa por cada uma
}`,
        },
        {
          type: 'exercise',
          id: 'ex-soma',
          title: 'Somando a lista',
          instructions: 'Complete `somaLista(numeros)` pra devolver a soma de todos os números do array. Se a lista estiver vazia, devolve `0`.',
          starter: `function somaLista(numeros) {
  let total = 0
  // passe por cada número e some no total

  return total
}
`,
          tests: [
            { desc: 'somaLista([1, 2, 3]) é 6', expr: 'somaLista([1, 2, 3])', expected: 6 },
            { desc: 'somaLista([10, -5]) é 5', expr: 'somaLista([10, -5])', expected: 5 },
            { desc: 'somaLista([]) é 0', expr: 'somaLista([])', expected: 0 },
          ],
          hint: 'Dentro de um `for (const n of numeros)`, faça `total = total + n` (ou `total += n`).',
          solution: `function somaLista(numeros) {
  let total = 0
  for (const n of numeros) {
    total += n
  }
  return total
}`,
        },
        {
          type: 'exercise',
          id: 'ex-maior',
          title: 'O maior da lista',
          instructions: 'Complete `maior(numeros)` pra devolver o maior número da lista. Pode assumir que a lista tem pelo menos 1 item. Use um loop (sem `Math.max`, pra treinar).',
          starter: `function maior(numeros) {
  let maiorAteAgora = numeros[0]
  // compare cada número com maiorAteAgora

  return maiorAteAgora
}
`,
          tests: [
            { desc: 'maior([3, 9, 2]) é 9', expr: 'maior([3, 9, 2])', expected: 9 },
            { desc: 'maior([-5, -1, -8]) é -1', expr: 'maior([-5, -1, -8])', expected: -1 },
            { desc: 'maior([7]) é 7', expr: 'maior([7])', expected: 7 },
          ],
          hint: 'Dentro do loop: `if (n > maiorAteAgora) maiorAteAgora = n`.',
          solution: `function maior(numeros) {
  let maiorAteAgora = numeros[0]
  for (const n of numeros) {
    if (n > maiorAteAgora) maiorAteAgora = n
  }
  return maiorAteAgora
}`,
        },
      ],
    },
    {
      id: 'objetos',
      title: 'Objetos',
      summary: 'Agrupar informações sobre uma mesma coisa.',
      minutes: 8,
      blocks: [
        {
          type: 'p',
          text: 'Um **objeto** junta várias informações com nomes. É assim que a IA costuma representar um produto, um usuário, um pedido.',
        },
        {
          type: 'code',
          lang: 'javascript',
          code: `const produto = {
  nome: 'X-Salada',
  preco: 18.5,
  disponivel: true,
}

produto.nome   // 'X-Salada'
produto.preco  // 18.5

// lista de objetos: o formato mais comum que você vai ver
const cardapio = [
  { nome: 'X-Salada', preco: 18.5 },
  { nome: 'Suco', preco: 7 },
]`,
        },
        {
          type: 'exercise',
          id: 'ex-objeto',
          title: 'Descrevendo um produto',
          instructions: 'Complete `etiqueta(produto)` pra devolver `"NOME: R$ PRECO"`, com o preço sempre com 2 casas decimais. Use `numero.toFixed(2)` e troque o ponto por vírgula com `.replace(".", ",")`.',
          starter: `function etiqueta(produto) {
  // produto tem .nome e .preco
}
`,
          tests: [
            {
              desc: 'X-Salada a 18.5 vira "X-Salada: R$ 18,50"',
              expr: 'etiqueta({ nome: "X-Salada", preco: 18.5 })',
              expected: 'X-Salada: R$ 18,50',
            },
            { desc: 'Suco a 7 vira "Suco: R$ 7,00"', expr: 'etiqueta({ nome: "Suco", preco: 7 })', expected: 'Suco: R$ 7,00' },
          ],
          hint: '`produto.preco.toFixed(2)` dá `"18.50"`. Depois `.replace(".", ",")` vira `"18,50"`.',
          solution: `function etiqueta(produto) {
  const preco = produto.preco.toFixed(2).replace('.', ',')
  return \`\${produto.nome}: R$ \${preco}\`
}`,
        },
      ],
    },
    {
      id: 'map-filter',
      title: 'map, filter e reduce',
      summary: 'Os três métodos que a IA usa o tempo todo. Agora você vai reconhecer.',
      minutes: 10,
      blocks: [
        {
          type: 'p',
          text: 'Em vez de escrever loops na mão, código moderno usa métodos de array. Você vai ver isso em quase todo código gerado por IA:',
        },
        {
          type: 'code',
          lang: 'javascript',
          code: `const precos = [10, 25, 40]

// map: transforma cada item (mesma quantidade)
precos.map(p => p * 2)          // [20, 50, 80]

// filter: fica só com quem passa no teste
precos.filter(p => p > 20)      // [25, 40]

// reduce: junta tudo num valor só
precos.reduce((soma, p) => soma + p, 0) // 75`,
        },
        {
          type: 'tip',
          title: 'Lendo a seta',
          text: '`p => p * 2` é uma função curta (arrow function). Leia como: "pra cada `p`, devolva `p * 2`".',
        },
        {
          type: 'exercise',
          id: 'ex-filter',
          title: 'Só os disponíveis',
          instructions: 'Complete `disponiveis(cardapio)` pra devolver um array só com os **nomes** dos produtos que têm `disponivel: true`. Use `filter` e depois `map`.',
          starter: `function disponiveis(cardapio) {
  // return cardapio.filter(...).map(...)
}
`,
          tests: [
            {
              desc: 'devolve só os nomes disponíveis',
              expr: 'disponiveis([{ nome: "X-Salada", disponivel: true }, { nome: "X-Bacon", disponivel: false }, { nome: "Suco", disponivel: true }])',
              expected: ['X-Salada', 'Suco'],
            },
            { desc: 'lista vazia devolve []', expr: 'disponiveis([])', expected: [] },
          ],
          hint: '`cardapio.filter(p => p.disponivel)` fica com os disponíveis. Depois `.map(p => p.nome)` pega só o nome.',
          solution: `function disponiveis(cardapio) {
  return cardapio.filter(p => p.disponivel).map(p => p.nome)
}`,
        },
        {
          type: 'exercise',
          id: 'ex-carrinho',
          title: 'Desafio: total do carrinho',
          instructions: 'Cada item do carrinho tem `preco` e `quantidade`. Complete `totalCarrinho(itens)` pra devolver o valor total. Se o total passar de 100, aplique 10% de desconto. Arredonde pra 2 casas com `Math.round(valor * 100) / 100`.',
          starter: `function totalCarrinho(itens) {
  // 1. some preco * quantidade de cada item
  // 2. se passar de 100, desconto de 10%
  // 3. arredonde pra 2 casas
}
`,
          tests: [
            {
              desc: '2 x 10 + 1 x 5 = 25',
              expr: 'totalCarrinho([{ preco: 10, quantidade: 2 }, { preco: 5, quantidade: 1 }])',
              expected: 25,
            },
            {
              desc: '3 x 40 = 120, com desconto vira 108',
              expr: 'totalCarrinho([{ preco: 40, quantidade: 3 }])',
              expected: 108,
            },
            { desc: 'exatamente 100 não tem desconto', expr: 'totalCarrinho([{ preco: 50, quantidade: 2 }])', expected: 100 },
            { desc: 'carrinho vazio é 0', expr: 'totalCarrinho([])', expected: 0 },
            {
              desc: 'centavos arredondados: 3 x 33.33 = 99.99',
              expr: 'totalCarrinho([{ preco: 33.33, quantidade: 3 }])',
              expected: 99.99,
            },
          ],
          hint: 'Use `reduce((soma, item) => soma + item.preco * item.quantidade, 0)`. Depois um `if (total > 100)` multiplicando por `0.9`.',
          solution: `function totalCarrinho(itens) {
  let total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0)
  if (total > 100) total = total * 0.9
  return Math.round(total * 100) / 100
}`,
        },
        {
          type: 'links',
          items: [
            { label: 'MDN: métodos de Array', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array', kind: 'doc' },
            { label: 'Vídeos: map, filter e reduce explicados', url: yt('javascript map filter reduce explicado'), kind: 'video' },
          ],
        },
      ],
    },
  ],
}
