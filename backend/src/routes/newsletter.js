import { Router } from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = join(__dirname, '../data/newsletter.json')

function readSubs() {
  if (!existsSync(DATA_PATH)) return []
  return JSON.parse(readFileSync(DATA_PATH, 'utf8'))
}

const router = Router()

// POST /api/newsletter
router.post('/', (req, res) => {
  const { email, club } = req.body
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' })
  }

  const subs = readSubs()
  const normalized = email.trim().toLowerCase()
  if (!subs.find(s => s.email === normalized)) {
    subs.push({ email: normalized, club: club || null, subscribed_at: new Date().toISOString() })
    writeFileSync(DATA_PATH, JSON.stringify(subs, null, 2))
  }

  res.status(201).json({ ok: true })
})

export default router
