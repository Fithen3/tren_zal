<template>
  <div class="admin-page">
    <div class="admin-page__header">
      <h2 class="admin-page__title">Тренеры</h2>
      <button class="btn-primary" @click="openModal()">+ Добавить</button>
    </div>

    <div v-if="loading" class="loading-text">Загрузка...</div>
    <div v-else class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Фото</th>
            <th>Имя</th>
            <th>Специализация</th>
            <th>Опыт</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td><img :src="item.photo" class="tbl-avatar" alt="" /></td>
            <td class="tbl-name">{{ item.name }}</td>
            <td>{{ item.specialty }}</td>
            <td>{{ item.experience }}</td>
            <td>
              <span class="badge" :class="item.active !== false ? 'badge--green' : 'badge--gray'">
                {{ item.active !== false ? 'Активен' : 'Скрыт' }}
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

    <!-- Modal -->
    <div v-if="modal" class="modal-backdrop" @click.self="modal = false">
      <div class="modal">
        <div class="modal__head">
          <h3>{{ form.id ? 'Редактировать тренера' : 'Добавить тренера' }}</h3>
          <button class="modal__close" @click="modal = false">✕</button>
        </div>
        <div class="modal__body">
          <div class="form-row">
            <div class="form-field">
              <label>Имя</label>
              <input v-model="form.name" placeholder="Иван Иванов" />
            </div>
            <div class="form-field">
              <label>Специализация</label>
              <input v-model="form.specialty" placeholder="Персональный тренер" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Опыт</label>
              <input v-model="form.experience" placeholder="5 лет" />
            </div>
            <div class="form-field">
              <label>Фото URL</label>
              <input v-model="form.photo" placeholder="https://..." />
            </div>
          </div>
          <div class="form-field">
            <label>Категория</label>
            <select v-model="form.specGroup">
              <option value="fitness">Фитнес и силовые</option>
              <option value="dance">Танцы и аэробика</option>
              <option value="martial">Единоборства</option>
              <option value="pool">Плавание</option>
              <option value="kids">Детский фитнес</option>
            </select>
          </div>
          <div class="form-field">
            <label>Теги (через запятую)</label>
            <input v-model="tagsStr" placeholder="Кроссфит, TRX, Растяжка" />
          </div>
          <div class="form-field">
            <label>Биография</label>
            <textarea v-model="form.bio" rows="4" placeholder="Краткое описание тренера..."></textarea>
          </div>
          <div class="form-field form-field--check">
            <label class="check-label">
              <input type="checkbox" v-model="form.active" /> Активен (отображается на сайте)
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
import { ref, computed, onMounted } from 'vue'
import { apiGetContent, apiCreate, apiUpdate, apiDelete } from '../../api/admin.js'

const loading = ref(true)
const saving = ref(false)
const items = ref([])
const modal = ref(false)
const form = ref({})
const tagsStr = computed({
  get: () => (form.value.tags || []).join(', '),
  set: (v) => { form.value.tags = v.split(',').map(s => s.trim()).filter(Boolean) }
})

async function load() {
  loading.value = true
  try { items.value = await apiGetContent('trainers') }
  finally { loading.value = false }
}

function openModal(item = null) {
  form.value = item ? { ...item } : { name: '', specialty: '', experience: '', photo: '', bio: '', specGroup: 'fitness', tags: [], active: true }
  modal.value = true
}

async function saveItem() {
  saving.value = true
  try {
    if (form.value.id) {
      const updated = await apiUpdate('trainers', form.value.id, form.value)
      const idx = items.value.findIndex(i => i.id === form.value.id)
      if (idx !== -1) items.value[idx] = updated
    } else {
      const created = await apiCreate('trainers', form.value)
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
  if (!confirm('Удалить тренера?')) return
  await apiDelete('trainers', id)
  items.value = items.value.filter(i => i.id !== id)
}

onMounted(load)
</script>

<style scoped>
@import './admin-shared.css';
</style>
