<template>
  <div class="tour-form">
    <h2 class="section-title">Записаться на экскурсию</h2>
    <form @submit.prevent="submit" novalidate>
      <div class="form-field" :class="{ error: errors.name }">
        <input v-model="form.name" type="text" placeholder="Введите имя" @input="errors.name = false" />
        <span v-if="errors.name" class="form-error">Введите имя</span>
      </div>
      <div class="form-field" :class="{ error: errors.email }">
        <input v-model="form.email" type="email" placeholder="Введите @email" @input="errors.email = false" />
        <span v-if="errors.email" class="form-error">Введите email</span>
      </div>
      <div class="form-field" :class="{ error: errors.phone }">
        <input v-model="form.phone" type="tel" placeholder="Введите номер телефона" @input="errors.phone = false" />
        <span v-if="errors.phone" class="form-error">Введите телефон</span>
      </div>
      <div class="form-field">
        <select v-model="form.club">
          <option value="Архангельск Московский">Архангельск Московский</option>
        </select>
      </div>
      <p class="form-legal">
        Отправляя данные, Вы соглашаетесь на обработку персональных данных в соответствии с
        <a href="https://market.fitnesshouse.ru/storage/documents/legal_information.pdf" target="_blank">Положением</a>
      </p>
      <button type="submit" class="btn-red form-btn" :disabled="loading">
        <span v-if="loading">Отправляем…</span>
        <span v-else-if="success">✓ Записаны!</span>
        <span v-else>Записаться</span>
      </button>
      <p v-if="success" class="form-success">Ваш менеджер свяжется с вами в ближайшее время</p>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { submitLead } from '../api/forms.js'

const emit = defineEmits(['submitted'])
const form = reactive({ name: '', email: '', phone: '', club: 'Архангельск Московский' })
const errors = reactive({ name: false, email: false, phone: false })
const loading = ref(false)
const success = ref(false)

async function submit() {
  errors.name = !form.name.trim()
  errors.email = !form.email.trim() || !form.email.includes('@')
  errors.phone = !form.phone.trim()
  if (errors.name || errors.email || errors.phone) return

  loading.value = true
  try {
    await submitLead({ ...form, type: 'tour' })
    success.value = true
    setTimeout(() => emit('submitted'), 2000)
  } catch {
    alert('Ошибка отправки. Позвоните: (812) 610-06-06')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.tour-form .section-title { margin-bottom: 20px; font-size: 28px; }
.form-field { margin-bottom: 12px; position: relative; }
.form-field input, .form-field select {
  width: 100%; padding: 12px 16px;
  border: 1.5px solid var(--gray-mid); border-radius: var(--radius);
  font-size: 14px; color: var(--text); background: var(--white);
  transition: border-color var(--transition);
}
.form-field input:focus, .form-field select:focus { border-color: var(--red); }
.form-field.error input { border-color: var(--red); }
.form-error { font-size: 11px; color: var(--red); display: block; margin-top: 3px; }
.form-legal { font-size: 11px; color: var(--text-light); margin-bottom: 14px; line-height: 1.5; }
.form-legal a { color: var(--red); text-decoration: underline; }
.form-btn { width: 100%; text-align: center; padding: 14px; font-size: 14px; }
.form-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.form-success { margin-top: 10px; font-size: 13px; color: #2a9d2a; font-weight: 600; text-align: center; }
</style>
