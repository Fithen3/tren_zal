<template>
  <div class="login-page">
    <div class="login-card fade-up">
      <div class="login-logo">
        <img src="https://www.fitnesshouse.ru/assets/templates/fh2023/img/logo.svg" alt="Fitness House" />
      </div>
      <h1 class="login-title">Вход в систему</h1>
      <p class="login-sub">Панель управления сайтом</p>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-field" :class="{ error: errors.email }">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="admin@fitnesshouse.ru" autocomplete="username" />
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>
        <div class="form-field" :class="{ error: errors.password }">
          <label>Пароль</label>
          <div class="input-wrap">
            <input v-model="form.password" :type="showPass ? 'text' : 'password'" placeholder="••••••••" autocomplete="current-password" />
            <button type="button" class="toggle-pass" @click="showPass = !showPass">
              {{ showPass ? '🙈' : '👁' }}
            </button>
          </div>
          <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
        </div>

        <p v-if="serverError" class="server-error">{{ serverError }}</p>

        <button type="submit" class="btn-login" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Войти</span>
        </button>
      </form>

      <router-link to="/" class="back-link">← Вернуться на сайт</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'
import { apiLogin } from '../api/admin.js'

const router = useRouter()
const { login, isAuthenticated } = useAuth()

if (isAuthenticated.value) router.replace('/admin')

const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })
const serverError = ref('')
const loading = ref(false)
const showPass = ref(false)

async function handleLogin() {
  errors.email = form.email ? '' : 'Введите email'
  errors.password = form.password ? '' : 'Введите пароль'
  if (errors.email || errors.password) return

  loading.value = true
  serverError.value = ''
  try {
    const data = await apiLogin(form.email, form.password)
    login(data.token, data.user)
    router.push('/admin')
  } catch (e) {
    serverError.value = e.response?.data?.error || 'Ошибка подключения к серверу'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--black) 0%, #1a0506 100%);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.login-card {
  background: var(--white); border-radius: 16px;
  padding: 48px 40px; width: 100%; max-width: 420px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.5);
  text-align: center;
}
.login-logo img { height: 40px; margin: 0 auto 24px; display: block; }
.login-title { font-family: var(--font-display); font-size: 28px; color: var(--black); margin-bottom: 4px; }
.login-sub { font-size: 14px; color: var(--text-light); margin-bottom: 32px; }

.login-form { display: flex; flex-direction: column; gap: 16px; text-align: left; }
.form-field label { display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-light); margin-bottom: 6px; }
.form-field input {
  width: 100%; padding: 12px 16px;
  border: 1.5px solid var(--gray-mid); border-radius: var(--radius);
  font-size: 14px; transition: border-color var(--transition);
}
.form-field input:focus { border-color: var(--red); outline: none; }
.form-field.error input { border-color: var(--red); }
.field-error { font-size: 11px; color: var(--red); margin-top: 4px; display: block; }

.input-wrap { position: relative; }
.input-wrap input { padding-right: 44px; }
.toggle-pass {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: none; cursor: pointer; font-size: 16px; line-height: 1;
}

.server-error {
  background: #fff0f0; border: 1px solid #fca5a5; border-radius: var(--radius);
  padding: 10px 14px; font-size: 13px; color: #b91c1c; text-align: center;
}

.btn-login {
  background: var(--red); color: var(--white);
  padding: 14px; border-radius: var(--radius);
  font-size: 14px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.5px; cursor: pointer; border: none;
  transition: background var(--transition); margin-top: 4px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-login:hover:not(:disabled) { background: var(--red-dark); }
.btn-login:disabled { opacity: 0.7; cursor: not-allowed; }

.spinner {
  width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3);
  border-top-color: var(--white); border-radius: 50%; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.back-link {
  display: block; margin-top: 24px; font-size: 13px;
  color: var(--text-light); transition: color var(--transition);
}
.back-link:hover { color: var(--red); }
</style>
