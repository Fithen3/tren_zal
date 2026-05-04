import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import leadsRouter from './routes/leads.js'
import newsRouter from './routes/news.js'
import newsletterRouter from './routes/newsletter.js'
import authRouter from './routes/auth.js'
import contentRouter from './routes/content.js'

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.use('/api/auth', authRouter)
app.use('/api/content', contentRouter)
app.use('/api/leads', leadsRouter)
app.use('/api/news', newsRouter)
app.use('/api/newsletter', newsletterRouter)

app.use((req, res) => res.status(404).json({ error: 'Not found' }))
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`))
