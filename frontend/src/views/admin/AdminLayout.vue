<template>
  <div class="admin-app">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar__head">
        <img src="https://www.fitnesshouse.ru/assets/templates/fh2023/img/logo.svg" alt="FH" class="sidebar__logo" />
        <button class="sidebar__toggle" @click="sidebarCollapsed = !sidebarCollapsed">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      <nav class="sidebar__nav">
        <router-link v-for="item in navItems" :key="item.to" :to="item.to" class="sidebar__link">
          <span class="sidebar__icon" v-html="item.icon"></span>
          <span class="sidebar__label">{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar__footer">
        <div class="sidebar__user">
          <div class="sidebar__avatar">{{ userInitial }}</div>
          <div class="sidebar__user-info">
            <span class="sidebar__user-name">Администратор</span>
            <span class="sidebar__user-email">{{ user?.email }}</span>
          </div>
        </div>
        <button class="sidebar__logout" @click="handleLogout" title="Выйти">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="admin-main">
      <header class="admin-topbar">
        <div class="admin-topbar__left">
          <h1 class="admin-topbar__title">{{ currentTitle }}</h1>
        </div>
        <div class="admin-topbar__right">
          <router-link to="/" target="_blank" class="view-site-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Открыть сайт
          </router-link>
        </div>
      </header>

      <div class="admin-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../../composables/useAuth.js'

const { user, logout } = useAuth()
const router = useRouter()
const route = useRoute()
const sidebarCollapsed = ref(false)

const userInitial = computed(() => user.value?.email?.[0]?.toUpperCase() || 'A')

const navItems = [
  { to: '/admin', label: 'Дашборд', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
  { to: '/admin/trainers', label: 'Тренеры', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { to: '/admin/promotions', label: 'Акции', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>' },
  { to: '/admin/blog', label: 'Блог', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>' },
  { to: '/admin/news', label: 'Новости', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>' },
  { to: '/admin/leads', label: 'Заявки', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.4 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' },
]

const titleMap = {
  '/admin': 'Дашборд',
  '/admin/trainers': 'Тренеры',
  '/admin/promotions': 'Акции',
  '/admin/blog': 'Блог',
  '/admin/news': 'Новости клуба',
  '/admin/leads': 'Заявки',
}
const currentTitle = computed(() => titleMap[route.path] || 'Админ-панель')

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.admin-app { display: flex; min-height: 100vh; background: #f1f5f9; }

/* Sidebar */
.sidebar {
  width: 240px; flex-shrink: 0;
  background: #0f172a; color: var(--white);
  display: flex; flex-direction: column;
  transition: width 0.25s ease; overflow: hidden;
  position: sticky; top: 0; height: 100vh;
}
.sidebar.collapsed { width: 64px; }
.sidebar.collapsed .sidebar__label { display: none; }
.sidebar.collapsed .sidebar__user-info { display: none; }
.sidebar.collapsed .sidebar__logo { display: none; }

.sidebar__head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.08);
}
.sidebar__logo { height: 32px; filter: brightness(0) invert(1); flex-shrink: 0; }
.sidebar__toggle {
  background: none; cursor: pointer; color: rgba(255,255,255,0.5);
  padding: 4px; border-radius: 4px; transition: color var(--transition);
}
.sidebar__toggle:hover { color: var(--white); }

.sidebar__nav {
  flex: 1; padding: 12px 8px; display: flex; flex-direction: column; gap: 2px; overflow-y: auto;
}
.sidebar__link {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: 8px;
  color: rgba(255,255,255,0.6); font-size: 13px; font-weight: 500;
  transition: all var(--transition); white-space: nowrap;
}
.sidebar__link:hover { background: rgba(255,255,255,0.08); color: var(--white); }
.sidebar__link.router-link-active,
.sidebar__link.router-link-exact-active {
  background: var(--red); color: var(--white);
}
.sidebar__icon { flex-shrink: 0; display: flex; }

.sidebar__footer {
  padding: 12px 8px; border-top: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center; gap: 8px;
}
.sidebar__user {
  flex: 1; display: flex; align-items: center; gap: 10px; min-width: 0;
}
.sidebar__avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--red); color: var(--white);
  font-size: 13px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.sidebar__user-info { min-width: 0; }
.sidebar__user-name { display: block; font-size: 12px; font-weight: 600; color: var(--white); }
.sidebar__user-email { display: block; font-size: 10px; color: rgba(255,255,255,0.4); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sidebar__logout {
  flex-shrink: 0; background: none; cursor: pointer;
  color: rgba(255,255,255,0.4); padding: 6px; border-radius: 6px;
  transition: color var(--transition);
}
.sidebar__logout:hover { color: var(--red); }

/* Main */
.admin-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }

.admin-topbar {
  background: var(--white); border-bottom: 1px solid #e2e8f0;
  padding: 0 24px; height: 60px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 10;
}
.admin-topbar__title { font-family: var(--font-display); font-size: 22px; color: var(--black); }

.view-site-btn {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; color: var(--text-light);
  padding: 6px 14px; border-radius: var(--radius);
  border: 1.5px solid #e2e8f0; transition: all var(--transition);
}
.view-site-btn:hover { color: var(--red); border-color: var(--red); }

.admin-content { flex: 1; padding: 24px; overflow-y: auto; }
</style>
