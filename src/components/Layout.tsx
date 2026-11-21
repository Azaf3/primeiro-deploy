import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { isLocalMode } from '../lib/firebase'
import { AnimatedBg } from './AnimatedBg'

export function Layout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const reading = pathname.startsWith('/aula')

  return (
    <div className={`app${reading ? ' reading' : ''}`}>
      <AnimatedBg />
      {isLocalMode && (
        <div className="local-banner" role="note">
          Modo local: contas e progresso ficam só neste navegador. Configure o Firebase pra salvar na nuvem.
        </div>
      )}
      <header className="topbar">
        <Link to={user ? '/trilha' : '/'} className="brand" aria-label="Primeiro Deploy, início">
          <span className="brand-mark" aria-hidden>
            &gt;_
          </span>
          <span className="brand-name">
            primeiro<span className="brand-accent">-deploy</span>
            <span className="brand-caret" aria-hidden />
          </span>
        </Link>
        <nav className="topnav">
          {user ? (
            <>
              <NavLink to="/trilha">Trilha</NavLink>
              <span className="user-chip" title={user.email}>
                {user.name}
              </span>
              <button
                className="btn ghost small"
                onClick={async () => {
                  await signOut()
                  navigate('/')
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <Link className="btn small primary" to="/entrar">
              Entrar
            </Link>
          )}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <a className="footer-iee" href="#/" aria-label="Uma iniciativa do Instituto Evolutivo de Educação">
          <span className="footer-iee-label">uma iniciativa do</span>
          <span className="footer-iee-badge">
            <img src="./iee-logo.png" alt="Instituto Evolutivo de Educação" />
          </span>
        </a>
        <span>primeiro-deploy · feito pra quem está começando agora</span>
      </footer>
    </div>
  )
}
