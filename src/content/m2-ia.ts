import type { Module } from './types'

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`

export const ia: Module = {
  id: 'ia',
  title: 'Conversando com IA',
  description: 'Como pedir as coisas do jeito certo, usar uma IA pra ajudar a outra e criar as artes do projeto.',
  lessons: [
    {
      id: 'claude-x-gpt',
      title: 'Claude e ChatGPT: quem faz o quê',
      summary: 'Cada IA tem um ponto forte. Aqui a gente divide o trabalho entre elas.',
      minutes: 5,
      blocks: [
        {
          type: 'p',
          text: 'Dá pra fazer tudo com uma IA só, mas dividir o trabalho costuma dar resultado melhor. Nesta trilha a divisão é assim:',
        },
        {
          type: 'list',
          items: [
            '**ChatGPT**: brainstorm de ideias, transformar sua ideia bagunçada num prompt organizado, gerar imagens (logo, banner, ícones).',
            '**Claude**: escrever o código, explicar o código, corrigir erros, melhorar o que já existe.',
          ],
        },
        {
          type: 'map',
          title: 'Fluxo de um projeto com IA',
          root: {
            label: 'Sua ideia',
            children: [
              { label: 'ChatGPT', note: 'organiza a ideia', children: [{ label: 'Prompt de projeto' }, { label: 'Artes e logo' }] },
              { label: 'Claude', note: 'constrói', children: [{ label: 'Código' }, { label: 'Correções' }, { label: 'Explicações' }] },
              { label: 'Você', note: 'decide', children: [{ label: 'Testa' }, { label: 'Publica' }] },
            ],
          },
        },
        {
          type: 'tip',
          tone: 'warn',
          title: 'Regra de ouro',
          text: 'Nunca cole senhas, chaves de API ou dados pessoais de clientes numa conversa com IA.',
        },
        {
          type: 'quiz',
          id: 'q-divisao',
          questions: [
            {
              prompt: 'Você quer um logo pro seu projeto. Qual ferramenta usar nesta trilha?',
              options: ['Claude', 'ChatGPT', 'VS Code'],
              correct: 1,
              explain: 'O ChatGPT gera imagens direto na conversa.',
            },
            {
              prompt: 'Seu site deu erro no console. Pra quem você leva?',
              options: ['Claude, com o erro e o código', 'Ninguém, apaga tudo', 'ChatGPT pra gerar uma imagem'],
              correct: 0,
              explain: 'Claude é o seu parceiro de código. Leve o erro completo e o trecho do código.',
            },
          ],
        },
      ],
    },
    {
      id: 'anatomia-do-prompt',
      title: 'Anatomia de um bom prompt',
      summary: 'Cinco partes que transformam um pedido vago num resultado útil.',
      minutes: 8,
      blocks: [
        {
          type: 'p',
          text: 'A IA não lê sua mente. "Faz um site pra mim" gera um site genérico. Um bom prompt tem estas partes:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Contexto**: quem você é e pra quem é o projeto. "Sou iniciante, é pra lanchonete da minha tia."',
            '**Objetivo**: o que precisa existir no final. "Um cardápio online com botão de pedido."',
            '**Restrições**: o que pode e o que não pode. "Um arquivo HTML só, sem frameworks, funcionar no celular."',
            '**Formato da resposta**: como você quer receber. "Código completo num bloco só, depois explique em tópicos curtos."',
            '**Exemplo ou referência**: algo parecido com o que você quer. "Estilo simples, fundo claro, cor principal vermelha."',
          ],
        },
        {
          type: 'map',
          title: 'Prompt completo',
          root: {
            label: 'Prompt',
            children: [
              { label: 'Contexto', note: 'quem e pra quem' },
              { label: 'Objetivo', note: 'o que entregar' },
              { label: 'Restrições', note: 'limites' },
              { label: 'Formato', note: 'como responder' },
              { label: 'Exemplo', note: 'referência' },
            ],
          },
        },
        { type: 'h', text: 'Antes e depois' },
        { type: 'code', lang: 'prompt ruim', code: 'faz um site de lanchonete' },
        {
          type: 'prompt',
          title: 'Prompt bom (adapte os detalhes)',
          tool: 'Claude',
          text: `Sou iniciante em programação e estou fazendo um site pra lanchonete da minha tia.

Objetivo: uma página de cardápio com 3 categorias (lanches, bebidas, sobremesas), cada item com nome, descrição curta e preço. No fim, um botão "Fazer pedido".

Restrições:
- Um único arquivo HTML, com CSS e JavaScript dentro dele
- Sem frameworks e sem bibliotecas externas
- Precisa ficar bom no celular
- Textos em português do Brasil

Visual: simples, fundo claro, cor principal vermelho escuro, fonte legível.

Formato da resposta: me mande o código completo num bloco só. Depois explique em até 5 tópicos curtos o que cada parte faz, pensando que sou iniciante.`,
        },
        {
          type: 'tip',
          title: 'Itere, não recomece',
          text: 'Se o resultado veio 80% certo, peça só o ajuste: "Mantenha tudo igual, só troque a cor do botão para verde." Recomeçar do zero costuma bagunçar o que já estava bom.',
        },
        {
          type: 'links',
          items: [
            {
              label: 'Guia oficial de prompts da Anthropic (em inglês)',
              url: 'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview',
              kind: 'doc',
            },
            { label: 'Vídeos: como escrever bons prompts', url: yt('como escrever bons prompts para IA'), kind: 'video' },
          ],
        },
        {
          type: 'quiz',
          id: 'q-prompt',
          questions: [
            {
              prompt: '"Um arquivo HTML só, sem frameworks" é qual parte do prompt?',
              options: ['Contexto', 'Restrições', 'Exemplo'],
              correct: 1,
              explain: 'Restrições dizem os limites da solução.',
            },
            {
              prompt: 'O código veio quase certo, só a cor está errada. Melhor caminho:',
              options: [
                'Mandar o prompt inteiro de novo',
                'Pedir só o ajuste e dizer pra manter o resto igual',
                'Trocar de IA',
              ],
              correct: 1,
              explain: 'Ajustes pequenos e específicos preservam o que já funciona.',
            },
            {
              prompt: 'Por que dizer "sou iniciante" no prompt?',
              options: [
                'Não faz diferença',
                'Pra IA explicar no seu nível e evitar soluções complicadas',
                'Pra IA escrever menos código',
              ],
              correct: 1,
              explain: 'Contexto muda o nível da explicação e a complexidade da solução.',
            },
          ],
        },
      ],
    },
    {
      id: 'gpt-gera-prompt',
      title: 'Peça pro GPT escrever o prompt',
      summary: 'Não sabe por onde começar? Deixe uma IA te entrevistar e montar o prompt.',
      minutes: 5,
      blocks: [
        {
          type: 'p',
          text: 'Nem sempre a ideia vem organizada. Um truque muito útil: pedir pro ChatGPT te fazer perguntas e, no final, escrever o prompt completo que você vai levar pro Claude. Isso se chama **meta-prompt** (um prompt que gera outro prompt).',
        },
        {
          type: 'prompt',
          title: 'Entrevista de projeto',
          tool: 'ChatGPT',
          text: `Quero criar um projeto de programação, mas sou iniciante e minha ideia ainda está solta.

Minha ideia: [descreva em uma ou duas frases]

Me faça até 8 perguntas, uma de cada vez, pra entender:
- pra quem é o projeto
- o que a pessoa precisa conseguir fazer nele
- quais telas ou seções ele tem
- como deve ser o visual
- se precisa guardar dados

Quando terminar, escreva um prompt completo pra eu enviar ao Claude pedindo o código. O prompt deve pedir: um único arquivo HTML com CSS e JS, sem frameworks, responsivo pro celular, e uma explicação curta do código no final.`,
        },
        {
          type: 'p',
          text: 'Responda as perguntas com calma. No final, copie o prompt gerado, leia com atenção e corrija o que não fizer sentido antes de mandar pro Claude.',
        },
        {
          type: 'tip',
          title: 'Mantenha pequeno',
          text: 'Se o prompt gerado listar 15 funcionalidades, corte pra 3. Primeiro faça funcionar o básico, depois adicione o resto aos poucos.',
        },
        {
          type: 'quiz',
          id: 'q-meta',
          questions: [
            {
              prompt: 'O que é um meta-prompt?',
              options: ['Um prompt muito grande', 'Um prompt que pede pra IA gerar outro prompt', 'Um prompt em inglês'],
              correct: 1,
              explain: 'Você usa a IA pra organizar o pedido antes de pedir o código.',
            },
          ],
        },
      ],
    },
    {
      id: 'artes-com-ia',
      title: 'Criando artes com IA',
      summary: 'Logo, banner e ícone pro seu projeto sem saber desenhar.',
      minutes: 7,
      blocks: [
        {
          type: 'p',
          text: 'Um projeto com logo e imagens próprias parece muito mais profissional. O ChatGPT gera imagens direto na conversa. O segredo é descrever bem, igual a um prompt de código.',
        },
        {
          type: 'list',
          items: [
            '**O que é**: logo, ícone, banner, ilustração.',
            '**Estilo**: flat, minimalista, 3D, desenho à mão, foto realista.',
            '**Cores**: 2 ou 3 no máximo, de preferência as mesmas do site.',
            '**Uso**: "fundo transparente", "quadrado", "formato horizontal pra topo de site".',
            '**O que evitar**: "sem texto", "sem sombras", "sem fundo detalhado".',
          ],
        },
        {
          type: 'prompt',
          title: 'Logo simples',
          tool: 'ChatGPT',
          text: `Crie um logo minimalista para uma lanchonete chamada "Cantinho da Tia".

Estilo: flat, traços simples, fácil de reconhecer em tamanho pequeno.
Elemento principal: um hambúrguer estilizado.
Cores: vermelho escuro e amarelo mostarda, fundo branco liso.
Formato: quadrado.
Não coloque texto dentro da imagem.`,
        },
        {
          type: 'prompt',
          title: 'Banner pro topo do site',
          tool: 'ChatGPT',
          text: `Crie uma imagem horizontal (proporção 16:9) para o topo de um site de lanchonete.

Cena: mesa de madeira com lanches e sucos, luz natural de manhã.
Estilo: foto realista, cores quentes.
Deixe o lado esquerdo mais limpo, com espaço para colocar um título por cima.
Sem texto na imagem.`,
        },
        {
          type: 'tip',
          tone: 'warn',
          title: 'Cuidados',
          text: 'Peça "sem texto" e coloque o texto pelo HTML: IA de imagem ainda erra letras. Não peça logos de marcas famosas nem personagens conhecidos. Antes de usar no site, comprima a imagem (ex: Squoosh) pra não deixar a página lenta.',
        },
        {
          type: 'links',
          items: [
            { label: 'Squoosh: comprimir imagens no navegador', url: 'https://squoosh.app/', kind: 'tool' },
            { label: 'Vídeos: como criar imagens com ChatGPT', url: yt('como criar imagens com chatgpt'), kind: 'video' },
          ],
        },
        {
          type: 'quiz',
          id: 'q-artes',
          questions: [
            {
              prompt: 'Por que pedir "sem texto" na imagem?',
              options: [
                'Porque texto deixa a imagem pesada',
                'Porque a IA de imagem ainda erra letras, e texto no HTML é mais fácil de editar',
                'Porque é proibido',
              ],
              correct: 1,
              explain: 'Texto no HTML pode ser editado, traduzido e lido por leitores de tela.',
            },
          ],
        },
      ],
    },
  ],
}
