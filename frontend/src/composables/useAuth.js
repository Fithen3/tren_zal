import { ref, computed } from 'vue'

const token = ref(localStorage.getItem('fh_admin_token') || null)
const user = ref(JSON.parse(localStorage.getItem('fh_admin_user') || 'null'))

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)

  function login(newToken, userData) {
    token.value = newToken
    user.value = userData
    localStorage.setItem('fh_admin_token', newToken)
    localStorage.setItem('fh_admin_user', JSON.stringify(userData))
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('fh_admin_token')
    localStorage.removeItem('fh_admin_user')
  }

  function getHeaders() {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  return { token, user, isAuthenticated, login, logout, getHeaders }
}
