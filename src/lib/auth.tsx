import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut as fbSignOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { auth } from './firebase'
import { readJSON, writeJSON } from './storage'

export type AppUser = { id: string; email: string; name: string }

type AuthState = {
  user: AppUser | null
  loading: boolean
  canUseGoogle: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

const LOCAL_USERS = 'pd:local-users'
const LOCAL_SESSION = 'pd:local-session'

type LocalUser = AppUser & { pass: string }

// Hash simples só pro modo local de teste. Não é segurança real:
// em produção quem cuida da senha é o Firebase.
async function hash(text: string) {
  const data = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('')
}

function toAppUser(u: User): AppUser {
  return {
    id: u.uid,
    email: u.email ?? '',
    name: u.displayName || (u.email ?? '').split('@')[0] || 'aluno',
  }
}

const messages: Record<string, string> = {
  'auth/invalid-credential': 'Email ou senha incorretos.',
  'auth/wrong-password': 'Email ou senha incorretos.',
  'auth/user-not-found': 'Email ou senha incorretos.',
  'auth/invalid-email': 'Esse email não parece válido.',
  'auth/email-already-in-use': 'Esse email já tem conta. Tente entrar.',
  'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
  'auth/too-many-requests': 'Muitas tentativas seguidas. Espere um pouco e tente de novo.',
  'auth/network-request-failed': 'Sem conexão com o servidor. Verifique sua internet.',
  'auth/popup-closed-by-user': 'A janela do Google foi fechada antes de terminar.',
  'auth/cancelled-popup-request': 'A janela do Google foi fechada antes de terminar.',
  'auth/unauthorized-domain': 'Este endereço ainda não foi autorizado no Firebase (Authentication > Settings > Authorized domains).',
  'auth/account-exists-with-different-credential': 'Esse email já tem conta com outro tipo de login.',
  'auth/operation-not-allowed': 'Esse tipo de login não está ativado no Firebase.',
}

function friendly(err: unknown): Error {
  const code = (err as { code?: string })?.code ?? ''
  if (code.startsWith('auth/api-key-not-valid') || code === 'auth/invalid-api-key')
    return new Error('A configuração do Firebase está errada. Confira as chaves no .env.local.')
  return new Error(messages[code] ?? 'Algo deu errado. Tente de novo.')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setUser(readJSON<AppUser | null>(LOCAL_SESSION, null))
      setLoading(false)
      return
    }
    return onAuthStateChanged(auth, (u) => {
      setUser(u ? toAppUser(u) : null)
      setLoading(false)
    })
  }, [])

  async function signIn(email: string, password: string) {
    if (auth) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (e) {
        throw friendly(e)
      }
      return
    }
    const users = readJSON<LocalUser[]>(LOCAL_USERS, [])
    const pass = await hash(password)
    const found = users.find((u) => u.email === email.toLowerCase() && u.pass === pass)
    if (!found) throw new Error('Email ou senha incorretos.')
    const session = { id: found.id, email: found.email, name: found.name }
    writeJSON(LOCAL_SESSION, session)
    setUser(session)
  }

  async function signUp(name: string, email: string, password: string) {
    if (auth) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(cred.user, { displayName: name })
        setUser(toAppUser(cred.user)) // onAuthStateChanged dispara antes do nome existir
      } catch (e) {
        throw friendly(e)
      }
      return
    }
    const users = readJSON<LocalUser[]>(LOCAL_USERS, [])
    const normalized = email.toLowerCase()
    if (users.some((u) => u.email === normalized)) throw new Error('Esse email já tem conta. Tente entrar.')
    const newUser: LocalUser = { id: crypto.randomUUID(), email: normalized, name, pass: await hash(password) }
    if (!writeJSON(LOCAL_USERS, [...users, newUser])) throw new Error('Não foi possível salvar no navegador.')
    const session = { id: newUser.id, email: newUser.email, name: newUser.name }
    writeJSON(LOCAL_SESSION, session)
    setUser(session)
  }

  async function signInWithGoogle() {
    if (!auth) throw new Error('Login com Google só funciona com o Firebase configurado.')
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      await signInWithPopup(auth, provider)
    } catch (e) {
      // Navegadores que bloqueiam popup (alguns celulares, apps embutidos): vai por redirecionamento
      if ((e as { code?: string })?.code === 'auth/popup-blocked') {
        await signInWithRedirect(auth, provider)
        return
      }
      throw friendly(e)
    }
  }

  async function resetPassword(email: string) {
    if (!auth) throw new Error('No modo local não tem envio de email. Crie outra conta de teste.')
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (e) {
      // Não revela se o email existe ou não
      const code = (e as { code?: string })?.code
      if (code === 'auth/user-not-found') return
      throw friendly(e)
    }
  }

  async function signOut() {
    if (auth) await fbSignOut(auth)
    else localStorage.removeItem(LOCAL_SESSION)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, canUseGoogle: !!auth, signIn, signUp, signInWithGoogle, resetPassword, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  return ctx
}
