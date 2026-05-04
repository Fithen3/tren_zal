<template>
  <div class="admin-page">
    <div class="admin-page__header">
      <h2 class="admin-page__title">Акции</h2>
      <button class="btn-primary" @click="openModal()">+ Добавить</button>
    </div>

    <div v-if="loading" class="loading-text">Загрузка...</div>
    <div v-else class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Фото</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Бейдж</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td><img :src="item.image" class="tbl-img" alt="" /></td>
            <td class="tbl-name">{{ item.title }}</td>
            <td>{{ item.category }}</td>
            <td><span class="badge badge--orange">{{ item.badge }}</span></td>
            <td>
              <span class="badge" :class="item.active !== false ? 'badge--green' : 'badge--gray'">
                {{ item.active !== false ? 'Активна' : 'Скрыта' }}
              </span>
            </td>
            <td class="tbl-actions">
              <button class="btn-icon" @click="openModal(item)">✏️</button>
              <button class="btn-icon btn-icon--del" @click="deleteItem(item.id)">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="modal" class="modal-backdrop" @click.self="modal = false">
      <div class="modal">
        <div class="modal__head">
          <h3>{{ form.id ? 'Редактировать акцию' : 'Добавить акцию' }}</h3>
          <button class="modal__close" @click="modal = false">✕</button>
        </div>
        <div class="modal__body">
          <div class="form-row">
            <div class="form-field">
              <label>Название</label>
              <input v-model="form.title" placeholder="Название акции" />
            </div>
            <div class="form-field">
              <label>Категория</label>
              <input v-model="form.category" placeholder="Абонементы" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Бейдж</label>
              <input v-model="form.badge" placeholder="-30%" />
            </div>
            <div class="form-field">
              <label>Дедлайн</label>
              <input v-model="form.deadline" placeholder="до 31 мая" />
            </div>
          </div>
          <div class="form-field">
            <label>Изображение URL</label>
            <input v-model="form.image" placeholder="https://..." />
          </div>
          <div class="form-field">
            <label>Описание</label>
            <textarea v-model="form.desc" rows="3" placeholder="Краткое описание акции..."></textarea>
          </div>
          <div class="form-field">
            <label>Текст кнопки</label>
            <input v-model="form.cta" placeholder="Узнать подробнее" />
          </div>
          <div class="form-field form-field--check">
            <label class="check-label">
              <input type="checkbox" v-model="form.active" /> Активна (отображается на сайте)
            </label>
          </div>
        </div>
        <div class="modal__foot">
          <button class="btn-secondary" @click="modal = false">Отмена</button>
          <button class="btn-primary" @click="saveItem" :disabled="saving">
            {{ saving ? 'Сохранение...' : 'Сохранить' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiGetContent, apiCreate, apiUpdate, apiDelete } from '../../api/admin.js'

const loading = ref(true)
const saving = ref(false)
const items = ref([])
const modal = ref(false)
const form = ref({})

async function load() {
  loading.value = true
  try { items.value = await apiGetContent('promotions') }
  finally { loading.value = false }
}

function openModal(item = null) {
  form.value = item ? { ...item } : { title: '', category: '', badge: '', deadline: '', image: '', desc: '', cta: 'Узнать подробнее', active: true }
  modal.value = true
}

async function saveItem() {
  saving.value = true
  try {
    if (form.value.id) {
      const updated = await apiUpdate('promotions', form.value.id, form.value)
      const idx = items.value.findIndex(i => i.id === form.value.id)
      if (idx !== -1) items.value[idx] = updated
    } else {
      const created = await apiCreate('promotions', form.value)
      items.value.push(created)
    }
    modal.value = false
  } catch (e) {
    alert('Ошибка сохранения')
  } finally {
    saving.value = false
  }
}

async function deleteItem(id) {
  if (!confirm('Удалить акцию?')) return
  await apiDelete('promotions', id)
  items.value = items.value.filter(i => i.id !== id)
}

onMounted(load)
</script>

<style scoped>
@import './admin-shared.css';
</style>
