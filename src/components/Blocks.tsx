import { useState } from 'react'
import type { Block } from '../content/types'
import { Inline } from './Inline'
import { ConceptMap } from './ConceptMap'
import { Quiz } from './Quiz'
import { CodeExercise } from './CodeExercise'
import { Highlight } from './Highlight'

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback pra navegadores sem Clipboard API (ou http)
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}

function CopyButton({ text, label = 'Copiar' }: { text: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle')
  return (
    <button
      className="btn small"
      onClick={async () => {
        setState((await copyText(text)) ? 'ok' : 'fail')
        setTimeout(() => setState('idle'), 1800)
      }}
    >
      {state === 'ok' ? 'Copiado!' : state === 'fail' ? 'Selecione e copie' : label}
    </button>
  )
}

const linkIcon = { video: '▶', doc: '📄', tool: '🔧' } as const

type BlockProps = {
  block: Block
  passed: Set<string>
  onPass: (checkId: string) => void
}

export function BlockView({ block, passed, onPass }: BlockProps) {
  switch (block.type) {
    case 'h':
      return <h2 className="lesson-h">{block.text}</h2>
    case 'p':
      return (
        <p>
          <Inline text={block.text} />
        </p>
      )
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag className="lesson-list">
          {block.items.map((it, i) => (
            <li key={i}>
              <Inline text={it} />
            </li>
          ))}
        </Tag>
      )
    }
    case 'tip':
      return (
        <aside className={`tip ${block.tone ?? 'info'}`}>
          {block.title && <strong className="tip-title">{block.title}</strong>}
          <Inline text={block.text} />
        </aside>
      )
    case 'code':
      return (
        <div className="block code-wrap">
          <div className="code-head">
            <span className="win-dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span className="code-lang">{block.lang ?? 'código'}</span>
            <CopyButton text={block.code} />
          </div>
          <pre className="code-block">
            <Highlight code={block.code} />
          </pre>
        </div>
      )
    case 'prompt':
      return (
        <div className="block prompt-card">
          <div className="prompt-head">
            <div>
              <div className="block-label">Prompt pronto{block.tool ? ` · ${block.tool}` : ''}</div>
              <strong>{block.title}</strong>
            </div>
            <CopyButton text={block.text} label="Copiar prompt" />
          </div>
          <pre className="prompt-text">{block.text}</pre>
        </div>
      )
    case 'links':
      return (
        <div className="block links">
          <div className="block-label">{block.title ?? 'Pra ver e ler'}</div>
          <ul>
            {block.items.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  <span className="link-icon" aria-hidden>
                    {linkIcon[l.kind ?? 'doc']}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'map':
      return <ConceptMap title={block.title} root={block.root} />
    case 'quiz':
      return <Quiz questions={block.questions} alreadyDone={passed.has(block.id)} onPass={() => onPass(block.id)} />
    case 'exercise':
      return (
        <CodeExercise
          id={block.id}
          title={block.title}
          instructions={block.instructions}
          starter={block.starter}
          tests={block.tests}
          hint={block.hint}
          solution={block.solution}
          alreadyDone={passed.has(block.id)}
          onPass={() => onPass(block.id)}
        />
      )
  }
}
