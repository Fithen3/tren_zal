<template>
  <div class="admin-page">
    <div class="admin-page__header">
      <h2 class="admin-page__title">Заявки</h2>
      <div class="header-actions">
        <input v-model="search" class="search-input" placeholder="Поиск по имени или телефону..." />
        <select v-model="filterStatus" class="filter-select">
          <option value="">Все статусы</option>
          <option value="new">Новая</option>
          <option value="called">Связались</option>
          <option value="closed">Закрыта</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading-text">Загрузка...</div>
    <div v-else class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Клуб</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in filteredLeads" :key="lead.id">
            <td class="tbl-id">{{ lead.id }}</td>
            <td class="tbl-name">{{ lead.name }}</td>
            <td>{{ lead.phone }}</td>
            <td>{{ lead.email || '—' }}</td>
            <td>{{ lead.club || '—' }}</td>
            <td>{{ formatDate(lead.created_at || lead.date) }}</td>
            <td>
              <select class="status-select" :value="lead.status || 'new'" @change="updateStatus(lead, $event.target.value)">
                <option value="new">Новая</option>
                <option value="called">Связались</option>
                <option value="closed">Закрыта</option>
              </select>
            </td>
            <td class="tbl-actions">
              <button class="btn-icon btn-icon--del" @click="deleteLead(lead.id)" title="Удалить">🗑</button>
            </td>
          </tr>
          <tr v-if="!filteredLeads.length">
            <td colspan="8" style="text-align:center; color: var(--text-light); padding: 24px;">Заявок не найдено</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="leads-total">Всего заявок: <strong>{{ filteredLeads.length }}</strong></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiGetLeads, apiUpdate, apiDelete } from '../../api/admin.js'

const loading = ref(true)
const leads = ref([])
const search = ref('')
const filterStatus = ref('')

function formatDate(val) {
  if (!val) return '—'
  return new Date(val).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const filteredLeads = computed(() => {
  let list = leads.value
  if (filterStatus.value) list = list.filter(l => (l.status || 'new') === filterStatus.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(l => l.name?.toLowerCase().includes(q) || l.phone?.includes(q) || l.email?.toLowerCase().includes(q))
  }
  return list
})

async function load() {
  loading.value = true
  try { leads.value = await apiGetLeads() }
  catch { leads.value = [] }
  finally { loading.value = false }
}

async function updateStatus(lead, status) {
  lead.status = status
  await apiUpdate('leads', lead.id, { ...lead, status }).catch(() => {})
}

async function deleteLead(id) {
  if (!confirm('Удалить заявку?')) return
  await apiDelete('leads', id)
  leads.value = leads.value.filter(l => l.id !== id)
}

onMounted(load)
</script>

<style scoped>
@import './admin-shared.css';

.header-actions { display: flex; gap: 10px; }
.search-input {
  padding: 8px 14px; border: 1.5px solid #e2e8f0; border-radius: 8px;
  font-size: 13px; width: 240px;
}
.search-input:focus { border-color: var(--red); outline: none; }
.filter-select {
  padding: 8px 14px; border: 1.5px solid #e2e8f0; border-radius: 8px;
  font-size: 13px; background: var(--white); cursor: pointer;
}

.tbl-id { color: var(--text-light); font-size: 12px; }
.status-select {
  padding: 4px 10px; border: 1.5px solid #e2e8f0; border-radius: 6px;
  font-size: 12px; background: var(--white); cursor: pointer;
}

.leads-total { font-size: 13px; color: var(--text-light); margin-top: 8px; }
</style>
