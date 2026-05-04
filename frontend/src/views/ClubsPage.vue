<template>
  <main class="clubs-page">

    <section class="page-hero">
      <div class="container">
        <h1 class="page-hero__title fade-up">Клубы</h1>
        <p class="page-hero__sub fade-up delay-1">Выберите удобный клуб в вашем городе</p>
      </div>
    </section>

    <section class="clubs-section">
      <div class="container">
        <div class="city-tabs">
          <button
            v-for="city in cities"
            :key="city"
            :class="['city-tab', { active: activeCity === city }]"
            @click="activeCity = city"
          >{{ city }}</button>
        </div>

        <div class="clubs-grid">
          <article v-for="club in filteredClubs" :key="club.id" class="club-card">
            <div class="club-card__img">
              <img :src="club.image" :alt="club.name" loading="lazy" />
              <span class="club-card__city-badge">{{ club.city }}</span>
            </div>
            <div class="club-card__body">
              <h3 class="club-card__name">{{ club.name }}</h3>
              <p class="club-card__address">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {{ club.address }}
              </p>
              <div class="club-card__services">
                <span v-for="s in club.services" :key="s" class="service-badge">{{ s }}</span>
              </div>
              <div class="club-card__hours">
                <div>
                  <strong>пн–пт</strong>
                  <span>{{ club.hours.weekday }}</span>
                </div>
                <div>
                  <strong>сб–вс</strong>
                  <span>{{ club.hours.weekend }}</span>
                </div>
              </div>
              <div class="club-card__actions">
                <router-link to="/" class="btn-red">Подробнее</router-link>
                <button class="btn-tour-sm" @click="$emit('open-tour')">Экскурсия</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="clubs-cta">
      <div class="container clubs-cta__inner">
        <div>
          <h2>Не нашли клуб рядом?</h2>
          <p>Мы работаем в 8 городах России — напишите нам, поможем выбрать</p>
        </div>
        <a href="tel:+78126100606" class="btn-red">(812) 610-06-06</a>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

defineEmits(['open-tour'])

const cities = ['Все города', 'Архангельск', 'Санкт-Петербург', 'Казань', 'Нижний Новгород', 'Екатеринбург', 'Ижевск', 'Самара', 'Ярославль']
const activeCity = ref('Все города')

const clubs = [
  {
    id: 1, city: 'Архангельск', name: 'Архангельск Московский',
    address: 'пр. Московский, д. 33',
    image: 'https://picsum.photos/seed/club-arh-m/800/300',
    services: ['Бассейн', 'СПА', 'Тренажёрный зал', 'Детские секции'],
    hours: { weekday: '07:00–23:00', weekend: '08:00–22:00' },
  },
  {
    id: 2, city: 'Архангельск', name: 'Архангельск Ленинский',
    address: 'пр. Ленинградский, д. 150',
    image: 'https://picsum.photos/seed/club-arh-l/800/300',
    services: ['Тренажёрный зал', 'Групповые занятия', 'СПА'],
    hours: { weekday: '07:00–22:00', weekend: '08:00–22:00' },
  },
  {
    id: 3, city: 'Санкт-Петербург', name: 'СПб Звёздная',
    address: 'ул. Звёздная, д. 12к2',
    image: 'https://picsum.photos/seed/club-spb-z/800/300',
    services: ['Бассейн', 'СПА', 'Тренажёрный зал', 'Кроссфит', 'Детские секции'],
    hours: { weekday: '06:30–23:30', weekend: '08:00–22:00' },
  },
  {
    id: 4, city: 'Санкт-Петербург', name: 'СПб Московский',
    address: 'Московский пр., д. 202',
    image: 'https://picsum.photos/seed/club-spb-m/800/300',
    services: ['Бассейн', 'Тренажёрный зал', 'Групповые занятия', 'СПА'],
    hours: { weekday: '07:00–23:00', weekend: '08:00–22:00' },
  },
  {
    id: 5, city: 'Санкт-Петербург', name: 'СПб Парнас',
    address: 'пр. Просвещения, д. 85к1',
    image: 'https://picsum.photos/seed/club-spb-p/800/300',
    services: ['Тренажёрный зал', 'Бассейн', 'Групповые занятия'],
    hours: { weekday: '07:00–23:00', weekend: '08:00–22:00' },
  },
  {
    id: 6, city: 'Казань', name: 'Казань Победы',
    address: 'пр. Победы, д. 47',
    image: 'https://picsum.photos/seed/club-kzn/800/300',
    services: ['Бассейн', 'СПА', 'Тренажёрный зал', 'Детские секции', 'Кроссфит'],
    hours: { weekday: '07:00–23:00', weekend: '08:00–22:00' },
  },
  {
    id: 7, city: 'Нижний Новгород', name: 'Нижний Новгород Сормово',
    address: 'Сормовское ш., д. 1',
    image: 'https://picsum.photos/seed/club-nn/800/300',
    services: ['Тренажёрный зал', 'Групповые занятия', 'Бассейн'],
    hours: { weekday: '07:00–22:00', weekend: '09:00–21:00' },
  },
  {
    id: 8, city: 'Екатеринбург', name: 'Екатеринбург Ленина',
    address: 'пр. Ленина, д. 74',
    image: 'https://picsum.photos/seed/club-ekb/800/300',
    services: ['Тренажёрный зал', 'СПА', 'Групповые занятия', 'Детские секции'],
    hours: { weekday: '07:00–23:00', weekend: '08:00–22:00' },
  },
  {
    id: 9, city: 'Ижевск', name: 'Ижевск Пушкинская',
    address: 'ул. Пушкинская, д. 206',
    image: 'https://picsum.photos/seed/club-izh/800/300',
    services: ['Тренажёрный зал', 'Групповые занятия', 'СПА'],
    hours: { weekday: '07:00–22:00', weekend: '09:00–21:00' },
  },
  {
    id: 10, city: 'Самара', name: 'Самара Московское шоссе',
    address: 'Московское ш., д. 320',
    image: 'https://picsum.photos/seed/club-sam/800/300',
    services: ['Бассейн', 'Тренажёрный зал', 'Групповые занятия', 'Детские секции'],
    hours: { weekday: '07:00–23:00', weekend: '08:00–22:00' },
  },
  {
    id: 11, city: 'Ярославль', name: 'Ярославль Московский',
    address: 'пр. Московский, д. 121',
    image: 'https://picsum.photos/seed/club-yar/800/300',
    services: ['Тренажёрный зал', 'Бассейн', 'СПА', 'Групповые занятия'],
    hours: { weekday: '07:00–22:00', weekend: '09:00–21:00' },
  },
]

const filteredClubs = computed(() =>
  activeCity.value === 'Все города'
    ? clubs
    : clubs.filter(c => c.city === activeCity.value)
)
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, var(--black) 0%, #1a0506 60%, var(--black) 100%);
  padding: 64px 0; position: relative; overflow: hidden;
}
.page-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(227,30,36,0.15) 0%, transparent 65%);
  pointer-events: none;
}
.page-hero__title {
  font-family: var(--font-display); font-size: clamp(48px, 7vw, 96px);
  color: var(--white); line-height: 1; letter-spacing: 2px; margin-bottom: 12px;
}
.page-hero__sub { font-size: 18px; color: rgba(255,255,255,0.6); font-weight: 300; }

.clubs-section { padding: 56px 0; }

.city-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
.city-tab {
  padding: 8px 18px; border-radius: 100px; border: 1.5px solid var(--gray-mid);
  font-size: 13px; font-weight: 500; cursor: pointer; background: var(--white); color: var(--text);
  transition: all var(--transition);
}
.city-tab:hover { border-color: var(--red); color: var(--red); }
.city-tab.active { background: var(--red); color: var(--white); border-color: var(--red); }

.clubs-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px;
}
.club-card {
  border-radius: 12px; overflow: hidden; box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition);
}
.club-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.15); }

.club-card__img {
  position: relative; height: 200px; overflow: hidden;
}
.club-card__img img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.4s ease;
}
.club-card:hover .club-card__img img { transform: scale(1.05); }
.club-card__city-badge {
  position: absolute; top: 12px; left: 12px;
  background: rgba(0,0,0,0.6); color: var(--white);
  font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
  padding: 4px 12px; border-radius: 100px;
}

.club-card__body { padding: 20px 22px 24px; background: var(--white); }
.club-card__name {
  font-family: var(--font-display); font-size: 20px; color: var(--black);
  margin-bottom: 8px; line-height: 1.1;
}
.club-card__address {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; color: var(--text-light); margin-bottom: 14px;
}
.club-card__address svg { color: var(--red); flex-shrink: 0; }

.club-card__services { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.service-badge {
  font-size: 11px; padding: 4px 10px;
  background: #fff0f0; color: var(--red); border-radius: 100px; font-weight: 600;
}

.club-card__hours {
  display: flex; gap: 20px; margin-bottom: 20px;
  padding: 12px 0; border-top: 1px solid var(--gray-mid);
}
.club-card__hours div { display: flex; flex-direction: column; gap: 2px; }
.club-card__hours strong { font-size: 11px; text-transform: uppercase; color: var(--text-light); letter-spacing: 0.5px; }
.club-card__hours span { font-size: 13px; font-weight: 600; }

.club-card__actions { display: flex; gap: 12px; align-items: center; }
.btn-tour-sm {
  padding: 11px 18px; border: 1.5px solid var(--red); border-radius: var(--radius);
  color: var(--red); font-size: 12px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.5px; cursor: pointer; background: none; transition: all var(--transition);
}
.btn-tour-sm:hover { background: var(--red); color: var(--white); }

.clubs-cta { background: var(--black); padding: 48px 0; }
.clubs-cta__inner {
  display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
}
.clubs-cta__inner h2 { font-family: var(--font-display); font-size: 32px; color: var(--white); margin-bottom: 4px; }
.clubs-cta__inner p { color: rgba(255,255,255,0.6); font-size: 15px; }

@media (max-width: 900px) { .clubs-grid { grid-template-columns: 1fr; } .clubs-cta__inner { flex-direction: column; align-items: flex-start; } }
@media (max-width: 480px) { .city-tabs { gap: 6px; } .city-tab { font-size: 12px; padding: 7px 14px; } }
</style>
