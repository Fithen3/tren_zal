<template>
  <main class="subs-page">

    <section class="page-hero">
      <div class="container page-hero__inner">
        <div class="fade-up">
          <h1 class="page-hero__title">Абонементы</h1>
          <p class="page-hero__sub">Выберите карту, которая подходит именно вам — и начните меняться уже сегодня</p>
          <div class="page-hero__badges">
            <span>✓ Без скрытых платежей</span>
            <span>✓ Заморозка до 30 дней</span>
            <span>✓ Перевод на другой клуб</span>
          </div>
        </div>
        <div class="page-hero__img fade-up delay-2">
          <img src="https://picsum.photos/seed/subs-hero/600/420" alt="Фитнес клуб" />
        </div>
      </div>
    </section>

    <section class="plans-section">
      <div class="container">
        <div class="period-switch">
          <button :class="['period-btn', { active: period === 'month' }]" @click="period = 'month'">1 месяц</button>
          <button :class="['period-btn', { active: period === 'quarter' }]" @click="period = 'quarter'">3 месяца <span class="discount">−10%</span></button>
          <button :class="['period-btn', { active: period === 'year' }]" @click="period = 'year'">12 месяцев <span class="discount">−30%</span></button>
        </div>

        <div class="plans-grid">
          <article v-for="plan in plans" :key="plan.id" :class="['plan-card', { popular: plan.popular }]">
            <div v-if="plan.popular" class="plan-badge">Популярный</div>
            <div class="plan-card__header" :style="{ background: plan.gradient }">
              <img :src="plan.image" :alt="plan.name" class="plan-card__img" />
              <div class="plan-card__overlay">
                <h3 class="plan-card__name">{{ plan.name }}</h3>
                <p class="plan-card__tagline">{{ plan.tagline }}</p>
              </div>
            </div>
            <div class="plan-card__body">
              <div class="plan-card__price">
                <span class="plan-price-num">{{ formatPrice(plan.prices[period]) }}</span>
                <span class="plan-price-per">₽ / мес</span>
              </div>
              <p class="plan-price-total" v-if="period !== 'month'">
                Итого: {{ formatPrice(plan.prices[period] * periodMonths) }} ₽
              </p>
              <ul class="plan-features">
                <li v-for="f in plan.features" :key="f.text" :class="{ disabled: !f.included }">
                  <span class="plan-feature-icon">{{ f.included ? '✓' : '✗' }}</span>
                  {{ f.text }}
                </li>
              </ul>
              <button class="plan-card__btn" :class="plan.popular ? 'btn-red' : 'btn-outline-dark'" @click="$emit('open-tour')">
                Оформить карту
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="benefits-section">
      <div class="container">
        <h2 class="section-title">Что входит в карту</h2>
        <div class="benefits-grid">
          <div v-for="b in benefits" :key="b.title" class="benefit-card">
            <div class="benefit-card__img">
              <img :src="b.image" :alt="b.title" loading="lazy" />
            </div>
            <h3>{{ b.title }}</h3>
            <p>{{ b.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section">
      <div class="container">
        <h2 class="section-title">Частые вопросы</h2>
        <div class="faq-list">
          <div v-for="item in faq" :key="item.q" class="faq-item">
            <button class="faq-item__q" @click="item.open = !item.open">
              {{ item.q }}
              <svg :class="{ rotated: item.open }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div v-show="item.open" class="faq-item__a">{{ item.a }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="subs-cta">
      <div class="container subs-cta__inner">
        <div>
          <h2>Готовы начать?</h2>
          <p>Запишитесь на экскурсию — покажем клуб и поможем выбрать карту</p>
        </div>
        <div class="subs-cta__btns">
          <button class="btn-red" @click="$emit('open-tour')">Записаться на экскурсию</button>
          <a href="tel:+78126100606" class="btn-outline">(812) 610-06-06</a>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

defineEmits(['open-tour'])

const period = ref('month')
const periodMonths = computed(() => ({ month: 1, quarter: 3, year: 12 }[period.value]))

function formatPrice(n) {
  return n.toLocaleString('ru-RU')
}

const plans = [
  {
    id: 1, name: 'Базовый', tagline: 'Тренажёрный зал без ограничений',
    popular: false,
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
    image: 'https://picsum.photos/seed/plan-base/600/260',
    prices: { month: 2490, quarter: 2241, year: 1743 },
    features: [
      { text: 'Тренажёрный зал', included: true },
      { text: 'Кардио-зона', included: true },
      { text: 'Раздевалки и душевые', included: true },
      { text: 'Зона кроссфита', included: true },
      { text: 'Групповые занятия', included: false },
      { text: 'Бассейн', included: false },
      { text: 'СПА-зона', included: false },
      { text: 'Персональный тренер (1 сессия)', included: false },
    ],
  },
  {
    id: 2, name: 'Стандарт', tagline: 'Зал + Групповые занятия',
    popular: true,
    gradient: 'linear-gradient(180deg, rgba(180,20,25,0.5) 0%, rgba(0,0,0,0.75) 100%)',
    image: 'https://picsum.photos/seed/plan-std/600/260',
    prices: { month: 3490, quarter: 3141, year: 2443 },
    features: [
      { text: 'Тренажёрный зал', included: true },
      { text: 'Кардио-зона', included: true },
      { text: 'Раздевалки и душевые', included: true },
      { text: 'Зона кроссфита', included: true },
      { text: 'Групповые занятия', included: true },
      { text: 'Бассейн', included: false },
      { text: 'СПА-зона', included: false },
      { text: 'Персональный тренер (1 сессия)', included: false },
    ],
  },
  {
    id: 3, name: 'Премиум', tagline: 'Всё включено — без ограничений',
    popular: false,
    gradient: 'linear-gradient(180deg, rgba(30,30,80,0.5) 0%, rgba(0,0,0,0.75) 100%)',
    image: 'https://picsum.photos/seed/plan-prem/600/260',
    prices: { month: 5490, quarter: 4941, year: 3843 },
    features: [
      { text: 'Тренажёрный зал', included: true },
      { text: 'Кардио-зона', included: true },
      { text: 'Раздевалки и душевые', included: true },
      { text: 'Зона кроссфита', included: true },
      { text: 'Групповые занятия', included: true },
      { text: 'Бассейн', included: true },
      { text: 'СПА-зона', included: true },
      { text: 'Персональный тренер (1 сессия)', included: true },
    ],
  },
]

const benefits = [
  { title: 'Без очередей', desc: 'Современное оборудование в достаточном количестве — тренируйтесь без ожидания.', image: 'https://picsum.photos/seed/ben-gym/400/240' },
  { title: 'Профессиональные тренеры', desc: 'Консультации тренеров включены — всегда поможем с техникой и программой.', image: 'https://picsum.photos/seed/ben-trainer/400/240' },
  { title: 'Чистота и комфорт', desc: 'Раздевалки убираются каждые 2 часа, оборудование — после каждого использования.', image: 'https://picsum.photos/seed/ben-clean/400/240' },
  { title: 'Заморозка карты', desc: 'До 30 дней в год по болезни или отпуску — без потери оплаченных дней.', image: 'https://picsum.photos/seed/ben-freeze/400/240' },
]

const faq = reactive([
  { q: 'Можно ли заморозить карту?', a: 'Да, заморозка доступна по болезни (с больничным листом) или по личным причинам — до 30 дней в году. Обратитесь на рецепцию или позвоните по телефону клуба.', open: false },
  { q: 'Есть ли пробный день или пробная тренировка?', a: 'Да! Для новых гостей предусмотрен пробный визит — запишитесь на экскурсию, и мы предоставим возможность потренироваться в день посещения.', open: false },
  { q: 'Могу ли я ходить в разные клубы по одной карте?', a: 'По картам Стандарт и Премиум доступно посещение клубов в выбранном городе. Карта Базовый — для одного клуба. Уточняйте у менеджера при оформлении.', open: false },
  { q: 'Как оплатить абонемент?', a: 'Оплата доступна на рецепции клуба (наличные, карта), через мобильное приложение Fitness House или онлайн. При оформлении от 3 месяцев действует скидка.', open: false },
  { q: 'Что делать, если я передумал/а?', a: 'В течение 5 дней с момента оформления мы вернём деньги без вопросов. Обратитесь на рецепцию с документом, подтверждающим оплату.', open: false },
])
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, var(--black) 0%, #1a0506 60%, var(--black) 100%);
  padding: 64px 0;
  position: relative; overflow: hidden;
}
.page-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(227,30,36,0.15) 0%, transparent 65%);
  pointer-events: none;
}
.page-hero__inner {
  display: grid; grid-template-columns: 1fr 520px; gap: 48px; align-items: center;
}
.page-hero__title {
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 96px);
  color: var(--white); line-height: 1; letter-spacing: 2px; margin-bottom: 16px;
}
.page-hero__sub { font-size: 18px; color: rgba(255,255,255,0.65); font-weight: 300; margin-bottom: 24px; }
.page-hero__badges { display: flex; flex-direction: column; gap: 8px; }
.page-hero__badges span { font-size: 14px; color: rgba(255,255,255,0.7); }
.page-hero__badges span::first-letter { color: #4ade80; }
.page-hero__img img { width: 100%; border-radius: 12px; object-fit: cover; height: 320px; }

.plans-section { padding: 64px 0; }

.period-switch {
  display: flex; gap: 0; margin: 0 auto 48px;
  border: 1.5px solid var(--gray-mid); border-radius: var(--radius);
  width: fit-content; overflow: hidden;
}
.period-btn {
  padding: 12px 24px; font-size: 14px; font-weight: 600;
  cursor: pointer; background: var(--white); color: var(--text);
  border-right: 1.5px solid var(--gray-mid); transition: all var(--transition);
  display: flex; align-items: center; gap: 8px;
}
.period-btn:last-child { border-right: none; }
.period-btn:hover { background: var(--gray); }
.period-btn.active { background: var(--red); color: var(--white); }
.discount {
  font-size: 11px; padding: 2px 7px;
  background: rgba(255,255,255,0.2); border-radius: 100px;
  font-weight: 700;
}
.period-btn:not(.active) .discount {
  background: #d1fae5; color: #065f46;
}

.plans-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 24px; align-items: start;
}
.plan-card {
  border-radius: 16px; overflow: hidden;
  border: 2px solid var(--gray-mid);
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
  position: relative;
}
.plan-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
.plan-card.popular {
  border-color: var(--red);
  transform: scale(1.03);
  box-shadow: 0 8px 40px rgba(227,30,36,0.2);
}
.plan-card.popular:hover { transform: scale(1.03) translateY(-6px); }

.plan-badge {
  position: absolute; top: 16px; right: 16px; z-index: 2;
  background: var(--red); color: var(--white);
  font-size: 11px; font-weight: 800; letter-spacing: 0.5px;
  padding: 4px 12px; border-radius: 100px;
}

.plan-card__header { position: relative; height: 180px; overflow: hidden; }
.plan-card__img { width: 100%; height: 100%; object-fit: cover; }
.plan-card__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%);
  display: flex; flex-direction: column; justify-content: flex-end; padding: 20px;
}
.plan-card__name {
  font-family: var(--font-display); font-size: 28px; color: var(--white); line-height: 1;
}
.plan-card__tagline { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 4px; }

.plan-card__body { padding: 20px 24px 28px; background: var(--white); }
.plan-card__price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 4px; }
.plan-price-num { font-family: var(--font-display); font-size: 44px; color: var(--black); }
.plan-price-per { font-size: 14px; color: var(--text-light); }
.plan-price-total { font-size: 13px; color: var(--text-light); margin-bottom: 20px; }

.plan-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.plan-features li {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: var(--text);
}
.plan-features li.disabled { color: var(--text-light); opacity: 0.5; }
.plan-feature-icon { width: 18px; flex-shrink: 0; font-size: 12px; }
.plan-features li:not(.disabled) .plan-feature-icon { color: #22c55e; }
.plan-features li.disabled .plan-feature-icon { color: #ccc; }

.plan-card__btn { width: 100%; text-align: center; padding: 13px; cursor: pointer; font-size: 13px; }
.btn-outline-dark {
  display: block; border: 1.5px solid var(--black); color: var(--black);
  border-radius: var(--radius); font-weight: 700; font-size: 13px;
  text-transform: uppercase; letter-spacing: 0.5px;
  transition: all var(--transition); background: none;
}
.btn-outline-dark:hover { background: var(--black); color: var(--white); }

.benefits-section { padding: 64px 0; background: var(--gray); }
.section-title {
  font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px);
  letter-spacing: 1px; color: var(--black); margin-bottom: 32px;
}
.benefits-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;
}
.benefit-card {
  background: var(--white); border-radius: 12px; overflow: hidden;
  box-shadow: var(--shadow);
}
.benefit-card__img { height: 160px; overflow: hidden; }
.benefit-card__img img { width: 100%; height: 100%; object-fit: cover; }
.benefit-card h3 { font-size: 16px; font-weight: 700; padding: 16px 20px 6px; }
.benefit-card p { font-size: 13px; color: var(--text-light); padding: 0 20px 20px; line-height: 1.6; }

.faq-section { padding: 64px 0; }
.faq-list { max-width: 800px; display: flex; flex-direction: column; gap: 8px; }
.faq-item {
  border: 1.5px solid var(--gray-mid); border-radius: 10px; overflow: hidden;
}
.faq-item__q {
  width: 100%; text-align: left; padding: 18px 20px;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 15px; font-weight: 600; cursor: pointer; background: var(--white);
  transition: color var(--transition);
}
.faq-item__q:hover { color: var(--red); }
.faq-item__q svg { flex-shrink: 0; transition: transform 0.3s; }
.faq-item__q svg.rotated { transform: rotate(180deg); }
.faq-item__a {
  padding: 0 20px 18px;
  font-size: 14px; color: var(--text-light); line-height: 1.7;
  border-top: 1px solid var(--gray-mid); padding-top: 14px;
  margin-top: -1px;
}

.subs-cta { background: var(--black); padding: 56px 0; }
.subs-cta__inner {
  display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
}
.subs-cta__inner h2 {
  font-family: var(--font-display); font-size: 36px; color: var(--white); margin-bottom: 4px;
}
.subs-cta__inner p { color: rgba(255,255,255,0.6); font-size: 15px; }
.subs-cta__btns { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-outline {
  display: inline-block; padding: 12px 28px; border-radius: var(--radius);
  border: 2px solid rgba(255,255,255,0.3); color: var(--white);
  font-size: 13px; font-weight: 700; text-transform: uppercase;
  transition: all var(--transition);
}
.btn-outline:hover { border-color: var(--white); background: rgba(255,255,255,0.1); }

@media (max-width: 1100px) { .plans-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; } .plan-card.popular { transform: none; } }
@media (max-width: 900px) {
  .page-hero__inner { grid-template-columns: 1fr; }
  .page-hero__img { display: none; }
  .period-switch { flex-direction: column; width: 100%; border-radius: var(--radius); }
  .period-btn { border-right: none; border-bottom: 1.5px solid var(--gray-mid); }
  .period-btn:last-child { border-bottom: none; }
  .subs-cta__inner { flex-direction: column; align-items: flex-start; }
}
</style>
