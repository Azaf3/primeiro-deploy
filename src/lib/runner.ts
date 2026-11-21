import type { ExerciseTest } from '../content/types'

export type TestResult = {
  desc: string
  passed: boolean
  got?: string
  expected: string
  error?: string
}

export type RunResult =
  | { status: 'ok'; results: TestResult[]; logs: string[] }
  | { status: 'error'; message: string; logs: string[] }
  | { status: 'timeout'; logs: string[] }

// O código do aluno roda num Web Worker: isolado da página e
// pode ser encerrado se entrar em loop infinito.
const workerSource = `
self.onmessage = (event) => {
  const { code, tests } = event.data
  const logs = []
  const fmt = (v) => {
    if (typeof v === 'string') return v
    try { return JSON.stringify(v) } catch { return String(v) }
  }
  const console = {
    log: (...args) => logs.push(args.map(fmt).join(' ')),
    error: (...args) => logs.push('[erro] ' + args.map(fmt).join(' ')),
    warn: (...args) => logs.push('[aviso] ' + args.map(fmt).join(' ')),
  }
  const show = (v) => v === undefined ? 'undefined' : fmt(v)
  try {
    const checks = tests.map((t) =>
      '(() => { try { return { ok: true, v: (' + t.expr + ') } } catch (e) { return { ok: false, e: String(e && e.message || e) } } })()'
    ).join(',')
    const fn = new Function('console', code + '\\n;return [' + checks + ']')
    const raw = fn(console)
    const results = tests.map((t, i) => {
      const r = raw[i]
      const expected = show(t.expected)
      if (!r.ok) return { desc: t.desc, passed: false, expected, error: r.e }
      const got = show(r.v)
      return { desc: t.desc, passed: got === expected, got, expected }
    })
    self.postMessage({ status: 'ok', results, logs })
  } catch (e) {
    self.postMessage({ status: 'error', message: String(e && e.message || e), logs })
  }
}
`

let workerUrl: string | null = null

export function runExercise(code: string, tests: ExerciseTest[], timeoutMs = 2000): Promise<RunResult> {
  if (!workerUrl) workerUrl = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }))
  return new Promise((resolve) => {
    let worker: Worker
    try {
      worker = new Worker(workerUrl!)
    } catch {
      resolve({ status: 'error', message: 'Seu navegador bloqueou a execução de código.', logs: [] })
      return
    }
    const timer = setTimeout(() => {
      worker.terminate()
      resolve({ status: 'timeout', logs: [] })
    }, timeoutMs)
    worker.onmessage = (e: MessageEvent<RunResult>) => {
      clearTimeout(timer)
      worker.terminate()
      resolve(e.data)
    }
    worker.onerror = (e) => {
      e.preventDefault()
      clearTimeout(timer)
      worker.terminate()
      resolve({ status: 'error', message: e.message || 'Erro de sintaxe no código.', logs: [] })
    }
    worker.postMessage({ code, tests })
  })
}
