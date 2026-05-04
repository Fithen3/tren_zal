import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: 'Неверный email или пароль' })
  }
  const token = jwt.sign(
    { email, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
  res.json({ token, user: { email, role: 'admin' } })
})

router.get('/me', (req, res) => {
  const header = req.headers['authorization']
  if (!header) return res.status(401).json({ error: 'No token' })
  try {
    const user = jwt.verify(header.slice(7), process.env.JWT_SECRET)
    res.json({ user })
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
})

export default router
