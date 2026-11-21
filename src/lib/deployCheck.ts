// Confere uma publicação: repositório público no GitHub + site no ar no GitHub Pages.
// Usa só APIs que aceitam chamada direto do navegador (CORS liberado).

export type Parsed = { owner: string; repo: string }

export function parseRepo(input: string): Parsed | null {
  const s = input.trim().replace(/\.git$/, '').replace(/\/+$/, '')
  const m =
    s.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([\w-]+)\/([\w.-]+)$/i) ?? s.match(/^([\w-]+)\/([\w.-]+)$/)
  return m ? { owner: m[1], repo: m[2] } : null
}

/** Endereço que o GitHub Pages usa pra esse repositório */
export function expectedSite({ owner, repo }: Parsed): string {
  const host = `${owner.toLowerCase()}.github.io`
  return repo.toLowerCase() === host ? `https://${host}/` : `https://${host}/${repo}/`
}

export function normalizeSite(input: string): string | null {
  let s = input.trim()
  if (!s) return null
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s
  try {
    const u = new URL(s)
    if (!u.hostname.toLowerCase().endsWith('.github.io')) return null
    u.protocol = 'https:'
    u.hash = ''
    u.search = ''
    let path = u.pathname
    if (!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) path += '/'
    return `https://${u.hostname.toLowerCase()}${path}`
  } catch {
    return null
  }
}

export type StepStatus = 'ok' | 'fail' | 'pending'
export type CheckResult = { repo: StepStatus; site: StepStatus; message: string | null }

async function withTimeout(url: string, init: RequestInit = {}, ms = 10000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(url, { ...init, signal: ctrl.signal })
  } finally {
    clearTimeout(t)
  }
}

export async function checkDeploy(repoInput: string, siteInput: string): Promise<CheckResult> {
  const parsed = parseRepo(repoInput)
  if (!parsed)
    return { repo: 'fail', site: 'pending', message: 'Link do repositório inválido. Formato: https://github.com/seu-usuario/nome-do-projeto' }

  const site = normalizeSite(siteInput)
  if (!site)
    return { repo: 'pending', site: 'fail', message: 'Link do site inválido. Ele termina em .github.io, tipo https://seu-usuario.github.io/nome-do-projeto/' }

  const expected = expectedSite(parsed)
  if (!site.toLowerCase().startsWith(expected.toLowerCase()))
    return {
      repo: 'pending',
      site: 'fail',
      message: `O site não bate com o repositório. Pra esse repositório, o endereço do GitHub Pages é ${expected}`,
    }

  // 1. Repositório existe e é público
  try {
    const res = await withTimeout(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (res.status === 404)
      return {
        repo: 'fail',
        site: 'pending',
        message: 'Repositório não encontrado. Confira o link e se ele está público (Settings > General > Danger Zone > Change visibility).',
      }
    if (res.status === 403 || res.status === 429)
      return { repo: 'fail', site: 'pending', message: 'O GitHub limitou as consultas por agora. Espere alguns minutos e tente de novo.' }
    if (!res.ok) return { repo: 'fail', site: 'pending', message: 'Não consegui consultar o GitHub. Tente de novo.' }
    const data = (await res.json()) as { private?: boolean }
    if (data.private)
      return { repo: 'fail', site: 'pending', message: 'O repositório está privado. Deixe público pra usar o GitHub Pages grátis.' }
  } catch {
    return { repo: 'fail', site: 'pending', message: 'Sem conexão com o GitHub. Verifique sua internet e tente de novo.' }
  }

  // 2. Site no ar
  try {
    const res = await withTimeout(site, { cache: 'no-store' })
    if (!res.ok)
      return {
        repo: 'ok',
        site: 'fail',
        message:
          res.status === 404
            ? 'O site ainda não está no ar (erro 404). Confira Settings > Pages no repositório e espere 1 ou 2 minutos depois de publicar.'
            : `O site respondeu com erro ${res.status}. Espere um pouco e tente de novo.`,
      }
  } catch {
    return {
      repo: 'ok',
      site: 'fail',
      message: 'Não consegui abrir o site. Se você acabou de publicar, espere 1 ou 2 minutos e tente de novo.',
    }
  }

  return { repo: 'ok', site: 'ok', message: null }
}
