import { useEffect, useState, type FormEvent } from 'react'
import { useAuth } from '../lib/auth'
import { readJSON, writeJSON } from '../lib/storage'
import { checkDeploy, expectedSite, normalizeSite, parseRepo, type CheckResult } from '../lib/deployCheck'
import { Inline } from './Inline'

type Props = { id: string; title: string; text: string; alreadyDone: boolean; onPass: () => void }
type Saved = { repo: string; site: string }

const icon = { ok: '✓', fail: '✕', pending: '·' } as const

export function DeployMission({ id, title, text, alreadyDone, onPass }: Props) {
  const { user } = useAuth()
  const key = `pd:deploy:${user?.id ?? 'anon'}:${id}`
  const saved = readJSON<Saved>(key, { repo: '', site: '' })
  const [repo, setRepo] = useState(saved.repo)
  const [site, setSite] = useState(saved.site)
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState<CheckResult | null>(null)

  useEffect(() => {
    writeJSON(key, { repo, site })
  }, [key, repo, site])

  // Preenche o link do site sozinho quando o repositório é válido
  function onRepoBlur() {
    const parsed = parseRepo(repo)
    if (parsed && !site.trim()) setSite(expectedSite(parsed))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setChecking(true)
    setResult(null)
    const r = await checkDeploy(repo, site)
    setResult(r)
    setChecking(false)
    if (r.repo === 'ok' && r.site === 'ok') onPass()
  }

  const passed = result?.repo === 'ok' && result.site === 'ok'
  const siteUrl = normalizeSite(site)

  return (
    <section className={`block mission ${alreadyDone || passed ? 'done' : ''}`}>
      <div className="block-label">
        Missão: publicar {(alreadyDone || passed) && <span className="badge ok">no ar</span>}
      </div>
      <h3 className="exercise-title">{title}</h3>
      <p>
        <Inline text={text} />
      </p>

      <form className="mission-form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor={`${id}-repo`}>Link do repositório</label>
          <input
            id={`${id}-repo`}
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            onBlur={onRepoBlur}
            placeholder="https://github.com/seu-usuario/meu-projeto"
            inputMode="url"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
        <div className="field">
          <label htmlFor={`${id}-site`}>Link do site no ar</label>
          <input
            id={`${id}-site`}
            value={site}
            onChange={(e) => setSite(e.target.value)}
            placeholder="https://seu-usuario.github.io/meu-projeto/"
            inputMode="url"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
        <div className="row">
          <button className="btn primary" type="submit" disabled={checking || !repo.trim() || !site.trim()}>
            {checking ? 'Conferindo...' : 'Conferir publicação'}
          </button>
          {(alreadyDone || passed) && siteUrl && (
            <a className="btn ghost" href={siteUrl} target="_blank" rel="noopener noreferrer">
              Abrir meu site ↗
            </a>
          )}
        </div>
      </form>

      {result && (
        <div className="results" role="status" aria-live="polite">
          <ul className="test-list">
            <li className={result.repo === 'ok' ? 'pass' : result.repo === 'fail' ? 'fail' : ''}>
              <span className="test-icon" aria-hidden>
                {icon[result.repo]}
              </span>
              <span>Repositório público no GitHub</span>
            </li>
            <li className={result.site === 'ok' ? 'pass' : result.site === 'fail' ? 'fail' : ''}>
              <span className="test-icon" aria-hidden>
                {icon[result.site]}
              </span>
              <span>Site no ar pelo GitHub Pages</span>
            </li>
          </ul>
          {result.message && <p className="result-msg wrong mission-msg">{result.message}</p>}
          {passed && <p className="result-msg right">Publicado! Seu projeto tem um link de verdade agora.</p>}
        </div>
      )}
    </section>
  )
}
