import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { baseTrack } from '../content'
import { TerminalHero } from '../components/TerminalHero'

const features = [
  { icon: '{ }', title: 'Conteúdo direto', text: 'Sem enrolação, escrito pra quem nunca programou.' },
  { icon: '◇', title: 'Mapas conceituais', text: 'Pra ver como as ideias se conectam antes de decorar nome.' },
  { icon: '>_', title: 'Prompts prontos', text: 'Copie e adapte no Claude e no ChatGPT.' },
  { icon: '✓', title: 'Exercícios com correção', text: 'JavaScript rodando no navegador, com testes automáticos.' },
  { icon: '▶', title: 'Vídeos e docs', text: 'Links pra aprofundar quando quiser.' },
  { icon: '↗', title: 'Projeto no ar', text: 'Você termina com um site publicado e um link pra mostrar.' },
]

export function Home() {
  const { user } = useAuth()
  if (user) return <Navigate to="/trilha" replace />

  const { lessons: allLessons, modules } = baseTrack
  const totalMin = allLessons.reduce((s, l) => s + l.minutes, 0)
  const exercises = allLessons.flatMap((l) => l.blocks).filter((b) => b.type === 'exercise').length

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <p className="pill">
            <span className="pill-dot" /> trilha gratuita pra iniciantes
          </p>
          <h1>
            Do zero ao seu primeiro site no ar, <span className="grad">usando IA</span> do jeito certo.
          </h1>
          <p className="lead">
            Aprenda o básico pra entender o que a IA escreve, como pedir as coisas pro Claude e pro ChatGPT, criar as artes
            do seu projeto e publicar na internet.
          </p>
          <div className="row">
            <Link to="/entrar?modo=criar" className="btn primary lg">
              Criar conta grátis <span aria-hidden>→</span>
            </Link>
            <Link to="/entrar" className="btn lg">
              Já tenho conta
            </Link>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>aulas</dt>
              <dd>{allLessons.length}</dd>
            </div>
            <div>
              <dt>horas</dt>
              <dd>~{Math.round(totalMin / 60)}</dd>
            </div>
            <div>
              <dt>exercícios</dt>
              <dd>{exercises}</dd>
            </div>
          </dl>
        </div>
        <TerminalHero />
      </section>

      <section className="home-section">
        <h2 className="section-title">
          <span className="mono-accent">// </span>a trilha
        </h2>
        <div className="home-modules">
          {modules.map((m, i) => (
            <article key={m.id} className="home-module glass">
              <span className="home-module-n">módulo {i + 1}</span>
              <h3>{m.title}</h3>
              <p>{m.description}</p>
              <span className="muted small">{m.lessons.length} aulas</span>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="section-title">
          <span className="mono-accent">// </span>o que tem em cada aula
        </h2>
        <ul className="feature-grid">
          {features.map((f) => (
            <li key={f.title} className="glass">
              <span className="feature-icon" aria-hidden>
                {f.icon}
              </span>
              <strong>{f.title}</strong>
              <span className="muted small">{f.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
