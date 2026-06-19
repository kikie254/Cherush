import { initializeApp, getApps, cert, type App } from 'firebase-admin/app'
import { getAuth as getAdminAuth, type Auth } from 'firebase-admin/auth'
import { getFirestore as getAdminFirestore, type Firestore } from 'firebase-admin/firestore'

function isAdminConfigured() {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
  )
}

let adminApp: App | null = null
let adminAuth: Auth | null = null
let adminDb: Firestore | null = null

if (isAdminConfigured()) {
  adminApp = getApps().find((a) => a.name === 'admin') ?? initializeApp(
    {
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      }),
    },
    'admin'
  )
  adminAuth = getAdminAuth(adminApp)
  adminDb = getAdminFirestore(adminApp)
}

export { adminApp, adminAuth, adminDb, isAdminConfigured }
