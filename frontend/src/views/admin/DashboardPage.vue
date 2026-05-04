<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.label">
        <div class="stat-card__icon" v-html="stat.icon"></div>
        <div class="stat-card__body">
          <div class="stat-card__value">{{ stat.value }}</div>
          <div class="stat-card__label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="dash-section">
        <h2 class="dash-section__title">Последние заявки</h2>
        <div v-if="leadsLoading" class="loading-text">Загрузка...</div>
        <table v-else class="dash-table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Клуб</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lead in recentLeads" :key="lead.id">
              <td>{{ lead.name }}</td>
              <td>{{ lead.phone }}</td>
              <td>{{ lead.club || '—' }}</td>
              <td>{{ formatDate(lead.created_at || lead.date) }}</td>
            </tr>
            <tr v-if="!recentLeads.length">
              <td colspan="4" class="empty-row">Заявок пока нет</td>
            </tr>
          </tbody>
        </table>
        <router-link to="/admin/leads" class="dash-more">Все заявки →</router-link>
      </div>

      <div class="dash-section">
        <h2 class="dash-section__title">Быстрые ссылки</h2>
        <div class="quick-links">
          <router-link v-for="link in quickLinks" :key="link.to" :to="link.to" class="quick-link">
            <span v-html="link.icon"></span>
            {{ link.label }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiGetContent, apiGetLeads } from '../../api/admin.js'

const leadsLoading = ref(true)
const recentLeads = ref([])
const counts = ref({ trainers: 0, promotions: 0, posts: 0, leads: 0 })

const stats = ref([
  { label: 'Тренеры', value: '—', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { label: 'Акции', value: '—', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>' },
  { label: 'Статьи', value: '—', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
  { label: 'Заявки', value: '—', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.4 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' },
])

const quickLinks = [
  { to: '/admin/trainers', label: 'Добавить тренера', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' },
  { to: '/admin/promotions', label: 'Новая акция', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' },
  { to: '/admin/blog', label: 'Написать статью', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' },
  { to: '/admin/leads', label: 'Просмотреть заявки', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' },
]

function formatDate(val) {
  if (!val) return '—'
  return new Date(val).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

onMounted(async () => {
  try {
    const [trainers, promotions, posts, leads] = await Promise.all([
      apiGetContent('trainers'),
      apiGetContent('promotions'),
      apiGetContent('posts'),
      apiGetLeads().catch(() => []),
    ])
    stats.value[0].value = trainers.filter(t => t.active !== false).length
    stats.value[1].value = promotions.filter(p => p.active !== false).length
    stats.value[2].value = posts.filter(p => p.active !== false).length
    stats.value[3].value = leads.length
    recentLeads.value = leads.slice(0, 8)
  } catch (e) {
    console.error(e)
  } finally {
    leadsLoading.value = false
  }
})
</script>

<style scoped>
.dashboard { display: flex; flex-direction: column; gap: 24px; }

.stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
}
.stat-card {
  background: var(--white); border-radius: 12px; padding: 20px;
  display: flex; align-items: center; gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.07);
}
.stat-card__icon {
  width: 48px; height: 48px; border-radius: 10px;
  background: #fff0f0; color: var(--red);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.stat-card__value { font-size: 28px; font-weight: 800; color: var(--black); font-family: var(--font-display); }
.stat-card__label { font-size: 12px; color: var(--text-light); font-weight: 500; margin-top: 2px; }

.dashboard-grid { display: grid; grid-template-columns: 1fr 280px; gap: 24px; }

.dash-section {
  background: var(--white); border-radius: 12px; padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.07);
}
.dash-section__title { font-size: 15px; font-weight: 700; color: var(--black); margin-bottom: 16px; }

.dash-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.dash-table th {
  text-align: left; padding: 8px 12px;
  font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
  color: var(--text-light); border-bottom: 1.5px solid #e2e8f0;
}
.dash-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
.dash-table tr:last-child td { border-bottom: none; }
.empty-row { text-align: center; color: var(--text-light); }

.dash-more {
  display: inline-block; margin-top: 12px; font-size: 13px; font-weight: 600; color: var(--red);
}

.loading-text { color: var(--text-light); font-size: 13px; padding: 20px 0; }

.quick-links { display: flex; flex-direction: column; gap: 8px; }
.quick-link {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 14px; border-radius: 8px;
  background: #f8fafc; color: var(--black); font-size: 13px; font-weight: 500;
  transition: all var(--transition);
}
.quick-link:hover { background: #fff0f0; color: var(--red); }

@media (max-width: 1100px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .dashboard-grid { grid-template-columns: 1fr; }
}
</style>
