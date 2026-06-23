import { initializeApp, getApps, cert, type App } from 'firebase-admin/app'
import { getAuth as getAdminAuth, type Auth } from 'firebase-admin/auth'
import { getFirestore as getAdminFirestore, type Firestore } from 'firebase-admin/firestore'
import fs from 'fs'
import path from 'path'
import { seedContent, seedGallery, seedPricing, seedReviews, seedRooms, seedSettings } from '../site-data'

function isAdminConfigured() {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
  )
}

// ---------------------------------------------------------------------------
// Local JSON Mock DB (Fallback)
// ---------------------------------------------------------------------------
class LocalCollectionReference {
  private name: string
  private dbPath: string

  constructor(name: string) {
    this.name = name
    // Save DB file in the project folder
    this.dbPath = path.join(process.cwd(), 'src', 'lib', 'db-local.json')
  }

  private readDb() {
    if (!fs.existsSync(this.dbPath)) {
      const initial = {
        rooms: seedRooms.reduce((acc: any, r) => ({ ...acc, [r.id]: r }), {}),
        reviews: seedReviews.reduce((acc: any, r) => ({ ...acc, [r.id]: r }), {}),
        gallery: seedGallery.reduce((acc: any, g) => ({ ...acc, [g.id]: g }), {}),
        pricing_rules: seedPricing.reduce((acc: any, p) => ({ ...acc, [p.id]: p }), {}),
        site_settings: seedSettings.reduce((acc: any, s) => ({ ...acc, [s.key]: s }), {}),
        content: seedContent.reduce((acc: any, c) => ({ ...acc, [c.id]: c }), {}),
        bookings: {},
      }
      fs.writeFileSync(this.dbPath, JSON.stringify(initial, null, 2), 'utf8')
      return initial
    }
    try {
      return JSON.parse(fs.readFileSync(this.dbPath, 'utf8'))
    } catch {
      return {}
    }
  }

  private writeDb(data: any) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2), 'utf8')
  }

  async get() {
    const db = this.readDb()
    const coll = db[this.name] || {}
    const docs = Object.entries(coll).map(([id, data]: [string, any]) => ({
      id,
      data: () => data,
      exists: true,
    }))
    return {
      docs,
      forEach: (cb: any) => docs.forEach(cb),
    }
  }

  async add(data: any) {
    const db = this.readDb()
    if (!db[this.name]) db[this.name] = {}
    const id = data.id || crypto.randomUUID()
    db[this.name][id] = { ...data, id }
    this.writeDb(db)
    return { id }
  }

  doc(id: string) {
    return {
      get: async () => {
        const db = this.readDb()
        const coll = db[this.name] || {}
        const data = coll[id]
        return {
          id,
          exists: !!data,
          data: () => data,
        }
      },
      set: async (data: any, options?: { merge?: boolean }) => {
        const db = this.readDb()
        if (!db[this.name]) db[this.name] = {}
        const existing = db[this.name][id] || {}
        db[this.name][id] = options?.merge ? { ...existing, ...data } : data
        this.writeDb(db)
      },
      update: async (data: any) => {
        const db = this.readDb()
        if (!db[this.name]) db[this.name] = {}
        const existing = db[this.name][id] || {}
        db[this.name][id] = { ...existing, ...data }
        this.writeDb(db)
      },
      delete: async () => {
        const db = this.readDb()
        if (db[this.name] && db[this.name][id]) {
          delete db[this.name][id]
          this.writeDb(db)
        }
      },
    }
  }
}

class LocalFirestoreMock {
  collection(name: string) {
    return new LocalCollectionReference(name)
  }
}

class LocalAuthMock {
  async verifySessionCookie(sessionCookie: string, checkRevoked?: boolean) {
    if (sessionCookie && sessionCookie.startsWith('mock-session-')) {
      return {
        uid: 'admin-uid',
        email: 'admin@cherushstayiten.com',
        name: 'Dev Admin',
      }
    }
    throw new Error('Invalid mock session cookie')
  }

  async createSessionCookie(idToken: string, options: { expiresIn: number }) {
    return `mock-session-cookie-${Date.now()}`
  }
}

// ---------------------------------------------------------------------------
// Initialization
// ---------------------------------------------------------------------------
let adminApp: App | null = null
let adminAuth: any = null
let adminDb: any = null

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
} else {
  // Gracefully fallback to Local Mock instances
  adminDb = new LocalFirestoreMock()
  adminAuth = new LocalAuthMock()
}

export { adminApp, adminAuth, adminDb, isAdminConfigured }

