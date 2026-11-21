import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="empty">
      <p className="empty-code">404</p>
      <h1>Essa página não existe</h1>
      <p className="muted">O link pode estar errado ou a aula mudou de lugar.</p>
      <Link to="/" className="btn primary">
        Voltar pro início
      </Link>
    </div>
  )
}
