import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { useProgress } from '../lib/progress'

// Pergunta feita uma vez, antes da trilha: define se entra a aula extra de GitHub
export function Comecar() {
  const { user } = useAuth()
  const { githubChoice, setGithubChoice, loading } = useProgress()
  const navigate = useNavigate()
  const [saving, setSaving] = useState<'sim' | 'nao' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const isChanging = githubChoice !== null

  if (!user) return <Navigate to="/entrar" replace />
  if (loading)
    return (
      <div className="center-load" aria-busy="true">
        <span className="spinner" aria-label="Carregando" />
      </div>
    )

  async function choose(choice: 'sim' | 'nao') {
    setSaving(choice)
    setError(null)
    try {
      await setGithubChoice(choice)
      navigate(choice === 'nao' && !isChanging ? '/aula/git-e-github-conta' : '/trilha')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível salvar.')
      setSaving(null)
    }
  }

  return (
    <div className="onboard">
      <p className="eyebrow">{isChanging ? 'ajustar trilha' : `bem-vindo, ${user.name}`}</p>
      <h1>Você já tem conta no GitHub?</h1>
      <p className="lead">
        O GitHub é onde seus projetos vão ficar guardados e ganhar um link na internet. Se ainda não tem, sua trilha
        começa com uma aula rápida explicando o que é e como criar a conta.
      </p>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="onboard-options">
        <button
          className={`onboard-card glass ${githubChoice === 'sim' ? 'selected' : ''}`}
          onClick={() => choose('sim')}
          disabled={saving !== null}
        >
          <span className="onboard-icon" aria-hidden>
            ✓
          </span>
          <strong>Sim, já tenho</strong>
          <span className="muted small">Vou direto pras aulas. Trilha com 20 aulas.</span>
          {saving === 'sim' && <span className="small">Salvando...</span>}
        </button>
        <button
          className={`onboard-card glass ${githubChoice === 'nao' ? 'selected' : ''}`}
          onClick={() => choose('nao')}
          disabled={saving !== null}
        >
          <span className="onboard-icon alt" aria-hidden>
            +1
          </span>
          <strong>Ainda não tenho</strong>
          <span className="muted small">
            Ganho uma aula extra: diferença entre Git e GitHub e como criar a conta. Trilha com 21 aulas.
          </span>
          {saving === 'nao' && <span className="small">Salvando...</span>}
        </button>
      </div>
      <p className="muted small">Dá pra mudar essa resposta depois, no fim da página da trilha.</p>
    </div>
  )
}
