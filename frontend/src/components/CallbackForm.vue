<template>
  <div class="callback-form">
    <form @submit.prevent="submit" novalidate>
      <div class="cb-field" :class="{ error: errors.name }">
        <input v-model="form.name" type="text" placeholder="Введите имя" @input="errors.name = false" />
        <span v-if="errors.name" class="cb-error">Введите имя</span>
      </div>
      <div class="cb-field" :class="{ error: errors.phone }">
        <input v-model="form.phone" type="tel" placeholder="Введите номер телефона" @input="errors.phone = false" />
        <span v-if="errors.phone" class="cb-error">Введите телефон</span>
      </div>
      <div class="cb-field">
        <select v-model="form.club">
          <option value="">Выбрать клуб</option>
          <option>Архангельск Московский</option>
        </select>
      </div>
      <p class="cb-legal">
        Отправляя данные, Вы соглашаетесь с
        <a href="https://market.fitnesshouse.ru/storage/documents/legal_information.pdf" target="_blank">Положением</a>
      </p>
      <button type="submit" class="btn-red cb-btn" :disabled="loading">
        <span v-if="loading">Отправляем…</span>
        <span v-else-if="success">✓ Заявка отправлена!</span>
        <span v-else>Заказать</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { submitLead } from '../api/forms.js'

const form = reactive({ name: '', phone: '', club: 'Архангельск Московский' })
const errors = reactive({ name: false, phone: false })
const loading = ref(false)
const success = ref(false)

async function submit() {
  errors.name = !form.name.trim()
  errors.phone = !form.phone.trim()
  if (errors.name || errors.phone) return
  loading.value = true
  try {
    await submitLead({ ...form, type: 'callback' })
    success.value = true
  } catch {
    alert('Ошибка. Позвоните: (812) 610-06-06')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.callback-form { max-width: 400px; }
.cb-field { margin-bottom: 12px; position: relative; }
.cb-field input, .cb-field select {
  width: 100%; padding: 12px 16px;
  border: 1.5px solid rgba(255,255,255,0.15); border-radius: var(--radius);
  background: rgba(255,255,255,0.06); color: var(--white); font-size: 14px;
  transition: border-color var(--transition);
}
.cb-field input::placeholder { color: rgba(255,255,255,0.4); }
.cb-field input:focus, .cb-field select:focus { border-color: var(--red); }
.cb-field.error input { border-color: var(--red); }
.cb-field select option { background: var(--dark); color: var(--white); }
.cb-error { font-size: 11px; color: #ff6b6b; display: block; margin-top: 3px; }
.cb-legal { font-size: 11px; color: rgba(255,255,255,0.4); margin-bottom: 14px; }
.cb-legal a { color: var(--red); text-decoration: underline; }
.cb-btn { padding: 13px 32px; font-size: 14px; }
.cb-btn:disabled { opacity: 0.7; cursor: not-allowed; }
</style>
