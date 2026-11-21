import { memo, type ReactNode } from 'react'

// Realce de sintaxe mínimo pra JS/HTML/terminal. Não é um parser completo,
// só o suficiente pra código de aula ficar legível e com cara de editor.

const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'of', 'in', 'while', 'do',
  'new', 'true', 'false', 'null', 'undefined', 'this', 'class', 'import', 'export', 'from',
  'async', 'await', 'try', 'catch', 'throw', 'typeof', 'break', 'continue', 'switch', 'case', 'default',
])

const TOKEN = new RegExp(
  [
    String.raw`(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->|^\s*#[^\n]*)`,
    String.raw`(?<string>'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|\`(?:\\.|[^\`\\])*\`)`,
    String.raw`(?<tag><\/?[a-zA-Z][\w-]*|\/?>)`,
    String.raw`(?<number>\b\d+(?:\.\d+)?\b)`,
    String.raw`(?<word>[A-Za-z_$][\w$]*)`,
    String.raw`(?<op>=>|===|!==|&&|\|\||[=+\-*/<>!%])`,
  ].join('|'),
  'gm',
)

export function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  let i = 0
  for (const m of code.matchAll(TOKEN)) {
    const start = m.index ?? 0
    if (start > last) out.push(code.slice(last, start))
    const g = m.groups ?? {}
    const text = m[0]
    let cls = ''
    if (g.comment) cls = 'tk-com'
    else if (g.string) cls = 'tk-str'
    else if (g.tag) cls = 'tk-tag'
    else if (g.number) cls = 'tk-num'
    else if (g.op) cls = 'tk-op'
    else if (g.word) {
      if (KEYWORDS.has(text)) cls = 'tk-kw'
      else if (code[start + text.length] === '(') cls = 'tk-fn'
      else if (code[start + text.length] === ':' && code[start + text.length + 1] !== ':') cls = 'tk-prop'
      else if (code[start - 1] === '.') cls = 'tk-prop'
    }
    out.push(cls ? <span key={i++} className={cls}>{text}</span> : text)
    last = start + text.length
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}

export const Highlight = memo(function Highlight({ code }: { code: string }) {
  return <>{highlight(code)}</>
})
