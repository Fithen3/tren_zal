import { Router } from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { requireAuth } from '../middleware/authMiddleware.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = join(__dirname, '../data/leads.json')

function readLeads() {
  if (!existsSync(DATA_PATH)) return []
  return JSON.parse(readFileSync(DATA_PATH, 'utf8'))
}

function writeLeads(data) {
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
}

function nextId(items) {
  if (!items.length) return 1
  return Math.max(...items.map(i => i.id || 0)) + 1
}

const router = Router()

// POST /api/leads — public (from contact forms)
router.post('/', (req, res) => {
  const { name, phone, service, club, email, type } = req.body
  if (!name || !phone) return res.status(400).json({ error: 'name and phone are required' })

  const leads = readLeads()
  const item = {
    id: nextId(leads),
    name: name.trim(),
    phone: phone.trim(),
    email: email?.trim() || null,
    service: service || null,
    club: club || null,
    type: type || 'lead',
    status: 'new',
    created_at: new Date().toISOString()
  }
  leads.push(item)
  writeLeads(leads)
  res.status(201).json({ ok: true, id: item.id })
})

// GET /api/leads — admin only
router.get('/', requireAuth, (req, res) => {
  const leads = readLeads()
  res.json(leads.slice().reverse())
})

// PUT /api/leads/:id — admin: update status
router.put('/:id', requireAuth, (req, res) => {
  const leads = readLeads()
  const idx = leads.findIndex(l => String(l.id) === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  leads[idx] = { ...leads[idx], ...req.body, id: leads[idx].id }
  writeLeads(leads)
  res.json(leads[idx])
})

// DELETE /api/leads/:id — admin
router.delete('/:id', requireAuth, (req, res) => {
  const leads = readLeads()
  const filtered = leads.filter(l => String(l.id) !== req.params.id)
  if (filtered.length === leads.length) return res.status(404).json({ error: 'Not found' })
  writeLeads(filtered)
  res.json({ ok: true })
})

export default router
