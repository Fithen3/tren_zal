import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function headers() {
  const t = localStorage.getItem('fh_admin_token')
  return t ? { Authorization: `Bearer ${t}` } : {}
}

export async function apiLogin(email, password) {
  const res = await axios.post(`${BASE}/auth/login`, { email, password })
  return res.data
}

export async function apiGetContent(type) {
  const res = await axios.get(`${BASE}/content/${type}`)
  return res.data
}

export async function apiCreate(type, data) {
  const res = await axios.post(`${BASE}/content/${type}`, data, { headers: headers() })
  return res.data
}

export async function apiUpdate(type, id, data) {
  if (type === 'leads') {
    const res = await axios.put(`${BASE}/leads/${id}`, data, { headers: headers() })
    return res.data
  }
  if (type === 'news') {
    const res = await axios.put(`${BASE}/news/${id}`, data, { headers: headers() })
    return res.data
  }
  const res = await axios.put(`${BASE}/content/${type}/${id}`, data, { headers: headers() })
  return res.data
}

export async function apiDelete(type, id) {
  if (type === 'leads') {
    await axios.delete(`${BASE}/leads/${id}`, { headers: headers() })
    return
  }
  if (type === 'news') {
    await axios.delete(`${BASE}/news/${id}`, { headers: headers() })
    return
  }
  await axios.delete(`${BASE}/content/${type}/${id}`, { headers: headers() })
}

export async function apiGetLeads() {
  const res = await axios.get(`${BASE}/leads`, { headers: headers() })
  return res.data
}

export async function apiGetNews() {
  const res = await axios.get(`${BASE}/news`)
  return res.data
}

export async function apiCreateNews(data) {
  const res = await axios.post(`${BASE}/news`, data, { headers: headers() })
  return res.data
}
