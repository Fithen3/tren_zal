<template>
  <main class="club-page">

    <!-- Hero banner -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__content fade-up">
          <h1 class="hero__title">Архангельск Московский</h1>
          <p class="hero__sub">Фитнес-клуб с бассейном, СПА и детскими секциями</p>
          <div class="hero__actions">
            <a href="#lead-form" class="btn-red">Забронировать абонемент</a>
            <a href="#map-club" class="hero__map-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Смотреть на карте
            </a>
          </div>
        </div>
        <div id="lead-form" class="hero__form fade-up delay-2">
          <LeadForm />
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="services section-gap">
      <div class="container">
        <h2 class="section-title">Услуги</h2>
        <p class="services__intro">
          В «Фитнес Хаус» большой спортивный бассейн с 4 дорожками по 25 метров, для детей — бассейн с безопасной глубиной от 60 до 90 см. Отличная СПА-зона: финская сауна, турецкая парная (хамам), инфракрасная кабина и русская баня.
        </p>
        <p class="services__intro">
          В просторном тренажёрном зале современное оборудование для силовых, кардио-занятий и кроссфита. Есть 3 стола для настольного тенниса и зона Сайкл.
        </p>
        <div class="services__grid">
          <div v-for="s in services" :key="s.title" class="service-card">
            <div class="service-card__img">
              <img :src="s.image" :alt="s.title" loading="lazy" />
            </div>
            <div class="service-card__content">
              <h3 class="service-card__title">{{ s.title }}</h3>
              <p class="service-card__desc">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tour CTA banner -->
    <section class="tour-cta">
      <div class="container tour-cta__inner">
        <div>
          <h2>Понравился клуб?</h2>
          <p>Запишитесь на бесплатную экскурсию прямо сейчас</p>
        </div>
        <button class="btn-red" @click="$emit('open-tour')">Записаться на экскурсию</button>
      </div>
    </section>

    <!-- How to get there -->
    <section class="directions section-gap">
      <div class="container">
        <h2 class="section-title">Как добраться</h2>
        <div class="directions__grid">
          <div class="directions__info">
            <div class="directions__highlight">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Клуб расположен на 2 этаже, вход со стороны ул. Октябрят. Для посетителей есть <strong>бесплатная парковка</strong>.
            </div>
            <p class="directions__text">
              Клуб расположен в округе «Майская Горка» города Архангельска. Ближайшая остановка — «Улица Челюскинцев». Здание стоит в треугольнике Московского проспекта, улицы Октябрят и улицы Стрелковой.
            </p>

            <div class="club-info">
              <h3 class="club-info__title">Клуб Архангельск Московский</h3>
              <p class="club-info__address">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                пр. Московский, д. 33
              </p>
              <div class="club-info__hours">
                <div class="hours-block">
                  <strong>Режим работы клуба:</strong>
                  <p>пн–пт 07:00–23:00</p>
                  <p>сб–вс, праздники 08:00–22:00</p>
                </div>
                <div class="hours-block">
                  <strong>Отдел продаж:</strong>
                  <p>пн–пт 10:00–21:00</p>
                  <p>сб–вс, праздники 11:00–21:00</p>
                </div>
              </div>
            </div>
          </div>
          <div id="map-club" class="directions__map">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=40.537&z=15&pt=40.537,64.545&text=%D0%90%D1%80%D1%85%D0%B0%D0%BD%D0%B3%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%2C%20%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%2033"
              width="100%" height="400" frameborder="0" allowfullscreen loading="lazy"
              title="Карта клуба Архангельск Московский"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- Features list -->
    <section class="features section-gap">
      <div class="container">
        <div class="features__grid">
          <div v-for="f in features" :key="f.title" class="feature-item">
            <div class="feature-item__dot"></div>
            <div>
              <strong>{{ f.title }}</strong>
              <span v-if="f.sub"> — {{ f.sub }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter + News -->
    <section class="news-section section-gap">
      <div class="container news-section__grid">
        <div>
          <h2 class="section-title">Новости клуба</h2>
          <div v-if="newsLoading" class="news__loading">Загружаем новости…</div>
          <div v-else-if="news.length === 0" class="news__empty">Новостей пока нет</div>
          <div v-else>
            <article v-for="item in news" :key="item.id" class="news-item">
              <time class="news-item__date">{{ formatDate(item.created_at) }}</time>
              <p class="news-item__text">{{ item.text }}</p>
            </article>
          </div>
          <a href="https://www.fitnesshouse.ru/clubs-news.html?club=2194" class="news__more">Показать ещё →</a>
        </div>
        <div>
          <NewsletterForm />
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LeadForm from '../components/LeadForm.vue'
import NewsletterForm from '../components/NewsletterForm.vue'
import { getNews } from '../api/forms.js'

defineEmits(['open-tour'])

const news = ref([])
const newsLoading = ref(true)

onMounted(async () => {
  try {
    news.value = await getNews(2194)
  } catch {
    news.value = [{
      id: 1,
      created_at: '2026-04-25',
      text: 'Уважаемые посетители! Обращаем Ваше внимание на режим работы клубов в майские праздники.'
    }]
  } finally {
    newsLoading.value = false
  }
})

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const services = [
  { image: 'https://picsum.photos/seed/svc-gym/400/200', title: 'Тренажерный зал', desc: 'Зона свободных весов, силовые тренажеры, кроссфит' },
  { image: 'https://picsum.photos/seed/svc-pool/400/200', title: 'Бассейн', desc: 'Спортивный 25м с 4 дорожками и детский с глубиной 60–90 см' },
  { image: 'https://picsum.photos/seed/svc-group/400/200', title: 'Групповые занятия', desc: 'Танцы, йога, пилатес, аквааэробика' },
  { image: 'https://picsum.photos/seed/svc-cardio/400/200', title: 'Кардио-зона', desc: 'Беговые дорожки, велосипеды, зона Сайкл' },
  { image: 'https://picsum.photos/seed/svc-spa/400/200', title: 'СПА-зона', desc: 'Инфракрасная сауна, хаммам, финская сауна, русская баня' },
  { image: 'https://picsum.photos/seed/svc-kids/400/200', title: 'Детские секции', desc: 'Плавание, бокс, йога, танцы, ОФП' },
  { image: 'https://picsum.photos/seed/svc-massage/400/200', title: 'Массажный кабинет', desc: 'Расслабляющий, лечебно-восстановительный и спортивный массаж' },
  { image: 'https://picsum.photos/seed/svc-tennis/400/200', title: 'Настольный теннис', desc: '3 стола для игры и тренировок' },
]

const features = [
  { title: 'Тренажерный зал', sub: 'Зона свободных весов, силовые тренажеры' },
  { title: 'Групповые занятия', sub: 'Танцы, йога, пилатес, аквааэробика' },
  { title: 'Кардио-зона', sub: 'Беговые дорожки, велосипеды, сайкл' },
  { title: 'Мастер-классы от ведущих тренеров', sub: null },
  { title: 'Бассейн', sub: 'Спортивный бассейн, детский бассейн' },
  { title: 'СПА-зона', sub: 'Инфракрасная сауна, хаммам, финская сауна' },
  { title: 'Детские секции', sub: 'Плавание, танцы, единоборства и др.' },
  { title: 'Стартовый пакет персональных тренировок', sub: null },
]
</script>

<style scoped>
.section-gap { padding: 64px 0; }

/* Hero */
.hero {
  background: linear-gradient(135deg, var(--black) 0%, #2a0a0b 60%, var(--black) 100%);
  padding: 64px 0;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(227,30,36,0.18) 0%, transparent 65%);
  pointer-events: none;
}
.hero__inner {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 48px;
  align-items: center;
}
.hero__title {
  font-family: var(--font-display);
  font-size: clamp(42px, 6vw, 80px);
  color: var(--white);
  line-height: 1;
  margin-bottom: 16px;
  letter-spacing: 2px;
}
.hero__sub {
  font-size: 18px;
  color: rgba(255,255,255,0.65);
  margin-bottom: 32px;
  font-weight: 300;
}
.hero__actions { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.hero__map-link {
  display: flex; align-items: center; gap: 6px;
  color: rgba(255,255,255,0.7); font-size: 14px;
  transition: color var(--transition);
  border-bottom: 1px dashed rgba(255,255,255,0.3);
  padding-bottom: 2px;
}
.hero__map-link:hover { color: var(--white); }
.hero__form {
  background: var(--white);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

/* Services */
.services__intro {
  color: var(--text);
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 14px;
  max-width: 800px;
}
.services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 32px;
}
.service-card {
  background: var(--white);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--gray-mid);
  transition: transform var(--transition), box-shadow var(--transition);
}
.service-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
.service-card__img { height: 150px; overflow: hidden; }
.service-card__img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.service-card:hover .service-card__img img { transform: scale(1.06); }
.service-card__content { padding: 16px 18px 18px; border-top: 3px solid var(--red); }
.service-card__title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.service-card__desc { font-size: 13px; color: var(--text-light); line-height: 1.5; }

/* Tour CTA */
.tour-cta { background: var(--red); padding: 40px 0; }
.tour-cta__inner {
  display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
}
.tour-cta__inner h2 {
  font-family: var(--font-display); font-size: 32px; color: var(--white); margin-bottom: 4px;
}
.tour-cta__inner p { color: rgba(255,255,255,0.8); font-size: 15px; }
.tour-cta .btn-red {
  background: var(--white); color: var(--red);
  font-size: 14px; white-space: nowrap;
}
.tour-cta .btn-red:hover { background: rgba(255,255,255,0.9); transform: translateY(-1px); }

/* Directions */
.directions__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
.directions__highlight {
  display: flex; gap: 10px; align-items: flex-start;
  background: #fff3f3; border-left: 4px solid var(--red);
  padding: 16px; border-radius: 6px; margin-bottom: 20px;
  font-size: 14px; line-height: 1.6;
}
.directions__highlight svg { flex-shrink: 0; margin-top: 2px; color: var(--red); }
.directions__text { font-size: 14px; color: var(--text-light); line-height: 1.8; margin-bottom: 24px; }
.directions__map iframe { border-radius: 10px; }

.club-info { background: var(--gray); border-radius: 10px; padding: 24px; }
.club-info__title { font-family: var(--font-display); font-size: 22px; margin-bottom: 10px; }
.club-info__address { display: flex; align-items: center; gap: 6px; font-size: 14px; color: var(--text-light); margin-bottom: 16px; }
.club-info__address svg { color: var(--red); flex-shrink: 0; }
.club-info__hours { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.hours-block strong { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-light); margin-bottom: 4px; }
.hours-block p { font-size: 13px; }

/* Features */
.features { background: var(--black); }
.features__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.feature-item {
  display: flex; align-items: flex-start; gap: 12px;
  color: rgba(255,255,255,0.85); font-size: 14px; padding: 16px;
  border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;
  transition: border-color var(--transition);
}
.feature-item:hover { border-color: var(--red); }
.feature-item__dot { width: 8px; height: 8px; background: var(--red); border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
.feature-item span { color: rgba(255,255,255,0.5); }

/* News */
.news-section__grid { display: grid; grid-template-columns: 1fr 360px; gap: 48px; align-items: start; }
.news__loading, .news__empty { color: var(--text-light); font-size: 14px; padding: 20px 0; }
.news-item { padding: 20px 0; border-bottom: 1px solid var(--gray-mid); }
.news-item__date { font-size: 12px; color: var(--red); font-weight: 700; display: block; margin-bottom: 6px; }
.news-item__text { font-size: 14px; color: var(--text); line-height: 1.6; }
.news__more { display: inline-block; margin-top: 16px; color: var(--red); font-size: 14px; font-weight: 600; transition: gap var(--transition); }
.news__more:hover { text-decoration: underline; }

@media (max-width: 900px) {
  .hero__inner { grid-template-columns: 1fr; }
  .hero__form { max-width: 100%; }
  .directions__grid { grid-template-columns: 1fr; }
  .news-section__grid { grid-template-columns: 1fr; }
  .club-info__hours { grid-template-columns: 1fr; }
}
</style>
