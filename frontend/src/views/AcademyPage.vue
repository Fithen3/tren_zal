<template>
  <main class="academy-page">

    <section class="page-hero">
      <div class="container page-hero__inner">
        <div class="fade-up">
          <span class="page-hero__label">Академия фитнеса Корус</span>
          <h1 class="page-hero__title">Стань профессиональным тренером</h1>
          <p class="page-hero__sub">Профессиональное образование в сфере фитнеса от практикующих экспертов Fitness House</p>
          <div class="page-hero__actions">
            <button class="btn-red" @click="$emit('open-tour')">Записаться на обучение</button>
            <a href="tel:+78126100606" class="hero-phone">(812) 610-06-06</a>
          </div>
        </div>
        <div class="page-hero__img fade-up delay-2">
          <img src="https://picsum.photos/seed/academy-hero/580/400" alt="Академия фитнеса" />
        </div>
      </div>
    </section>

    <section class="programs-section">
      <div class="container">
        <h2 class="section-title">Программы обучения</h2>
        <div class="programs-grid">
          <article v-for="prog in programs" :key="prog.id" class="prog-card">
            <div class="prog-card__img">
              <img :src="prog.image" :alt="prog.title" loading="lazy" />
              <div class="prog-card__duration">{{ prog.duration }}</div>
            </div>
            <div class="prog-card__body">
              <span class="prog-card__level">{{ prog.level }}</span>
              <h3 class="prog-card__title">{{ prog.title }}</h3>
              <p class="prog-card__desc">{{ prog.desc }}</p>
              <div class="prog-card__meta">
                <div class="prog-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {{ prog.hours }} учебных часов
                </div>
                <div class="prog-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  Группы до {{ prog.groupSize }} чел.
                </div>
              </div>
              <div class="prog-card__price">
                <span class="prog-price">{{ prog.price.toLocaleString('ru-RU') }} ₽</span>
                <span class="prog-price-label">за весь курс</span>
              </div>
              <button class="btn-red prog-card__btn" @click="$emit('open-tour')">Записаться</button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="academy-why">
      <div class="container">
        <h2 class="section-title">Почему Академия Корус</h2>
        <div class="why-grid">
          <div v-for="w in whys" :key="w.title" class="why-item">
            <div class="why-item__img">
              <img :src="w.image" :alt="w.title" loading="lazy" />
            </div>
            <h3>{{ w.title }}</h3>
            <p>{{ w.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="instructors-section">
      <div class="container">
        <h2 class="section-title">Преподаватели</h2>
        <div class="instructors-grid">
          <div v-for="inst in instructors" :key="inst.name" class="instructor-card">
            <img :src="inst.photo" :alt="inst.name" class="instructor-card__photo" />
            <h4 class="instructor-card__name">{{ inst.name }}</h4>
            <span class="instructor-card__role">{{ inst.role }}</span>
            <p class="instructor-card__bio">{{ inst.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="academy-cta">
      <div class="container academy-cta__inner">
        <div>
          <h2>Получите диплом и начните карьеру в фитнесе</h2>
          <p>Лучших выпускников приглашаем на работу в клубы Fitness House</p>
        </div>
        <button class="btn-red" @click="$emit('open-tour')">Записаться на обучение</button>
      </div>
    </section>

  </main>
</template>

<script setup>
defineEmits(['open-tour'])

const programs = [
  {
    id: 1, title: 'Тренер тренажёрного зала',
    level: 'Базовый уровень', duration: '2 месяца',
    hours: 128, groupSize: 12,
    price: 42000,
    image: 'https://picsum.photos/seed/acad-gym/600/280',
    desc: 'Полный курс подготовки тренера: анатомия, физиология, биомеханика, составление программ тренировок, работа с клиентами разного уровня. Стажировка в клубе Fitness House.',
  },
  {
    id: 2, title: 'Инструктор групповых занятий',
    level: 'Базовый уровень', duration: '1,5 месяца',
    hours: 96, groupSize: 15,
    price: 36000,
    image: 'https://picsum.photos/seed/acad-group/600/280',
    desc: 'Обучение ведению групповых занятий: аэробика, зумба, пилатес, стретчинг. Хореография, работа с музыкой, методика обучения групп. Практические занятия в зале.',
  },
  {
    id: 3, title: 'Тренер по плаванию',
    level: 'Специализация', duration: '2,5 месяца',
    hours: 160, groupSize: 8,
    price: 52000,
    image: 'https://picsum.photos/seed/acad-swim/600/280',
    desc: 'Комплексная подготовка тренера по плаванию: техника стилей, методика обучения детей и взрослых, аквааэробика, безопасность в воде. Практика в бассейне клуба.',
  },
  {
    id: 4, title: 'Инструктор по йоге и пилатесу',
    level: 'Специализация', duration: '3 месяца',
    hours: 200, groupSize: 10,
    price: 58000,
    image: 'https://picsum.photos/seed/acad-yoga/600/280',
    desc: 'Углублённая программа по йоге и пилатесу: философия, анатомия, корректировка поз, работа с начинающими и продвинутыми. Международная сертификация.',
  },
]

const whys = [
  { title: 'Практика с первого дня', desc: 'Треть программы — практические занятия в настоящем клубе с реальными клиентами под руководством наставника.', image: 'https://picsum.photos/seed/why-practice/400/220' },
  { title: 'Дипломы и сертификаты', desc: 'Выдаём дипломы государственного образца и международные сертификаты, признаваемые работодателями в сфере фитнеса.', image: 'https://picsum.photos/seed/why-cert/400/220' },
  { title: 'Трудоустройство', desc: 'Лучших выпускников рекомендуем на открытые вакансии в клубах Fitness House. 70% выпускников трудоустраиваются в течение месяца.', image: 'https://picsum.photos/seed/why-job/400/220' },
  { title: 'Гибкий формат', desc: 'Очные занятия по вечерам и выходным — можно совмещать с работой. Часть теории — в онлайн-формате.', image: 'https://picsum.photos/seed/why-flex/400/220' },
]

const instructors = [
  { name: 'Андрей Смирнов', role: 'Старший преподаватель', bio: 'Мастер спорта по пауэрлифтингу, 12 лет тренерской практики. Ведёт курс подготовки тренеров зала.', photo: 'https://randomuser.me/api/portraits/men/14.jpg' },
  { name: 'Ирина Фёдорова', role: 'Преподаватель групповых программ', bio: 'Международный сертификат Les Mills, 9 лет в фитнес-индустрии. Ведёт курс по групповым занятиям.', photo: 'https://randomuser.me/api/portraits/women/32.jpg' },
  { name: 'Виктор Козлов', role: 'Преподаватель плавания', bio: 'КМС по плаванию, педагог со стажем 11 лет. Ведёт курс подготовки тренеров по плаванию.', photo: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { name: 'Светлана Попова', role: 'Преподаватель йоги', bio: '500 часов RYT, сертифицированный инструктор по хатха и виньяса йоге. 8 лет практики и преподавания.', photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
]
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, var(--black) 0%, #0a1a2e 60%, var(--black) 100%);
  padding: 64px 0; position: relative; overflow: hidden;
}
.page-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(227,30,36,0.12) 0%, transparent 65%);
  pointer-events: none;
}
.page-hero__inner {
  display: grid; grid-template-columns: 1fr 500px; gap: 48px; align-items: center;
}
.page-hero__label {
  display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: var(--red); margin-bottom: 12px;
}
.page-hero__title {
  font-family: var(--font-display);
  font-size: clamp(40px, 5vw, 72px); color: var(--white); line-height: 1.05;
  letter-spacing: 1px; margin-bottom: 16px;
}
.page-hero__sub { font-size: 17px; color: rgba(255,255,255,0.65); font-weight: 300; margin-bottom: 28px; line-height: 1.6; }
.page-hero__actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.hero-phone { font-size: 16px; font-weight: 700; color: rgba(255,255,255,0.7); transition: color var(--transition); }
.hero-phone:hover { color: var(--white); }
.page-hero__img img { width: 100%; border-radius: 12px; object-fit: cover; height: 320px; }

.programs-section { padding: 64px 0; }
.section-title {
  font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px);
  letter-spacing: 1px; color: var(--black); margin-bottom: 40px;
}
.programs-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;
}
.prog-card {
  border-radius: 12px; overflow: hidden; box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition);
}
.prog-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.15); }
.prog-card__img { position: relative; height: 180px; overflow: hidden; }
.prog-card__img img { width: 100%; height: 100%; object-fit: cover; }
.prog-card__duration {
  position: absolute; bottom: 12px; left: 12px;
  background: rgba(0,0,0,0.65); color: var(--white);
  font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 100px;
}
.prog-card__body { padding: 20px 20px 24px; background: var(--white); }
.prog-card__level {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1px; color: var(--red); display: block; margin-bottom: 6px;
}
.prog-card__title { font-family: var(--font-display); font-size: 20px; color: var(--black); margin-bottom: 10px; }
.prog-card__desc { font-size: 13px; color: var(--text-light); line-height: 1.7; margin-bottom: 16px; }
.prog-card__meta { display: flex; gap: 16px; margin-bottom: 16px; }
.prog-meta-item {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; color: var(--text-light);
}
.prog-meta-item svg { color: var(--red); flex-shrink: 0; }
.prog-card__price { display: flex; align-items: baseline; gap: 6px; margin-bottom: 18px; }
.prog-price { font-family: var(--font-display); font-size: 28px; color: var(--black); }
.prog-price-label { font-size: 13px; color: var(--text-light); }
.prog-card__btn { width: 100%; text-align: center; }

.academy-why { padding: 64px 0; background: var(--gray); }
.why-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
.why-item {
  background: var(--white); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow);
}
.why-item__img { height: 150px; overflow: hidden; }
.why-item__img img { width: 100%; height: 100%; object-fit: cover; }
.why-item h3 { font-size: 16px; font-weight: 700; padding: 16px 18px 6px; }
.why-item p { font-size: 13px; color: var(--text-light); padding: 0 18px 18px; line-height: 1.6; }

.instructors-section { padding: 64px 0; }
.instructors-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 24px;
}
.instructor-card { text-align: center; }
.instructor-card__photo {
  width: 120px; height: 120px; border-radius: 50%; object-fit: cover;
  margin: 0 auto 14px; border: 3px solid var(--red);
}
.instructor-card__name { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
.instructor-card__role {
  font-size: 12px; color: var(--red); font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 10px;
}
.instructor-card__bio { font-size: 13px; color: var(--text-light); line-height: 1.6; }

.academy-cta { background: var(--red); padding: 56px 0; }
.academy-cta__inner {
  display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
}
.academy-cta__inner h2 {
  font-family: var(--font-display); font-size: 32px; color: var(--white); margin-bottom: 4px;
}
.academy-cta__inner p { color: rgba(255,255,255,0.85); font-size: 15px; }
.academy-cta .btn-red { background: var(--white); color: var(--red); }
.academy-cta .btn-red:hover { background: rgba(255,255,255,0.9); }

@media (max-width: 900px) {
  .page-hero__inner { grid-template-columns: 1fr; }
  .page-hero__img { display: none; }
  .programs-grid { grid-template-columns: 1fr; }
  .academy-cta__inner { flex-direction: column; align-items: flex-start; }
}
</style>
