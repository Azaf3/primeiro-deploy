import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { useProgress } from '../lib/progress'
import { readJSON, writeJSON } from '../lib/storage'

const SITE = 'https://azaf3.github.io/primeiro-deploy/'
const COURSE = 'Primeiro Deploy: do zero ao primeiro site no ar usando IA'

// Código curto e estável por aluno + trilha (não é verificação oficial, só identificação)
function certCode(seed: string) {
  let h1 = 0x811c9dc5
  let h2 = 0x01000193
  for (let i = 0; i < seed.length; i++) {
    const c = seed.charCodeAt(i)
    h1 = Math.imul(h1 ^ c, 16777619)
    h2 = Math.imul(h2 + c, 2654435761)
  }
  const a = (h1 >>> 0).toString(36).toUpperCase().padStart(7, '0').slice(-4)
  const b = (h2 >>> 0).toString(36).toUpperCase().padStart(7, '0').slice(-4)
  return `PD-${a}-${b}`
}

type Deploy = { repo: string; site: string }

export function Certificado() {
  const { user } = useAuth()
  const { completed, track, completedAt } = useProgress()
  const nameKey = `pd:certname:${user?.id ?? 'anon'}`
  const [name, setName] = useState(() => readJSON<string>(nameKey, user?.name ?? ''))

  useEffect(() => {
    writeJSON(nameKey, name)
  }, [nameKey, name])

  const lessons = track.lessons
  const done = lessons.filter((l) => completed.has(l.id)).length
  const missing = lessons.filter((l) => !completed.has(l.id))

  if (!user) return null

  if (missing.length > 0) {
    return (
      <div className="cert-locked">
        <p className="eyebrow">certificado</p>
        <h1>Quase lá!</h1>
        <p className="lead">
          O certificado libera quando você concluir todas as aulas da sua trilha. Você fez {done} de {lessons.length}.
        </p>
        <div className="bar big" aria-hidden>
          <div className="bar-fill" style={{ width: `${(done / lessons.length) * 100}%` }} />
        </div>
        <p className="muted small">
          Faltam {missing.length} {missing.length === 1 ? 'aula' : 'aulas'}. Próxima: <strong>{missing[0].title}</strong>
        </p>
        <Link to={`/aula/${missing[0].id}`} className="btn primary">
          Continuar a trilha
        </Link>
      </div>
    )
  }

  const minutes = lessons.reduce((s, l) => s + l.minutes, 0)
  const hours = Math.max(1, Math.round(minutes / 60))
  const lastDone = Math.max(...lessons.map((l) => completedAt[l.id] ?? 0))
  const date = new Date(lastDone > 0 ? lastDone : Date.now())
  const dateText = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
  const code = certCode(`${user.id}:${lessons.length}`)
  const displayName = name.trim() || user.name

  const projects = ['deploy-primeiro-projeto', 'deploy-cardapio']
    .map((id) => readJSON<Deploy>(`pd:deploy:${user.id}:${id}`, { repo: '', site: '' }).site)
    .filter(Boolean)
    .map((s) => s.replace(/^https?:\/\//, '').replace(/\/$/, ''))

  const linkedin =
    'https://www.linkedin.com/profile/add?' +
    new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name: COURSE,
      organizationName: 'Primeiro Deploy',
      issueYear: String(date.getFullYear()),
      issueMonth: String(date.getMonth() + 1),
      certUrl: SITE,
      certId: code,
    }).toString()

  return (
    <div className="cert-page">
      <header className="cert-head no-print">
        <div>
          <p className="eyebrow">trilha concluída</p>
          <h1>Parabéns, {user.name}! 🎉</h1>
          <p className="lead">Você foi do zero ao deploy. Aqui está seu certificado.</p>
        </div>
        <div className="cert-actions">
          <div className="field">
            <label htmlFor="cert-name">Nome no certificado</label>
            <input
              id="cert-name"
              value={name}
              maxLength={60}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
            />
          </div>
          <div className="row">
            <button className="btn primary" onClick={() => window.print()}>
              Baixar PDF
            </button>
            <a className="btn" href={linkedin} target="_blank" rel="noopener noreferrer">
              Adicionar ao LinkedIn ↗
            </a>
          </div>
          <p className="muted small">
            No "Baixar PDF", escolha <strong>Salvar como PDF</strong> no destino da impressão.
          </p>
        </div>
      </header>

      <div className="cert-wrap">
        <article className="cert" aria-label={`Certificado de ${displayName}`}>
          <div className="cert-frame">
            <div className="cert-top">
              <span className="cert-brand">
                <span className="cert-mark">&gt;_</span>
                <span>
                  primeiro<span className="cert-accent">-deploy</span>
                </span>
              </span>
              <span className="cert-code">{code}</span>
            </div>

            <div className="cert-body">
              <p className="cert-kicker">Certificado de conclusão</p>
              <p className="cert-intro">Certificamos que</p>
              <h2 className="cert-name">{displayName}</h2>
              <p className="cert-text">
                concluiu a trilha <strong>{COURSE}</strong>, com {lessons.length} aulas e carga horária de {hours}{' '}
                {hours === 1 ? 'hora' : 'horas'}, construindo e publicando projetos reais com a ajuda de IA.
              </p>
              <ul className="cert-modules">
                {track.modules.map((m) => (
                  <li key={m.id}>{m.title}</li>
                ))}
              </ul>
              {projects.length > 0 && (
                <p className="cert-projects">
                  <span>Projetos publicados:</span> {projects.join('  ·  ')}
                </p>
              )}
            </div>

            <div className="cert-foot">
              <div className="cert-sign">
                <span className="cert-sign-name">Azaf3</span>
                <span className="cert-line" />
                <span className="cert-sign-role">Criador do Primeiro Deploy</span>
              </div>
              <div className="cert-seal" aria-hidden>
                <span className="cert-seal-check">✓</span>
                <span className="cert-seal-text">deploy feito</span>
              </div>
              <div className="cert-sign right">
                <span className="cert-sign-name date">{dateText}</span>
                <span className="cert-line" />
                <span className="cert-sign-role">Data de conclusão</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <p className="cert-note muted small no-print">
        Certificado de conclusão emitido pela plataforma Primeiro Deploy ({SITE.replace('https://', '')}). Não é um
        diploma reconhecido pelo MEC.
      </p>
    </div>
  )
}
