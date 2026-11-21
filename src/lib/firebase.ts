import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore/lite'

const env = import.meta.env
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  appId: env.VITE_FIREBASE_APP_ID as string | undefined,
}

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

// Sem config completa o app roda em "modo local" (dados só no navegador)
if (config.apiKey && config.authDomain && config.projectId && config.appId) {
  app = initializeApp(config)
  auth = getAuth(app)
  auth.languageCode = 'pt-BR' // emails de redefinição de senha em português
  db = getFirestore(app)
}

export { auth, db }
export const isLocalMode = auth === null
