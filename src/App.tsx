import type { ReactNode } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './lib/auth'
import { ProgressProvider } from './lib/progress'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { AuthPage } from './pages/AuthPage'
import { Trilha } from './pages/Trilha'
import { Aula } from './pages/Aula'
import { NotFound } from './pages/NotFound'

function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading)
    return (
      <div className="center-load" aria-busy="true">
        <span className="spinner" aria-label="Carregando" />
      </div>
    )
  if (!user) return <Navigate to="/entrar" replace state={{ from: location }} />
  return <>{children}</>
}

export default function App() {
  return (
    // HashRouter: funciona no GitHub Pages sem configurar redirecionamento
    <HashRouter>
      <AuthProvider>
        <ProgressProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="entrar" element={<AuthPage />} />
              <Route
                path="trilha"
                element={
                  <RequireAuth>
                    <Trilha />
                  </RequireAuth>
                }
              />
              <Route
                path="aula/:id"
                element={
                  <RequireAuth>
                    <Aula />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ProgressProvider>
      </AuthProvider>
    </HashRouter>
  )
}
