import { Router } from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { requireAuth } from '../middleware/authMiddleware.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = join(__dirname, '../data/news.json')

function readNews() {
  if (!existsSync(DATA_PATH)) return []
  return JSON.parse(readFileSync(DATA_PATH, 'utf8'))
}

function writeNews(data) {
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
}

function nextId(items) {
  if (!items.length) return 1
  return Math.max(...items.map(i => i.id || 0)) + 1
}

const router = Router()

// GET /api/news — public
router.get('/', (req, res) => {
  const news = readNews()
  res.json(news.filter(n => n.active !== false).slice(0, 20))
})

// POST /api/news — admin
router.post('/', requireAuth, (req, res) => {
  const news = readNews()
  const item = { id: nextId(news), ...req.body, created_at: new Date().toISOString() }
  news.unshift(item)
  writeNews(news)
  res.status(201).json(item)
})

// PUT /api/news/:id — admin
router.put('/:id', requireAuth, (req, res) => {
  const news = readNews()
  const idx = news.findIndex(n => String(n.id) === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  news[idx] = { ...news[idx], ...req.body, id: news[idx].id }
  writeNews(news)
  res.json(news[idx])
})

// DELETE /api/news/:id — admin
router.delete('/:id', requireAuth, (req, res) => {
  const news = readNews()
  const filtered = news.filter(n => String(n.id) !== req.params.id)
  if (filtered.length === news.length) return res.status(404).json({ error: 'Not found' })
  writeNews(filtered)
  res.json({ ok: true })
})

export default router
