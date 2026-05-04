<template>
  <div class="lead-form">
    <div class="lead-form__messengers">
      <a href="http://t.me/fitnesshouse29" target="_blank" class="lead-form__messenger">
        <img src="https://www.fitnesshouse.ru/assets/images/svg/tg.svg" alt="Telegram" />
        Telegram
      </a>
      <a href="https://vk.ru/id1090572299" target="_blank" class="lead-form__messenger">
        <img src="https://www.fitnesshouse.ru/assets/images/svg/vk.svg" alt="VK" />
        ВКонтакте
      </a>
    </div>

    <form @submit.prevent="submit" novalidate>
      <div class="lead-form__field" :class="{ error: errors.service }">
        <select v-model="form.service" @change="errors.service = false">
          <option value="">Выберите услугу</option>
          <option value="Абонементы">Абонементы</option>
          <option value="Персональные тренировки">Персональные тренировки</option>
          <option value="Дополнительные услуги">Дополнительные услуги</option>
          <option value="Детские секции">Детские секции</option>
        </select>
        <span v-if="errors.service" class="lead-form__error">Заполните поле</span>
      </div>

      <div class="lead-form__field" :class="{ error: errors.name }">
        <input v-model="form.name" type="text" placeholder="Введите имя" @input="errors.name = false" />
        <span v-if="errors.name" class="lead-form__error">Введите имя</span>
      </div>

      <div class="lead-form__field" :class="{ error: errors.phone }">
        <input v-model="form.phone" type="tel" placeholder="Введите номер телефона" @input="errors.phone = false" />
        <span v-if="errors.phone" class="lead-form__error">Введите номер телефона</span>
      </div>

      <p class="lead-form__legal">
        Отправляя данные, Вы соглашаетесь на обработку персональных данных в соответствии с
        <a href="https://market.fitnesshouse.ru/storage/documents/legal_information.pdf" target="_blank">Положением</a>
      </p>

      <button type="submit" class="btn-red lead-form__btn" :disabled="loading">
        <span v-if="loading">Отправляем…</span>
        <span v-else-if="success">✓ Заявка отправлена!</span>
        <span v-else>Заказать</span>
      </button>

      <p v-if="success" class="lead-form__success">Ваш менеджер перезвонит в ближайшее время</p>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { submitLead } from '../api/forms.js'

const form = reactive({ service: '', name: '', phone: '' })
const errors = reactive({ service: false, name: false, phone: false })
const loading = ref(false)
const success = ref(false)

async function submit() {
  errors.service = !form.service
  errors.name = !form.name.trim()
  errors.phone = !form.phone.trim()
  if (errors.service || errors.name || errors.phone) return

  loading.value = true
  try {
    await submitLead({ ...form, type: 'lead', club: 'Архангельск Московский' })
    success.value = true
    Object.assign(form, { service: '', name: '', phone: '' })
  } catch (e) {
    alert('Ошибка отправки. Позвоните нам: (812) 610-06-06')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.lead-form__messengers { display: flex; gap: 12px; margin-bottom: 20px; }
.lead-form__messenger {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 18px; border-radius: var(--radius);
  border: 1.5px solid var(--gray-mid); font-size: 13px; font-weight: 600;
  transition: all var(--transition);
}
.lead-form__messenger:hover { border-color: var(--red); color: var(--red); }
.lead-form__messenger img { width: 20px; height: 20px; }

.lead-form__field { margin-bottom: 12px; position: relative; }
.lead-form__field input,
.lead-form__field select {
  width: 100%; padding: 12px 16px;
  border: 1.5px solid var(--gray-mid); border-radius: var(--radius);
  font-size: 14px; color: var(--text); background: var(--white);
  transition: border-color var(--transition);
}
.lead-form__field input:focus,
.lead-form__field select:focus { border-color: var(--red); }
.lead-form__field.error input,
.lead-form__field.error select { border-color: var(--red); }
.lead-form__error { font-size: 11px; color: var(--red); margin-top: 3px; display: block; }

.lead-form__legal { font-size: 11px; color: var(--text-light); margin-bottom: 14px; line-height: 1.5; }
.lead-form__legal a { color: var(--red); text-decoration: underline; }

.lead-form__btn { width: 100%; text-align: center; padding: 14px; font-size: 14px; }
.lead-form__btn:disabled { opacity: 0.7; cursor: not-allowed; }

.lead-form__success { margin-top: 10px; font-size: 13px; color: #2a9d2a; font-weight: 600; text-align: center; }
</style>
