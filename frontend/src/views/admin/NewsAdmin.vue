<template>
  <div class="admin-page">
    <div class="admin-page__header">
      <h2 class="admin-page__title">Новости клуба</h2>
      <button class="btn-primary" @click="openModal()">+ Добавить</button>
    </div>

    <div v-if="loading" class="loading-text">Загрузка...</div>
    <div v-else class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Фото</th>
            <th>Заголовок</th>
            <th>Тип</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>
              <img v-if="item.image || item.preview" :src="item.image || item.preview" class="tbl-img" alt="" />
              <div v-else class="tbl-img-placeholder">—</div>
            </td>
            <td class="tbl-name">{{ item.title || item.name }}</td>
            <td><span class="badge badge--blue">{{ item.type || 'Новость' }}</span></td>
            <td>{{ formatDate(item.date || item.created_at) }}</td>
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
          <tr v-if="!items.length">
            <td colspan="6" style="text-align:center; color: var(--text-light); padding: 24px;">Новостей пока нет</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="modal" class="modal-backdrop" @click.self="modal = false">
      <div class="modal">
        <div class="modal__head">
          <h3>{{ form.id ? 'Редактировать новость' : 'Новая новость' }}</h3>
          <button class="modal__close" @click="modal = false">✕</button>
        </div>
        <div class="modal__body">
          <div class="form-field">
            <label>Заголовок</label>
            <input v-model="form.title" placeholder="Заголовок новости" />
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Тип</label>
              <select v-model="form.type">
                <option>Новость</option>
                <option>Событие</option>
                <option>Акция</option>
                <option>Объявление</option>
              </select>
            </div>
            <div class="form-field">
              <label>Дата</label>
              <input v-model="form.date" type="date" />
            </div>
          </div>
          <div class="form-field">
            <label>Изображение URL</label>
            <input v-model="form.image" placeholder="https://..." />
          </div>
          <div class="form-field">
            <label>Описание</label>
            <textarea v-model="form.description" rows="4" placeholder="Текст новости..."></textarea>
          </div>
          <div class="form-field form-field--check">
            <label class="check-label">
              <input type="checkbox" v-model="form.active" /> Опубликована
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
import { apiGetNews, apiCreateNews, apiUpdate, apiDelete } from '../../api/admin.js'

const loading = ref(true)
const saving = ref(false)
const items = ref([])
const modal = ref(false)
const form = ref({})

function formatDate(val) {
  if (!val) return '—'
  try {
    return new Date(val).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
  } catch { return val }
}

async function load() {
  loading.value = true
  try { items.value = await apiGetNews() }
  catch { items.value = [] }
  finally { loading.value = false }
}

function openModal(item = null) {
  form.value = item
    ? { ...item, date: item.date ? item.date.slice(0, 10) : '' }
    : { title: '', type: 'Новость', date: new Date().toISOString().slice(0, 10), image: '', description: '', active: true }
  modal.value = true
}

async function saveItem() {
  saving.value = true
  try {
    if (form.value.id) {
      const updated = await apiUpdate('news', form.value.id, form.value)
      const idx = items.value.findIndex(i => i.id === form.value.id)
      if (idx !== -1) items.value[idx] = updated
    } else {
      const created = await apiCreateNews(form.value)
      items.value.unshift(created)
    }
    modal.value = false
  } catch (e) {
    alert('Ошибка сохранения')
  } finally {
    saving.value = false
  }
}

async function deleteItem(id) {
  if (!confirm('Удалить новость?')) return
  await apiDelete('news', id)
  items.value = items.value.filter(i => i.id !== id)
}

onMounted(load)
</script>

<style scoped>
@import './admin-shared.css';
.tbl-img-placeholder { width: 60px; height: 40px; background: #f1f5f9; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: var(--text-light); font-size: 12px; }
</style>
