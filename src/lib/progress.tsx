import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import { useAuth } from './auth'
import { db } from './firebase'
import { readJSON, writeJSON } from './storage'

// Firestore: users/{uid}/progress/{lessonId} = { completedAt }

type ProgressState = {
  completed: Set<string>
  loading: boolean
  error: string | null
  markComplete: (lessonId: string) => Promise<void>
  markIncomplete: (lessonId: string) => Promise<void>
}

const ProgressContext = createContext<ProgressState | null>(null)
const localKey = (userId: string) => `pd:progress:${userId}`

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setCompleted(new Set())
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)

    if (!db) {
      setCompleted(new Set(readJSON<string[]>(localKey(user.id), [])))
      setLoading(false)
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
        if (!cancelled) setLoading(false)
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

  return (
    <ProgressContext.Provider value={{ completed, loading, error, markComplete, markIncomplete }}>
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
