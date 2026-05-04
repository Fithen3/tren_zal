<template>
  <main class="careers-page">

    <section class="page-hero">
      <div class="container">
        <h1 class="page-hero__title fade-up">Вакансии</h1>
        <p class="page-hero__sub fade-up delay-1">Присоединяйтесь к команде Fitness House — мы строим лучшие клубы России</p>
      </div>
    </section>

    <section class="careers-values">
      <div class="container">
        <div class="values-grid">
          <div v-for="v in values" :key="v.title" class="value-item">
            <span class="value-item__icon">{{ v.icon }}</span>
            <strong>{{ v.title }}</strong>
            <p>{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="vacancies-section">
      <div class="container">
        <h2 class="section-title">Открытые вакансии</h2>

        <div class="city-tabs">
          <button
            v-for="city in cities"
            :key="city"
            :class="['city-tab', { active: activeCity === city }]"
            @click="activeCity = city"
          >{{ city }}</button>
        </div>

        <div class="vacancies-list">
          <article v-for="job in filteredJobs" :key="job.id" class="vacancy-card">
            <div class="vacancy-card__header" @click="job.expanded = !job.expanded">
              <div class="vacancy-card__main">
                <div class="vacancy-card__icon">{{ job.icon }}</div>
                <div>
                  <h3 class="vacancy-card__title">{{ job.title }}</h3>
                  <div class="vacancy-card__meta">
                    <span class="meta-tag city">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {{ job.city }}
                    </span>
                    <span class="meta-tag type">{{ job.type }}</span>
                    <span class="meta-tag salary">{{ job.salary }}</span>
                  </div>
                </div>
              </div>
              <div class="vacancy-card__toggle" :class="{ open: job.expanded }">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <div v-show="job.expanded" class="vacancy-card__body">
              <div class="vacancy-desc">
                <div class="vacancy-block">
                  <h4>О вакансии</h4>
                  <p>{{ job.description }}</p>
                </div>
                <div class="vacancy-block">
                  <h4>Требования</h4>
                  <ul>
                    <li v-for="r in job.requirements" :key="r">{{ r }}</li>
                  </ul>
                </div>
                <div class="vacancy-block">
                  <h4>Мы предлагаем</h4>
                  <ul>
                    <li v-for="b in job.benefits" :key="b">{{ b }}</li>
                  </ul>
                </div>
              </div>
              <button class="btn-red vacancy-card__apply" @click="openApply(job)">Откликнуться</button>
            </div>
          </article>
        </div>

        <div v-if="filteredJobs.length === 0" class="no-vacancies">
          Вакансий в этом городе пока нет. Следите за обновлениями!
        </div>
      </div>
    </section>

    <!-- Apply Modal -->
    <Teleport to="body">
      <div v-if="applyModal" class="modal-overlay" @click.self="applyModal = null">
        <div class="modal-box apply-modal">
          <button class="modal-close" @click="applyModal = null">✕</button>
          <h2 class="apply-modal__title">Откликнуться</h2>
          <p class="apply-modal__job">{{ applyModal.title }} — {{ applyModal.city }}</p>
          <form @submit.prevent="submitApply" class="apply-form">
            <div class="apply-form__field">
              <input v-model="applyForm.name" type="text" placeholder="Ваше имя *" required />
            </div>
            <div class="apply-form__field">
              <input v-model="applyForm.phone" type="tel" placeholder="Телефон *" required />
            </div>
            <div class="apply-form__field">
              <input v-model="applyForm.email" type="email" placeholder="Email" />
            </div>
            <div class="apply-form__field">
              <textarea v-model="applyForm.message" placeholder="Коротко о себе" rows="4"></textarea>
            </div>
            <p class="apply-form__legal">
              Нажимая «Отправить», вы соглашаетесь на обработку персональных данных
            </p>
            <button type="submit" class="btn-red apply-form__btn">
              <span v-if="applySuccess">✓ Отклик отправлен!</span>
              <span v-else>Отправить отклик</span>
            </button>
          </form>
        </div>
      </div>
    </Teleport>

  </main>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const cities = ['Все города', 'Архангельск', 'Санкт-Петербург', 'Казань', 'Екатеринбург']
const activeCity = ref('Все города')
const applyModal = ref(null)
const applySuccess = ref(false)
const applyForm = reactive({ name: '', phone: '', email: '', message: '' })

function openApply(job) {
  applyModal.value = job
  applySuccess.value = false
  Object.assign(applyForm, { name: '', phone: '', email: '', message: '' })
}

function submitApply() {
  applySuccess.value = true
  setTimeout(() => { applyModal.value = null }, 2000)
}

const values = [
  { icon: '🏅', title: 'Профессиональный рост', desc: 'Обучение, сертификации и повышение квалификации за счёт компании' },
  { icon: '🎽', title: 'Бесплатный фитнес', desc: 'Доступ ко всем зонам клуба бесплатно для всех сотрудников' },
  { icon: '🤝', title: 'Команда профессионалов', desc: 'Работайте рядом с лучшими специалистами фитнес-индустрии' },
  { icon: '💰', title: 'Конкурентная зарплата', desc: 'Достойное вознаграждение и прозрачная система бонусов' },
]

const jobs = ref([
  {
    id: 1, city: 'Архангельск', type: 'Полная занятость',
    icon: '🏋️', salary: '45 000 – 70 000 ₽',
    title: 'Тренер тренажёрного зала',
    description: 'Проводим набор тренеров для работы в тренажёрном зале клуба «Архангельск Московский». Занимаетесь ведением и сопровождением клиентов, составляете программы тренировок, следите за техникой безопасности.',
    requirements: ['Профильное образование (физическая культура и спорт)', 'Опыт работы тренером от 1 года', 'Умение работать с клиентами разного уровня подготовки', 'Доброжелательность и коммуникабельность'],
    benefits: ['Зарплата: ставка + % с продаж', 'График 5/2 или 2/2', 'Корпоративный абонемент в клуб', 'Обучение за счёт компании', 'Карьерный рост до старшего тренера'],
    expanded: false,
  },
  {
    id: 2, city: 'Архангельск', type: 'Частичная занятость',
    icon: '🧘', salary: '30 000 – 50 000 ₽',
    title: 'Инструктор групповых занятий',
    description: 'Приглашаем инструкторов по йоге, пилатесу, зумбе, аэробике и другим направлениям. Проводите групповые занятия по утверждённому расписанию, развивайте свои программы.',
    requirements: ['Сертификат инструктора по профильному направлению', 'Опыт проведения групповых занятий', 'Высокая энергетика и умение работать с аудиторией', 'Желательно: опыт разработки авторских программ'],
    benefits: ['Оплата почасово или за занятие', 'Гибкий график', 'Свободный зал для собственных тренировок', 'Возможность ведения нескольких направлений'],
    expanded: false,
  },
  {
    id: 3, city: 'Архангельск', type: 'Полная занятость',
    icon: '💼', salary: '40 000 – 65 000 ₽',
    title: 'Менеджер по продажам абонементов',
    description: 'Ищем менеджера отдела продаж. Вы будете консультировать клиентов, оформлять абонементы, работать с CRM, звонить по тёплой базе и участвовать в акциях клуба.',
    requirements: ['Опыт в продажах или работе с клиентами от 6 месяцев', 'Грамотная речь, умение убеждать', 'Работа с CRM и базовые навыки ПК', 'Целеустремлённость и ориентация на результат'],
    benefits: ['Оклад + % с продаж (без потолка)', 'График 5/2 (возможен 2/2)', 'Бесплатный клубный абонемент', 'Обучение продажам и продукту', 'KPI-бонусы и конкурсы среди менеджеров'],
    expanded: false,
  },
  {
    id: 4, city: 'Санкт-Петербург', type: 'Полная занятость',
    icon: '🏊', salary: '40 000 – 60 000 ₽',
    title: 'Тренер по плаванию (взрослые и дети)',
    description: 'Для клубов Санкт-Петербурга требуется тренер по плаванию. Ведёте индивидуальные и групповые занятия, занятия по аквааэробике. Работа с детьми от 3 лет и взрослыми любого уровня.',
    requirements: ['Образование в области физической культуры или плавания', 'Опыт работы тренером по плаванию от 1 года', 'Знание методик обучения плаванию детей', 'Наличие медицинской книжки'],
    benefits: ['Стабильный оклад', 'График на выбор', 'Бесплатный абонемент в клуб', 'Дружная команда инструкторов'],
    expanded: false,
  },
  {
    id: 5, city: 'Санкт-Петербург', type: 'Полная занятость',
    icon: '🖥️', salary: '35 000 – 50 000 ₽',
    title: 'Администратор рецепции',
    description: 'Встречаем посетителей клуба, обрабатываем заявки, работаем с расписанием и входящими запросами. Вы — лицо клуба и первый контакт клиента с Fitness House.',
    requirements: ['Опыт работы на рецепции или в сервисе от 6 месяцев', 'Грамотная речь и приятный внешний вид', 'Уверенный пользователь ПК', 'Стрессоустойчивость и внимательность'],
    benefits: ['График 2/2, смены 12 часов', 'Оклад + надбавки', 'Клубный абонемент бесплатно', 'Обучение на рабочем месте'],
    expanded: false,
  },
  {
    id: 6, city: 'Казань', type: 'Полная занятость',
    icon: '🥊', salary: '45 000 – 65 000 ₽',
    title: 'Тренер по единоборствам и самообороне',
    description: 'Клуб «Казань Победы» ищет тренера по боксу, ММА или самообороне. Ведёте групповые занятия и персональные тренировки. Будем рады специалистам с педагогическим подходом.',
    requirements: ['КМС или выше по боевым видам спорта', 'Опыт тренерской работы от 2 лет', 'Работа с детьми и взрослыми', 'Умение структурировать учебный процесс'],
    benefits: ['Оклад + оплата персональных тренировок', 'График 5/2', 'Бесплатный клубный абонемент', 'Возможность развивать авторскую программу'],
    expanded: false,
  },
])

const filteredJobs = computed(() =>
  activeCity.value === 'Все города'
    ? jobs.value
    : jobs.value.filter(j => j.city === activeCity.value)
)
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, var(--black) 0%, #1a0506 60%, var(--black) 100%);
  padding: 64px 0; position: relative; overflow: hidden;
}
.page-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(227,30,36,0.15) 0%, transparent 65%);
  pointer-events: none;
}
.page-hero__title {
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 96px);
  color: var(--white); line-height: 1; letter-spacing: 2px; margin-bottom: 12px;
}
.page-hero__sub { font-size: 18px; color: rgba(255,255,255,0.6); font-weight: 300; }

.careers-values { padding: 56px 0 40px; background: var(--gray); }
.values-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;
}
.value-item {
  background: var(--white); border-radius: 10px; padding: 24px;
  border-top: 3px solid var(--red);
}
.value-item__icon { font-size: 28px; display: block; margin-bottom: 10px; }
.value-item strong { font-size: 15px; color: var(--black); display: block; margin-bottom: 6px; }
.value-item p { font-size: 13px; color: var(--text-light); line-height: 1.6; }

.vacancies-section { padding: 56px 0; }
.section-title { font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px); letter-spacing: 1px; color: var(--black); margin-bottom: 24px; }

.city-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
.city-tab {
  padding: 8px 18px; border-radius: 100px;
  border: 1.5px solid var(--gray-mid);
  font-size: 13px; font-weight: 500; cursor: pointer;
  background: var(--white); color: var(--text); transition: all var(--transition);
}
.city-tab:hover { border-color: var(--red); color: var(--red); }
.city-tab.active { background: var(--red); color: var(--white); border-color: var(--red); }

.vacancies-list { display: flex; flex-direction: column; gap: 12px; }

.vacancy-card {
  border: 1.5px solid var(--gray-mid); border-radius: 12px; overflow: hidden;
  transition: border-color var(--transition), box-shadow var(--transition);
}
.vacancy-card:hover { border-color: var(--red); box-shadow: var(--shadow); }

.vacancy-card__header {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 20px 24px; cursor: pointer;
}
.vacancy-card__main { display: flex; align-items: center; gap: 16px; flex: 1; }
.vacancy-card__icon { font-size: 32px; flex-shrink: 0; }
.vacancy-card__title { font-size: 17px; font-weight: 700; color: var(--black); margin-bottom: 8px; }
.vacancy-card__meta { display: flex; gap: 8px; flex-wrap: wrap; }
.meta-tag {
  display: flex; align-items: center; gap: 4px;
  font-size: 12px; padding: 3px 10px; border-radius: 100px; font-weight: 500;
}
.meta-tag.city { background: #fff0f0; color: var(--red); }
.meta-tag.type { background: var(--gray); color: var(--text-light); }
.meta-tag.salary { background: #f0fff4; color: #276749; font-weight: 700; }

.vacancy-card__toggle {
  width: 32px; height: 32px; border-radius: 50%;
  border: 1.5px solid var(--gray-mid);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: all var(--transition);
}
.vacancy-card__toggle.open { background: var(--red); border-color: var(--red); }
.vacancy-card__toggle.open svg { stroke: var(--white); transform: rotate(180deg); }
.vacancy-card__toggle svg { transition: transform var(--transition); }

.vacancy-card__body {
  padding: 0 24px 24px;
  border-top: 1px solid var(--gray-mid);
  padding-top: 20px;
}
.vacancy-desc {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;
  margin-bottom: 24px;
}
.vacancy-block h4 {
  font-size: 13px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.5px; color: var(--text-light); margin-bottom: 10px;
}
.vacancy-block p { font-size: 14px; color: var(--text); line-height: 1.7; }
.vacancy-block ul { display: flex; flex-direction: column; gap: 6px; }
.vacancy-block li {
  font-size: 13px; color: var(--text); line-height: 1.5;
  padding-left: 14px; position: relative;
}
.vacancy-block li::before {
  content: ''; position: absolute; left: 0; top: 7px;
  width: 5px; height: 5px; background: var(--red); border-radius: 50%;
}

.vacancy-card__apply { font-size: 13px; }

.no-vacancies {
  background: var(--gray); border-radius: 10px;
  padding: 40px; text-align: center;
  color: var(--text-light); font-size: 15px;
}

.apply-modal { max-width: 520px; }
.apply-modal__title {
  font-family: var(--font-display); font-size: 28px;
  color: var(--black); margin-bottom: 4px;
}
.apply-modal__job {
  font-size: 13px; color: var(--red); font-weight: 600;
  margin-bottom: 24px;
}
.apply-form { display: flex; flex-direction: column; gap: 12px; }
.apply-form__field input,
.apply-form__field textarea {
  width: 100%; padding: 12px 16px;
  border: 1.5px solid var(--gray-mid); border-radius: var(--radius);
  font-size: 14px; color: var(--text); background: var(--white);
  transition: border-color var(--transition); resize: vertical;
}
.apply-form__field input:focus,
.apply-form__field textarea:focus { border-color: var(--red); outline: none; }
.apply-form__legal {
  font-size: 11px; color: var(--text-light); line-height: 1.5;
}
.apply-form__btn { text-align: center; padding: 14px; }

@media (max-width: 900px) {
  .vacancy-desc { grid-template-columns: 1fr; }
  .vacancy-card__header { flex-wrap: wrap; }
}
@media (max-width: 480px) {
  .vacancy-card__header { padding: 16px; }
  .vacancy-card__body { padding: 16px; }
}
</style>
