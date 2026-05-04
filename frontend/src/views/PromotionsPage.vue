<template>
  <main class="promotions-page">

    <section class="page-hero">
      <div class="container">
        <h1 class="page-hero__title fade-up">Акции</h1>
        <p class="page-hero__sub fade-up delay-1">Специальные предложения для новых и постоянных клиентов</p>
      </div>
    </section>

    <section class="promos-section">
      <div class="container">
        <div class="cat-tabs">
          <button
            v-for="cat in categories"
            :key="cat"
            :class="['cat-tab', { active: activeCategory === cat }]"
            @click="activeCategory = cat"
          >{{ cat }}</button>
        </div>

        <div class="promos-grid">
          <article v-for="promo in filteredPromos" :key="promo.id" class="promo-card">
            <div class="promo-card__img">
              <img :src="promo.image" :alt="promo.title" loading="lazy" />
              <div class="promo-card__badge" v-if="promo.badge">{{ promo.badge }}</div>
              <div class="promo-card__overlay"></div>
            </div>
            <div class="promo-card__body">
              <span class="promo-card__category">{{ promo.category }}</span>
              <h3 class="promo-card__title">{{ promo.title }}</h3>
              <p class="promo-card__desc">{{ promo.desc }}</p>
              <div class="promo-card__footer">
                <span class="promo-card__deadline" v-if="promo.deadline">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  до {{ promo.deadline }}
                </span>
                <button class="btn-red" @click="$emit('open-tour')">{{ promo.cta }}</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="promo-banner">
      <div class="container promo-banner__inner">
        <div>
          <h2>Есть вопросы по акции?</h2>
          <p>Наши менеджеры готовы ответить прямо сейчас</p>
        </div>
        <div class="promo-banner__contacts">
          <a href="tel:+78126100606" class="btn-red">(812) 610-06-06</a>
          <a href="https://t.me/fitnesshouse29" target="_blank" class="btn-outline">Telegram</a>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

defineEmits(['open-tour'])

const categories = ['Все акции', 'Абонементы', 'Персональные тренировки', 'Детям', 'Приведи друга']
const activeCategory = ref('Все акции')

const promos = [
  {
    id: 1, category: 'Абонементы', badge: '-30%',
    image: 'https://picsum.photos/seed/promo-year/600/260',
    title: 'Карта на год со скидкой 30%',
    desc: 'Оформите годовой абонемент до конца месяца и получите скидку 30% на полную стоимость. Доступ ко всем зонам клуба включён.',
    deadline: '31 мая 2026', cta: 'Оформить абонемент',
  },
  {
    id: 2, category: 'Приведи друга', badge: null,
    image: 'https://picsum.photos/seed/promo-friend/600/260',
    title: 'Приведи друга — получи месяц в подарок',
    desc: 'Пригласите друга, который оформит любой абонемент от 3 месяцев, и получите 1 месяц бесплатного продления вашей карты.',
    deadline: null, cta: 'Узнать подробнее',
  },
  {
    id: 3, category: 'Абонементы', badge: 'ХИТ',
    image: 'https://picsum.photos/seed/promo-pool/600/260',
    title: 'Фитнес + Бассейн — выгоднее вместе',
    desc: 'Комплексный абонемент с доступом в тренажёрный зал и бассейн по специальной цене. Экономия до 4 000 ₽ в месяц.',
    deadline: '30 июня 2026', cta: 'Купить комплект',
  },
  {
    id: 4, category: 'Абонементы', badge: 'ЛЕТО',
    image: 'https://picsum.photos/seed/promo-summer/600/260',
    title: 'Летняя карта: 3 месяца по цене 2',
    desc: 'Специальное летнее предложение: оплатите 2 месяца и занимайтесь 3. Предложение действует на карты с доступом в тренажёрный зал.',
    deadline: '15 июня 2026', cta: 'Активировать',
  },
  {
    id: 5, category: 'Детям', badge: '1 мес бесплатно',
    image: 'https://picsum.photos/seed/promo-kids/600/260',
    title: 'Детская секция: первый месяц бесплатно',
    desc: 'Запишите ребёнка на детскую секцию (плавание, танцы, единоборства, ОФП) и получите первый месяц бесплатно при оформлении от 3 месяцев.',
    deadline: '31 мая 2026', cta: 'Записать ребёнка',
  },
  {
    id: 6, category: 'Персональные тренировки', badge: '1-я БЕСПЛАТНО',
    image: 'https://picsum.photos/seed/promo-personal/600/260',
    title: 'Первая персональная тренировка бесплатно',
    desc: 'Познакомьтесь с нашими тренерами: первое персональное занятие с тренером абсолютно бесплатно. При покупке пакета от 5 тренировок.',
    deadline: null, cta: 'Записаться на тренировку',
  },
  {
    id: 7, category: 'Персональные тренировки', badge: '-20%',
    image: 'https://picsum.photos/seed/promo-pack/600/260',
    title: 'Пакет 10 персональных тренировок',
    desc: 'Купите пакет из 10 персональных тренировок с любым тренером клуба и получите скидку 20% от розничной цены.',
    deadline: '30 июня 2026', cta: 'Купить пакет',
  },
  {
    id: 8, category: 'Приведи друга', badge: null,
    image: 'https://picsum.photos/seed/promo-gift/600/260',
    title: 'Подарочный сертификат на любую сумму',
    desc: 'Подарите близким абонемент или персональные тренировки в Fitness House. Сертификаты доступны от 1 000 ₽ — на любое количество занятий.',
    deadline: null, cta: 'Оформить сертификат',
  },
]

const filteredPromos = computed(() =>
  activeCategory.value === 'Все акции'
    ? promos
    : promos.filter(p => p.category === activeCategory.value)
)
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, var(--black) 0%, #1a0506 60%, var(--black) 100%);
  padding: 64px 0; position: relative; overflow: hidden;
}
.page-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(227,30,36,0.18) 0%, transparent 65%);
  pointer-events: none;
}
.page-hero__title {
  font-family: var(--font-display); font-size: clamp(48px, 7vw, 96px);
  color: var(--white); line-height: 1; letter-spacing: 2px; margin-bottom: 12px;
}
.page-hero__sub { font-size: 18px; color: rgba(255,255,255,0.6); font-weight: 300; }

.promos-section { padding: 56px 0; }

.cat-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
.cat-tab {
  padding: 8px 18px; border-radius: 100px; border: 1.5px solid var(--gray-mid);
  font-size: 13px; font-weight: 500; cursor: pointer; background: var(--white); color: var(--text);
  transition: all var(--transition);
}
.cat-tab:hover { border-color: var(--red); color: var(--red); }
.cat-tab.active { background: var(--red); color: var(--white); border-color: var(--red); }

.promos-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;
}
.promo-card {
  border-radius: 12px; overflow: hidden; box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition);
}
.promo-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.15); }

.promo-card__img {
  position: relative; height: 180px; overflow: hidden;
}
.promo-card__img img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.4s ease;
}
.promo-card:hover .promo-card__img img { transform: scale(1.06); }
.promo-card__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%);
}
.promo-card__badge {
  position: absolute; top: 12px; right: 12px; z-index: 2;
  background: var(--red); color: var(--white);
  font-size: 12px; font-weight: 800; padding: 4px 12px; border-radius: 100px;
  letter-spacing: 0.5px;
}

.promo-card__body { padding: 20px 24px 24px; background: var(--white); }
.promo-card__category {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1px; color: var(--red); display: block; margin-bottom: 8px;
}
.promo-card__title {
  font-family: var(--font-display); font-size: 20px; color: var(--black);
  margin-bottom: 10px; line-height: 1.2;
}
.promo-card__desc { font-size: 13px; color: var(--text-light); line-height: 1.7; margin-bottom: 20px; }
.promo-card__footer {
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
}
.promo-card__deadline {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; color: var(--text-light); font-weight: 500;
}
.promo-card__deadline svg { color: var(--red); }

.promo-banner { background: var(--black); padding: 48px 0; }
.promo-banner__inner {
  display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
}
.promo-banner__inner h2 {
  font-family: var(--font-display); font-size: 32px; color: var(--white); margin-bottom: 4px;
}
.promo-banner__inner p { color: rgba(255,255,255,0.6); font-size: 15px; }
.promo-banner__contacts { display: flex; gap: 12px; }
.btn-outline {
  display: inline-block; padding: 12px 28px; border-radius: var(--radius);
  border: 2px solid rgba(255,255,255,0.3); color: var(--white);
  font-size: 13px; font-weight: 700; text-transform: uppercase;
  transition: all var(--transition); cursor: pointer;
}
.btn-outline:hover { border-color: var(--white); background: rgba(255,255,255,0.1); }

@media (max-width: 900px) {
  .promos-grid { grid-template-columns: 1fr; }
  .promo-banner__inner { flex-direction: column; align-items: flex-start; }
}
</style>
