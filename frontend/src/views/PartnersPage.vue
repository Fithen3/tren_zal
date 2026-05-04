<template>
  <main class="partners-page">

    <section class="page-hero">
      <div class="container page-hero__inner">
        <div class="fade-up">
          <h1 class="page-hero__title">Партнёрство</h1>
          <p class="page-hero__sub">Работаем с бизнесом — откройте новые возможности вместе с Fitness House</p>
        </div>
        <div class="page-hero__img fade-up delay-2">
          <img src="https://picsum.photos/seed/partners-hero/600/380" alt="Партнёрство" />
        </div>
      </div>
    </section>

    <section class="directions-section">
      <div class="container">
        <h2 class="section-title">Направления сотрудничества</h2>
        <div class="directions-grid">
          <article v-for="dir in directions" :key="dir.id" class="dir-card">
            <div class="dir-card__img">
              <img :src="dir.image" :alt="dir.title" loading="lazy" />
            </div>
            <div class="dir-card__body">
              <h3 class="dir-card__title">{{ dir.title }}</h3>
              <p class="dir-card__desc">{{ dir.desc }}</p>
              <ul class="dir-card__points">
                <li v-for="p in dir.points" :key="p">{{ p }}</li>
              </ul>
              <button class="btn-red dir-card__cta" @click="openForm(dir)">Оставить заявку</button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="partners-numbers">
      <div class="container">
        <div class="numbers-grid">
          <div v-for="n in numbers" :key="n.label" class="number-item">
            <strong>{{ n.value }}</strong>
            <span>{{ n.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-section">
      <div class="container contact-section__inner">
        <div>
          <h2 class="section-title" style="color:var(--white)">Остались вопросы?</h2>
          <p>Наш менеджер свяжется с вами в течение рабочего дня и ответит на все вопросы о сотрудничестве.</p>
          <div class="contact-info">
            <a href="tel:+78126100606">(812) 610-06-06</a>
            <a href="mailto:partner@fhclub.ru">partner@fhclub.ru</a>
          </div>
        </div>
        <form class="contact-form" @submit.prevent="submitContact">
          <input v-model="form.name" type="text" placeholder="Ваше имя *" required />
          <input v-model="form.company" type="text" placeholder="Компания" />
          <input v-model="form.phone" type="tel" placeholder="Телефон *" required />
          <select v-model="form.direction">
            <option value="">Направление сотрудничества</option>
            <option v-for="dir in directions" :key="dir.id" :value="dir.title">{{ dir.title }}</option>
          </select>
          <textarea v-model="form.message" placeholder="Кратко опишите ваш запрос" rows="3"></textarea>
          <button type="submit" class="btn-red contact-form__btn">
            <span v-if="sent">✓ Заявка отправлена!</span>
            <span v-else>Отправить заявку</span>
          </button>
        </form>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'

const sent = ref(false)
const form = reactive({ name: '', company: '', phone: '', direction: '', message: '' })

function openForm(dir) {
  form.direction = dir.title
  document.querySelector('.contact-form')?.scrollIntoView({ behavior: 'smooth' })
}

function submitContact() {
  sent.value = true
  Object.assign(form, { name: '', company: '', phone: '', direction: '', message: '' })
  setTimeout(() => { sent.value = false }, 4000)
}

const numbers = [
  { value: '200+', label: 'клубов по всей России' },
  { value: '8', label: 'городов присутствия' },
  { value: '500 000+', label: 'активных участников' },
  { value: '17 лет', label: 'на рынке фитнеса' },
]

const directions = [
  {
    id: 1, title: 'Корпоративные продажи',
    image: 'https://picsum.photos/seed/corp-sales/600/300',
    desc: 'Оформите корпоративный абонемент для сотрудников вашей компании. Это инвестиция в здоровье команды и мощный инструмент нематериальной мотивации.',
    points: ['Специальные корпоративные тарифы', 'Оплата от юридического лица', 'Персональный менеджер', 'Отчётность по посещаемости'],
  },
  {
    id: 2, title: 'Субаренда и размещение бизнеса',
    image: 'https://picsum.photos/seed/subarent/600/300',
    desc: 'Разместите ваш бизнес внутри клуба Fitness House: массажный кабинет, салон красоты, аптека, кафе или спортивный магазин. Аудитория — сотни посетителей ежедневно.',
    points: ['Выгодные ставки аренды', 'Готовая целевая аудитория', 'Совместный маркетинг', 'Разные форматы площадей'],
  },
  {
    id: 3, title: 'Реклама в клубах',
    image: 'https://picsum.photos/seed/advert-club/600/300',
    desc: 'Рекламируйтесь там, где находится ваша целевая аудитория. Баннеры, экраны, брендирование раздевалок и зон отдыха — высокая частота контакта с живой аудиторией.',
    points: ['Размещение в 200+ клубах', 'Цифровые и статичные форматы', 'Таргетинг по городу или зоне', 'Замеры эффективности'],
  },
  {
    id: 4, title: 'Аренда тренажёрного зала',
    image: 'https://picsum.photos/seed/rent-gym/600/300',
    desc: 'Арендуйте зал или отдельные зоны клуба для корпоративных мероприятий, соревнований, фотосъёмок или групповых тренировок для вашей команды.',
    points: ['Залы от 60 м²', 'Почасовая или блочная аренда', 'Профессиональный инвентарь', 'Поддержка тренера по запросу'],
  },
  {
    id: 5, title: 'Предложить помещение',
    image: 'https://picsum.photos/seed/premises/600/300',
    desc: 'Если у вас есть подходящее помещение — мы рассмотрим его для открытия нового клуба Fitness House. Нам нужны площади от 1 000 м² в жилых и коммерческих кварталах.',
    points: ['От 1 000 м²', 'Любые города присутствия и новые', 'Долгосрочная аренда', 'Быстрый ответ на заявку'],
  },
]
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, var(--black) 0%, #0d1a2e 60%, var(--black) 100%);
  padding: 64px 0; position: relative; overflow: hidden;
}
.page-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(227,30,36,0.12) 0%, transparent 65%);
  pointer-events: none;
}
.page-hero__inner {
  display: grid; grid-template-columns: 1fr 480px; gap: 48px; align-items: center;
}
.page-hero__title {
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 96px); color: var(--white); line-height: 1;
  letter-spacing: 2px; margin-bottom: 16px;
}
.page-hero__sub { font-size: 18px; color: rgba(255,255,255,0.65); font-weight: 300; }
.page-hero__img img { width: 100%; border-radius: 12px; object-fit: cover; height: 280px; }

.directions-section { padding: 64px 0; }
.section-title {
  font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px);
  letter-spacing: 1px; color: var(--black); margin-bottom: 40px;
}
.directions-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px;
}
.dir-card {
  border-radius: 12px; overflow: hidden; box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition);
}
.dir-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.15); }
.dir-card__img { height: 180px; overflow: hidden; }
.dir-card__img img { width: 100%; height: 100%; object-fit: cover; }
.dir-card__body { padding: 20px 24px 24px; background: var(--white); }
.dir-card__title {
  font-family: var(--font-display); font-size: 20px; color: var(--black); margin-bottom: 10px;
}
.dir-card__desc { font-size: 13px; color: var(--text-light); line-height: 1.7; margin-bottom: 14px; }
.dir-card__points { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
.dir-card__points li {
  font-size: 12px; color: var(--text); padding-left: 14px; position: relative;
}
.dir-card__points li::before {
  content: ''; position: absolute; left: 0; top: 6px;
  width: 5px; height: 5px; background: var(--red); border-radius: 50%;
}

.partners-numbers {
  background: var(--red); padding: 48px 0;
}
.numbers-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center;
}
.number-item strong {
  display: block; font-family: var(--font-display); font-size: 52px;
  color: var(--white); line-height: 1; margin-bottom: 6px;
}
.number-item span { font-size: 14px; color: rgba(255,255,255,0.8); }

.contact-section {
  background: var(--dark); padding: 64px 0;
}
.contact-section__inner {
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;
}
.contact-section p { color: rgba(255,255,255,0.65); font-size: 15px; line-height: 1.7; margin-bottom: 24px; }
.contact-info { display: flex; flex-direction: column; gap: 10px; }
.contact-info a { font-size: 18px; font-weight: 700; color: var(--red); transition: color var(--transition); }
.contact-info a:hover { color: #ff3a40; }

.contact-form { display: flex; flex-direction: column; gap: 12px; }
.contact-form input,
.contact-form select,
.contact-form textarea {
  padding: 12px 16px; border-radius: var(--radius);
  border: 1.5px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.07); color: var(--white);
  font-size: 14px; font-family: var(--font-body);
  transition: border-color var(--transition); resize: vertical;
}
.contact-form input::placeholder,
.contact-form textarea::placeholder { color: rgba(255,255,255,0.4); }
.contact-form select { color: rgba(255,255,255,0.65); }
.contact-form select option { background: var(--dark); color: var(--white); }
.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus { border-color: var(--red); outline: none; }
.contact-form__btn { text-align: center; padding: 14px; font-size: 14px; }

@media (max-width: 900px) {
  .page-hero__inner { grid-template-columns: 1fr; }
  .page-hero__img { display: none; }
  .directions-grid { grid-template-columns: 1fr; }
  .numbers-grid { grid-template-columns: repeat(2, 1fr); }
  .contact-section__inner { grid-template-columns: 1fr; gap: 40px; }
}
@media (max-width: 480px) {
  .numbers-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
  .number-item strong { font-size: 36px; }
}
</style>
