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
        <span>primeiro-deploy · criado por Azaf3 pra quem está começando agora</span>
        <span className="footer-sep" aria-hidden />
        <span className="footer-iee">
          <span className="footer-iee-label">apoio</span>
          <img src="./iee-emblem-mono.png" alt="" />
          <span className="footer-iee-name">Instituto Evolutivo de Educação</span>
        </span>
      </footer>
    </div>
  )
}
