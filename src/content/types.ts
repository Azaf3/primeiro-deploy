// Tipos do conteúdo. Cada aula é uma lista de blocos renderizados em ordem.
// Texto aceita **negrito** e `código` inline.

export type ConceptNode = {
  label: string
  note?: string
  children?: ConceptNode[]
}

export type QuizQuestion = {
  prompt: string
  options: string[]
  correct: number
  explain: string
}

export type ExerciseTest = {
  /** Descrição que o aluno vê */
  desc: string
  /** Expressão JS avaliada depois do código do aluno */
  expr: string
  /** Valor esperado (comparado via JSON) */
  expected: unknown
}

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'tip'; tone?: 'info' | 'warn'; title?: string; text: string }
  | { type: 'code'; lang?: string; code: string }
  | { type: 'prompt'; title: string; text: string; tool?: 'Claude' | 'ChatGPT' | 'Qualquer IA' }
  | { type: 'links'; title?: string; items: { label: string; url: string; kind?: 'video' | 'doc' | 'tool' }[] }
  | { type: 'map'; title?: string; root: ConceptNode }
  | { type: 'quiz'; id: string; questions: QuizQuestion[] }
  | {
      type: 'exercise'
      id: string
      title: string
      instructions: string
      starter: string
      tests: ExerciseTest[]
      hint?: string
      solution?: string
    }

export type Lesson = {
  id: string
  title: string
  summary: string
  minutes: number
  blocks: Block[]
}

export type Module = {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}
