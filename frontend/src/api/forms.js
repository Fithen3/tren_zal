import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export async function submitLead(data) {
  const res = await axios.post(`${API_BASE}/leads`, data)
  return res.data
}

export async function getNews(clubId = 2194) {
  const res = await axios.get(`${API_BASE}/news?club=${clubId}`)
  return res.data
}

export async function subscribeNewsletter(data) {
  const res = await axios.post(`${API_BASE}/newsletter`, data)
  return res.data
}
