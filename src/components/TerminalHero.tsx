import { useEffect, useState } from 'react'

type Line = { kind: 'cmd' | 'out' | 'ok'; text: string }

const script: Line[] = [
  { kind: 'cmd', text: 'chatgpt "me ajuda a montar o prompt de um cardápio online"' },
  { kind: 'ok', text: 'prompt.txt gerado · 14 linhas' },
  { kind: 'cmd', text: 'claude < prompt.txt > index.html' },
  { kind: 'out', text: 'lendo plano... montando HTML, CSS e JS...' },
  { kind: 'ok', text: 'index.html criado · 212 linhas' },
  { kind: 'cmd', text: 'git commit -m "primeira versão do cardápio"' },
  { kind: 'cmd', text: 'git push origin main' },
  { kind: 'ok', text: 'no ar: seu-usuario.github.io/cardapio' },
]

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Terminal que "digita" os comandos de um projeto do zero ao deploy, em loop
export function TerminalHero() {
  const [line, setLine] = useState(() => (reduced() ? script.length : 0))
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (reduced()) return
    if (line >= script.length) {
      const t = setTimeout(() => {
        setLine(0)
        setChars(0)
      }, 4200)
      return () => clearTimeout(t)
    }
    const current = script[line]
    if (current.kind === 'cmd' && chars < current.text.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 28 + Math.random() * 40)
      return () => clearTimeout(t)
    }
    const t = setTimeout(
      () => {
        setLine((l) => l + 1)
        setChars(0)
      },
      current.kind === 'cmd' ? 380 : 520,
    )
    return () => clearTimeout(t)
  }, [line, chars])

  return (
    <div className="terminal" role="img" aria-label="Terminal mostrando um projeto saindo da ideia e indo pro ar com Claude, ChatGPT e GitHub">
      <div className="terminal-bar">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="terminal-title">~/meu-cardapio</span>
      </div>
      <pre className="terminal-body">
        {script.slice(0, line + 1).map((l, i) => {
          if (i > line) return null
          const isCurrent = i === line && line < script.length
          const text = isCurrent && l.kind === 'cmd' ? l.text.slice(0, chars) : l.text
          if (isCurrent && l.kind !== 'cmd') return null
          return (
            <div key={i} className={`t-line t-${l.kind}`}>
              {l.kind === 'cmd' && <span className="t-prompt">$ </span>}
              {l.kind === 'ok' && <span className="t-check">✓ </span>}
              {l.kind === 'out' && <span className="t-dim">› </span>}
              {text}
              {isCurrent && <span className="caret" />}
            </div>
          )
        })}
        {line >= script.length && (
          <div className="t-line t-cmd">
            <span className="t-prompt">$ </span>
            <span className="caret" />
          </div>
        )}
      </pre>
    </div>
  )
}
