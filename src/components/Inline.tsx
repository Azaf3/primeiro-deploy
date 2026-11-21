import { Fragment, type ReactNode } from 'react'

// Formatação inline mínima: **negrito** e `código`. Sem HTML cru, sem XSS.
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g
  let last = 0
  let match: RegExpExecArray | null
  let i = 0
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(<Fragment key={i++}>{text.slice(last, match.index)}</Fragment>)
    const token = match[0]
    if (token.startsWith('**')) parts.push(<strong key={i++}>{token.slice(2, -2)}</strong>)
    else parts.push(<code key={i++} className="inline-code">{token.slice(1, -1)}</code>)
    last = match.index + token.length
  }
  if (last < text.length) parts.push(<Fragment key={i++}>{text.slice(last)}</Fragment>)
  return <>{parts}</>
}
