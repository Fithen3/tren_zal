import { Router } from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { requireAuth } from '../middleware/authMiddleware.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '../data')

const ALLOWED = ['trainers', 'promotions', 'posts', 'schedule']

function dataPath(type) {
  return join(DATA_DIR, `${type}.json`)
}

function readData(type) {
  const p = dataPath(type)
  if (!existsSync(p)) return []
  return JSON.parse(readFileSync(p, 'utf8'))
}

function writeData(type, data) {
  writeFileSync(dataPath(type), JSON.stringify(data, null, 2))
}

function nextId(items) {
  if (!items.length) return 1
  return Math.max(...items.map(i => i.id || 0)) + 1
}

const router = Router()

// GET all items of a type (public)
router.get('/:type', (req, res) => {
  const { type } = req.params
  if (!ALLOWED.includes(type)) return res.status(404).json({ error: 'Unknown type' })
  res.json(readData(type))
})

// POST create (admin)
router.post('/:type', requireAuth, (req, res) => {
  const { type } = req.params
  if (!ALLOWED.includes(type)) return res.status(404).json({ error: 'Unknown type' })
  const items = readData(type)
  const item = { id: nextId(items), ...req.body, createdAt: new Date().toISOString() }
  items.push(item)
  writeData(type, items)
  res.status(201).json(item)
})

// PUT update (admin)
router.put('/:type/:id', requireAuth, (req, res) => {
  const { type, id } = req.params
  if (!ALLOWED.includes(type)) return res.status(404).json({ error: 'Unknown type' })
  const items = readData(type)
  const idx = items.findIndex(i => String(i.id) === id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  items[idx] = { ...items[idx], ...req.body, id: items[idx].id }
  writeData(type, items)
  res.json(items[idx])
})

// DELETE (admin)
router.delete('/:type/:id', requireAuth, (req, res) => {
  const { type, id } = req.params
  if (!ALLOWED.includes(type)) return res.status(404).json({ error: 'Unknown type' })
  const items = readData(type)
  const filtered = items.filter(i => String(i.id) !== id)
  if (filtered.length === items.length) return res.status(404).json({ error: 'Not found' })
  writeData(type, filtered)
  res.json({ ok: true })
})

export default router
