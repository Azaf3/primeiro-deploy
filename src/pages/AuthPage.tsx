import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../lib/auth'

type Mode = 'signin' | 'signup' | 'reset'
type Errors = Partial<Record<'name' | 'email' | 'password' | 'form', string>>

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const titles: Record<Mode, { h: string; sub: string; cta: string }> = {
  signin: { h: 'Entrar', sub: 'Bom te ver de novo.', cta: 'Entrar' },
  signup: { h: 'Criar sua conta', sub: 'Seu progresso fica salvo e você continua de onde parou.', cta: 'Criar conta' },
  reset: { h: 'Redefinir senha', sub: 'Te mandamos um link pra criar uma senha nova.', cta: 'Enviar link' },
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

export function AuthPage() {
  const { user, signIn, signUp, signInWithGoogle, resetPassword, canUseGoogle } = useAuth()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const modeParam = params.get('modo')
  const mode: Mode = modeParam === 'criar' ? 'signup' : modeParam === 'senha' ? 'reset' : 'signin'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [info, setInfo] = useState<string | null>(null)

  if (user) return <Navigate to="/trilha" replace />

  function validate(): Errors {
    const e: Errors = {}
    if (mode === 'signup' && name.trim().length < 2) e.name = 'Digite seu nome (pelo menos 2 letras).'
    if (!email.trim()) e.email = 'Digite seu email.'
    else if (!emailRe.test(email.trim())) e.email = 'Esse email não parece válido. Confira se tem @ e domínio.'
    if (mode !== 'reset') {
      if (!password) e.password = 'Digite sua senha.'
      else if (mode === 'signup' && password.length < 6) e.password = 'A senha precisa ter pelo menos 6 caracteres.'
    }
    return e
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    setInfo(null)
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setSubmitting(true)
    try {
      if (mode === 'reset') {
        await resetPassword(email.trim())
        setInfo('Se existir uma conta com esse email, o link chega em alguns minutos. Confira também o spam.')
        return
      }
      if (mode === 'signup') await signUp(name.trim(), email.trim(), password)
      else await signIn(email.trim(), password)
      navigate('/trilha')
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Algo deu errado. Tente de novo.' })
    } finally {
      setSubmitting(false)
    }
  }

  async function onGoogle() {
    setErrors({})
    setInfo(null)
    setSubmitting(true)
    try {
      await signInWithGoogle()
      navigate('/trilha')
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Algo deu errado. Tente de novo.' })
    } finally {
      setSubmitting(false)
    }
  }

  function go(next: Mode) {
    setErrors({})
    setInfo(null)
    setParams(next === 'signup' ? { modo: 'criar' } : next === 'reset' ? { modo: 'senha' } : {})
  }

  const t = titles[mode]

  return (
    <div className="auth">
      <form className="auth-card" onSubmit={onSubmit} noValidate>
        <h1>{t.h}</h1>
        <p className="muted">{t.sub}</p>

        {info && (
          <p className="form-info" role="status">
            {info}
          </p>
        )}
        {errors.form && (
          <p className="form-error" role="alert">
            {errors.form}
          </p>
        )}

        {mode !== 'reset' && canUseGoogle && (
          <>
            <button type="button" className="btn lg full google-btn" onClick={onGoogle} disabled={submitting}>
              <GoogleIcon /> Continuar com Google
            </button>
            <div className="divider">
              <span>ou com email</span>
            </div>
          </>
        )}

        {mode === 'signup' && (
          <div className="field">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-err' : undefined}
            />
            {errors.name && (
              <span id="name-err" className="field-error">
                {errors.name}
              </span>
            )}
          </div>
        )}

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-err' : undefined}
          />
          {errors.email && (
            <span id="email-err" className="field-error">
              {errors.email}
            </span>
          )}
        </div>

        {mode !== 'reset' && (
          <div className="field">
            <div className="field-head">
              <label htmlFor="password">Senha</label>
              {mode === 'signin' && (
                <button type="button" className="link-btn small" onClick={() => go('reset')}>
                  Esqueci minha senha
                </button>
              )}
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-err' : undefined}
            />
            {errors.password && (
              <span id="password-err" className="field-error">
                {errors.password}
              </span>
            )}
          </div>
        )}

        <button className="btn primary lg full" type="submit" disabled={submitting}>
          {submitting ? 'Aguarde...' : t.cta}
        </button>

        <p className="auth-switch">
          {mode === 'signup' && (
            <>
              Já tem conta?{' '}
              <button type="button" className="link-btn" onClick={() => go('signin')}>
                Entrar
              </button>
            </>
          )}
          {mode === 'signin' && (
            <>
              Ainda não tem conta?{' '}
              <button type="button" className="link-btn" onClick={() => go('signup')}>
                Criar conta
              </button>
            </>
          )}
          {mode === 'reset' && (
            <button type="button" className="link-btn" onClick={() => go('signin')}>
              Voltar pro login
            </button>
          )}
        </p>
      </form>
    </div>
  )
}
