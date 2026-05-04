<template>
  <div class="newsletter">
    <h3 class="newsletter__title">Подписаться на рассылку выгодных предложений Fitness House</h3>
    <form @submit.prevent="submit" novalidate class="newsletter__form">
      <div class="newsletter__field">
        <select v-model="form.club">
          <option value="Архангельск Московский">Архангельск Московский</option>
        </select>
      </div>
      <div class="newsletter__field" :class="{ error: errors.email }">
        <input v-model="form.email" type="email" placeholder="Ваш e-mail" @input="errors.email = false" />
        <span v-if="errors.email" class="newsletter__error">Введите корректный email</span>
      </div>
      <p class="newsletter__legal">
        Отправляя данные, Вы соглашаетесь с
        <a href="https://market.fitnesshouse.ru/storage/documents/legal_information.pdf" target="_blank">Положением</a>
      </p>
      <button type="submit" class="btn-red newsletter__btn" :disabled="loading">
        <span v-if="loading">…</span>
        <span v-else-if="success">✓ Подписаны!</span>
        <span v-else>Подписаться</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { submitLead } from '../api/forms.js'

const form = reactive({ club: 'Архангельск Московский', email: '' })
const errors = reactive({ email: false })
const loading = ref(false)
const success = ref(false)

async function submit() {
  errors.email = !form.email.trim() || !form.email.includes('@')
  if (errors.email) return
  loading.value = true
  try {
    await submitLead({ ...form, type: 'newsletter' })
    success.value = true
  } catch {
    alert('Ошибка подписки')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.newsletter { background: var(--gray); border-radius: 10px; padding: 32px; }
.newsletter__title { font-size: 16px; font-weight: 700; margin-bottom: 20px; line-height: 1.4; }
.newsletter__form { display: flex; flex-direction: column; gap: 10px; }
.newsletter__field { position: relative; }
.newsletter__field input,
.newsletter__field select {
  width: 100%; padding: 11px 14px;
  border: 1.5px solid var(--gray-mid); border-radius: var(--radius);
  font-size: 14px; color: var(--text); background: var(--white);
  transition: border-color var(--transition);
}
.newsletter__field input:focus,
.newsletter__field select:focus { border-color: var(--red); }
.newsletter__field.error input { border-color: var(--red); }
.newsletter__error { font-size: 11px; color: var(--red); display: block; margin-top: 3px; }
.newsletter__legal { font-size: 11px; color: var(--text-light); line-height: 1.5; }
.newsletter__legal a { color: var(--red); text-decoration: underline; }
.newsletter__btn { padding: 12px 24px; font-size: 13px; align-self: flex-start; }
</style>
