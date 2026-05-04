<template>
  <header class="header" :class="{ 'header--scrolled': scrolled }">
    <!-- Top bar -->
    <div class="header__top">
      <div class="container header__top-inner">
        <div class="header__top-left">
          <a href="https://dzen.ru/fitnesshouse" target="_blank" class="header__social">
            <img src="https://www.fitnesshouse.ru/assets/templates/fh2023/img/icons/dzen.svg" alt="dzen" />
          </a>
        </div>
        <div class="header__cities">
          <a v-for="city in cities" :key="city.id"
            :href="city.url"
            :class="['header__city', { active: city.id === 7 }]">
            {{ city.name }}
          </a>
        </div>
        <div class="header__top-right">
          <router-link to="/admin" class="header__lk">Личный кабинет</router-link>
        </div>
      </div>
    </div>

    <!-- Main nav -->
    <div class="header__main">
      <div class="container header__main-inner">
        <router-link to="/" class="header__logo">
          <img src="https://www.fitnesshouse.ru/assets/templates/fh2023/img/logo.svg" alt="Fitness House" />
        </router-link>

        <nav class="header__nav" :class="{ open: menuOpen }">
          <router-link to="/clubs" class="header__nav-link" @click="menuOpen = false">Клубы</router-link>
          <router-link to="/promotions" class="header__nav-link" @click="menuOpen = false">Акции</router-link>
          <router-link to="/trainers" class="header__nav-link" @click="menuOpen = false">Тренеры</router-link>
          <router-link to="/schedule" class="header__nav-link" @click="menuOpen = false">Расписание</router-link>
          <router-link to="/blog" class="header__nav-link" @click="menuOpen = false">Блог</router-link>
          <button class="header__nav-link btn-tour" @click="$emit('open-tour'); menuOpen = false">Запись на экскурсию</button>
          <router-link to="/careers" class="header__nav-link" @click="menuOpen = false">Вакансии</router-link>
        </nav>

        <div class="header__right">
          <a href="tel:+78126100606" class="header__phone">(812) 610 06 06</a>
          <router-link to="/subscriptions" class="btn-red">Купить сейчас</router-link>
          <button class="header__burger" @click="menuOpen = !menuOpen" :class="{ open: menuOpen }">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="header__breadcrumb">
      <div class="container">
        <a href="https://www.fitnesshouse.ru/">Санкт-Петербург</a>
        <span>›</span>
        <template v-for="(crumb, i) in breadcrumbs" :key="i">
          <router-link v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</router-link>
          <span v-else class="crumb-current">{{ crumb.label }}</span>
          <span v-if="i < breadcrumbs.length - 1">›</span>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

defineEmits(['open-tour'])

const scrolled = ref(false)
const menuOpen = ref(false)
const route = useRoute()

const breadcrumbMap = {
  '/': [{ label: 'Клубы', to: '/clubs' }, { label: 'Архангельск Московский', to: null }],
  '/clubs': [{ label: 'Клубы', to: null }],
  '/promotions': [{ label: 'Акции', to: null }],
  '/trainers': [{ label: 'Тренеры', to: null }],
  '/schedule': [{ label: 'Расписание', to: null }],
  '/blog': [{ label: 'Блог', to: null }],
  '/careers': [{ label: 'Вакансии', to: null }],
  '/subscriptions': [{ label: 'Абонементы', to: null }],
  '/partners': [{ label: 'Партнёрство', to: null }],
  '/academy': [{ label: 'Академия Корус', to: null }],
}

const breadcrumbs = computed(() => breadcrumbMap[route.path] || breadcrumbMap['/'])

const cities = [
  { id: 1, name: 'Санкт-Петербург', url: 'https://www.fitnesshouse.ru/?id=1' },
  { id: 7, name: 'Архангельск', url: 'https://www.fitnesshouse.ru/index-arhangelsk.html?id=7' },
  { id: 10, name: 'Екатеринбург', url: 'https://www.fitnesshouse.ru/index-ekaterenburg.html?id=10' },
  { id: 8, name: 'Ижевск', url: 'https://www.fitnesshouse.ru/index-igevsk.html?id=8' },
  { id: 3, name: 'Казань', url: 'https://www.fitnesshouse.ru/index-kazan.html?id=3' },
  { id: 2, name: 'Нижний Новгород', url: 'https://www.fitnesshouse.ru/index-n-novgorod.html?id=2' },
  { id: 5, name: 'Самара', url: 'https://www.fitnesshouse.ru/index-samara.html?id=5' },
  { id: 9, name: 'Ярославль', url: 'https://www.fitnesshouse.ru/index-yaroslavl.html?id=9' },
]

function onScroll() { scrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.header { position: sticky; top: 0; z-index: 100; background: var(--white); box-shadow: 0 2px 12px rgba(0,0,0,0.08); transition: box-shadow 0.3s; }
.header--scrolled { box-shadow: 0 4px 24px rgba(0,0,0,0.14); }

.header__top { background: var(--black); padding: 6px 0; }
.header__top-inner { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.header__social img { width: 22px; opacity: 0.7; transition: opacity 0.2s; }
.header__social:hover img { opacity: 1; }

.header__cities { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.header__city { font-size: 11px; color: rgba(255,255,255,0.55); transition: color 0.2s; white-space: nowrap; }
.header__city:hover, .header__city.active { color: var(--red); }
.header__city.active { font-weight: 700; }

.header__lk { font-size: 12px; color: rgba(255,255,255,0.65); transition: color 0.2s; }
.header__lk:hover { color: var(--white); }

.header__main { padding: 12px 0; }
.header__main-inner { display: flex; align-items: center; gap: 24px; }

.header__logo img { height: 44px; }

.header__nav { display: flex; align-items: center; gap: 4px; flex: 1; }
.header__nav-link {
  font-size: 13px; font-weight: 500; color: var(--text);
  padding: 6px 10px; border-radius: var(--radius);
  transition: color var(--transition), background var(--transition);
  background: none; cursor: pointer; white-space: nowrap;
  text-decoration: none; display: inline-block;
}
.header__nav-link:hover { color: var(--red); background: rgba(227,30,36,0.06); }
.header__nav-link.router-link-active { color: var(--red); font-weight: 700; }
.btn-tour { border: 1.5px solid var(--red); color: var(--red) !important; }
.btn-tour:hover { background: var(--red) !important; color: var(--white) !important; }

.header__right { display: flex; align-items: center; gap: 16px; margin-left: auto; }
.header__phone { font-size: 15px; font-weight: 700; color: var(--black); white-space: nowrap; }
.header__phone:hover { color: var(--red); }

.header__burger { display: none; flex-direction: column; gap: 5px; background: none; cursor: pointer; padding: 4px; }
.header__burger span { display: block; width: 24px; height: 2px; background: var(--black); transition: all 0.3s; border-radius: 2px; }
.header__burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.header__burger.open span:nth-child(2) { opacity: 0; }
.header__burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.header__breadcrumb { background: var(--gray); padding: 8px 0; font-size: 12px; color: var(--text-light); }
.header__breadcrumb .container { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.header__breadcrumb a:hover { color: var(--red); }
.header__breadcrumb span { color: var(--text-light); }
.crumb-current { color: var(--text); font-weight: 500; }

@media (max-width: 900px) {
  .header__cities { display: none; }
  .header__burger { display: flex; }
  .header__nav {
    display: none; position: absolute; top: 100%; left: 0; right: 0;
    background: var(--white); flex-direction: column; align-items: flex-start;
    padding: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); gap: 4px;
  }
  .header__nav.open { display: flex; }
  .header__nav-link { width: 100%; }
  .header__main { position: relative; }
}
@media (max-width: 480px) {
  .header__phone { display: none; }
}
</style>
