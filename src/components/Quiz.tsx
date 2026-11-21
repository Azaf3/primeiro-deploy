import { useState } from 'react'
import type { QuizQuestion } from '../content/types'
import { Inline } from './Inline'

type Props = { questions: QuizQuestion[]; alreadyDone: boolean; onPass: () => void }

export function Quiz({ questions, alreadyDone, onPass }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))
  const [checked, setChecked] = useState(false)

  const allAnswered = answers.every((a) => a !== null)
  const score = answers.filter((a, i) => a === questions[i].correct).length
  const passed = checked && score === questions.length

  function choose(q: number, opt: number) {
    if (checked && answers[q] === questions[q].correct) return
    setChecked(false)
    setAnswers((prev) => prev.map((a, i) => (i === q ? opt : a)))
  }

  function check() {
    setChecked(true)
    if (answers.every((a, i) => a === questions[i].correct)) onPass()
  }

  return (
    <section className="block quiz">
      <div className="block-label">
        Teste rápido {alreadyDone && <span className="badge ok">feito</span>}
      </div>
      {questions.map((q, qi) => {
        const chosen = answers[qi]
        const isRight = checked && chosen === q.correct
        const isWrong = checked && chosen !== null && chosen !== q.correct
        return (
          <fieldset key={qi} className="quiz-q">
            <legend>
              <span className="quiz-n">{qi + 1}.</span> <Inline text={q.prompt} />
            </legend>
            <div className="quiz-opts">
              {q.options.map((opt, oi) => (
                <label
                  key={oi}
                  className={[
                    'quiz-opt',
                    chosen === oi ? 'chosen' : '',
                    checked && chosen === oi && isRight ? 'right' : '',
                    checked && chosen === oi && isWrong ? 'wrong' : '',
                  ].join(' ')}
                >
                  <input
                    type="radio"
                    name={`q-${qi}-${q.prompt.slice(0, 12)}`}
                    checked={chosen === oi}
                    onChange={() => choose(qi, oi)}
                  />
                  <span>
                    <Inline text={opt} />
                  </span>
                </label>
              ))}
            </div>
            {isRight && (
              <p className="quiz-feedback right">
                <Inline text={q.explain} />
              </p>
            )}
            {isWrong && <p className="quiz-feedback wrong">Ainda não. Releia o trecho acima e tente outra opção.</p>}
          </fieldset>
        )
      })}
      <div className="row">
        <button className="btn" onClick={check} disabled={!allAnswered}>
          Conferir respostas
        </button>
        {checked && (
          <span className={passed ? 'status ok' : 'status'}>
            {score}/{questions.length} certas{passed ? '. Mandou bem!' : ''}
          </span>
        )}
        {!allAnswered && <span className="muted small">Responda todas para conferir.</span>}
      </div>
    </section>
  )
}
