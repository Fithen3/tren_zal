<template>
  <div class="admin-page">
    <div class="admin-page__header">
      <h2 class="admin-page__title">Блог</h2>
      <button class="btn-primary" @click="openModal()">+ Добавить</button>
    </div>

    <div v-if="loading" class="loading-text">Загрузка...</div>
    <div v-else class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Фото</th>
            <th>Заголовок</th>
            <th>Категория</th>
            <th>Дата</th>
            <th>Главная</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td><img :src="item.image" class="tbl-img" alt="" /></td>
            <td class="tbl-name">{{ item.title }}</td>
            <td><span class="badge badge--blue">{{ item.category }}</span></td>
            <td>{{ item.date }}</td>
            <td>{{ item.featured ? '⭐' : '—' }}</td>
            <td>
              <span class="badge" :class="item.active !== false ? 'badge--green' : 'badge--gray'">
                {{ item.active !== false ? 'Опубликована' : 'Скрыта' }}
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
          <h3>{{ form.id ? 'Редактировать статью' : 'Новая статья' }}</h3>
          <button class="modal__close" @click="modal = false">✕</button>
        </div>
        <div class="modal__body">
          <div class="form-field">
            <label>Заголовок</label>
            <input v-model="form.title" placeholder="Заголовок статьи" />
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Категория</label>
              <select v-model="form.category">
                <option>Фитнес</option>
                <option>Питание</option>
                <option>Здоровье</option>
                <option>Плавание</option>
                <option>Дети</option>
              </select>
            </div>
            <div class="form-field">
              <label>Время чтения (мин)</label>
              <input v-model.number="form.readTime" type="number" min="1" max="60" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Дата публикации</label>
              <input v-model="form.date" placeholder="18 апреля 2026" />
            </div>
            <div class="form-field">
              <label>Изображение URL</label>
              <input v-model="form.image" placeholder="https://..." />
            </div>
          </div>
          <div class="form-field">
            <label>Краткое описание</label>
            <textarea v-model="form.excerpt" rows="3" placeholder="Анонс статьи..."></textarea>
          </div>
          <div class="form-row">
            <div class="form-field form-field--check">
              <label class="check-label">
                <input type="checkbox" v-model="form.featured" /> Главная статья
              </label>
            </div>
            <div class="form-field form-field--check">
              <label class="check-label">
                <input type="checkbox" v-model="form.active" /> Опубликована
              </label>
            </div>
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
  try { items.value = await apiGetContent('posts') }
  finally { loading.value = false }
}

function openModal(item = null) {
  const today = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  form.value = item ? { ...item } : { title: '', category: 'Фитнес', readTime: 5, date: today, image: '', excerpt: '', featured: false, active: true }
  modal.value = true
}

async function saveItem() {
  saving.value = true
  try {
    if (form.value.id) {
      const updated = await apiUpdate('posts', form.value.id, form.value)
      const idx = items.value.findIndex(i => i.id === form.value.id)
      if (idx !== -1) items.value[idx] = updated
    } else {
      const created = await apiCreate('posts', form.value)
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
  if (!confirm('Удалить статью?')) return
  await apiDelete('posts', id)
  items.value = items.value.filter(i => i.id !== id)
}

onMounted(load)
</script>

<style scoped>
@import './admin-shared.css';
</style>
