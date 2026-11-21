import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import { useAuth } from './auth'
import { db } from './firebase'
import { readJSON, writeJSON } from './storage'
import { buildTrack, type Track } from '../content'

// Firestore: users/{uid}/progress/{lessonId} = { completedAt }
// A resposta "tem conta no GitHub?" fica guardada como um marcador nessa mesma
// coleção (_github-sim / _github-nao), assim as regras do Firestore não mudam.

export type GithubChoice = 'sim' | 'nao' | null
const GH_YES = '_github-sim'
const GH_NO = '_github-nao'

type ProgressState = {
  completed: Set<string>
  loading: boolean
  error: string | null
  markComplete: (lessonId: string) => Promise<void>
  markIncomplete: (lessonId: string) => Promise<void>
  githubChoice: GithubChoice
  setGithubChoice: (choice: 'sim' | 'nao') => Promise<void>
  /** Trilha deste usuário (21 aulas sem GitHub, 20 com) */
  track: Track
}

const ProgressContext = createContext<ProgressState | null>(null)
const localKey = (userId: string) => `pd:progress:${userId}`

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  // id do usuário cujo progresso já foi carregado: evita decidir nada com dados de outro login
  const [loadedFor, setLoadedFor] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setCompleted(new Set())
      setLoadedFor(null)
      return
    }
    let cancelled = false
    setError(null)

    if (!db) {
      setCompleted(new Set(readJSON<string[]>(localKey(user.id), [])))
      setLoadedFor(user.id)
      return
    }

    getDocs(collection(db, 'users', user.id, 'progress'))
      .then((snap) => {
        if (!cancelled) setCompleted(new Set(snap.docs.map((d) => d.id)))
      })
      .catch(() => {
        if (!cancelled) setError('Não foi possível carregar seu progresso. Tente recarregar a página.')
      })
      .finally(() => {
        if (!cancelled) setLoadedFor(user.id)
      })

    return () => {
      cancelled = true
    }
  }, [user])

  const save = useCallback(
    async (lessonId: string, done: boolean) => {
      if (!user) return
      const prev = completed
      const next = new Set(prev)
      if (done) next.add(lessonId)
      else next.delete(lessonId)
      setCompleted(next) // otimista: a tela responde na hora

      if (!db) {
        writeJSON(localKey(user.id), [...next])
        return
      }
      try {
        const ref = doc(db, 'users', user.id, 'progress', lessonId)
        if (done) await setDoc(ref, { completedAt: serverTimestamp() })
        else await deleteDoc(ref)
      } catch {
        setCompleted(prev)
        throw new Error('Não foi possível salvar. Verifique sua conexão.')
      }
    },
    [user, completed],
  )

  const markComplete = useCallback((id: string) => save(id, true), [save])
  const markIncomplete = useCallback((id: string) => save(id, false), [save])

  const loading = !!user && loadedFor !== user.id
  const githubChoice: GithubChoice = completed.has(GH_NO) ? 'nao' : completed.has(GH_YES) ? 'sim' : null
  const track = useMemo(() => buildTrack(githubChoice === 'nao'), [githubChoice])

  const setGithubChoice = useCallback(
    async (choice: 'sim' | 'nao') => {
      if (!user) return
      const add = choice === 'sim' ? GH_YES : GH_NO
      const remove = choice === 'sim' ? GH_NO : GH_YES
      const prev = completed
      const next = new Set(prev)
      next.add(add)
      next.delete(remove)
      setCompleted(next)
      if (!db) {
        writeJSON(localKey(user.id), [...next])
        return
      }
      try {
        await setDoc(doc(db, 'users', user.id, 'progress', add), { completedAt: serverTimestamp() })
        if (prev.has(remove)) await deleteDoc(doc(db, 'users', user.id, 'progress', remove))
      } catch {
        setCompleted(prev)
        throw new Error('Não foi possível salvar. Verifique sua conexão.')
      }
    },
    [user, completed],
  )

  return (
    <ProgressContext.Provider value={{ completed, loading, error, markComplete, markIncomplete, githubChoice, setGithubChoice, track }}>
      {children}
    </ProgressContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress precisa estar dentro de <ProgressProvider>')
  return ctx
}
