<template>
  <main class="schedule-page">

    <section class="page-hero">
      <div class="container">
        <h1 class="page-hero__title fade-up">Расписание</h1>
        <p class="page-hero__sub fade-up delay-1">Групповые занятия клуба Архангельск Московский</p>
      </div>
    </section>

    <section class="schedule-section">
      <div class="container">
        <div class="schedule-controls">
          <div class="day-tabs">
            <button
              v-for="(day, i) in days"
              :key="day"
              :class="['day-tab', { active: activeDay === i, today: i === todayIndex }]"
              @click="activeDay = i"
            >
              <span class="day-tab__short">{{ day.short }}</span>
              <span class="day-tab__full">{{ day.full }}</span>
              <span v-if="i === todayIndex" class="day-tab__today-dot"></span>
            </button>
          </div>

          <div class="legend">
            <span v-for="type in classTypes" :key="type.id" class="legend-item">
              <span class="legend-dot" :style="{ background: type.color }"></span>
              {{ type.label }}
            </span>
          </div>
        </div>

        <div v-if="daySchedule.length === 0" class="no-classes">
          <p>В этот день групповых занятий нет. Зал и бассейн работают в штатном режиме.</p>
        </div>
        <div v-else class="classes-list">
          <div
            v-for="cls in daySchedule"
            :key="cls.time + cls.name"
            class="class-item"
          >
            <div class="class-item__time">
              <strong>{{ cls.time }}</strong>
              <span>{{ cls.duration }} мин</span>
            </div>
            <div class="class-item__bar" :style="{ background: getTypeColor(cls.type) }"></div>
            <div class="class-item__info">
              <h4 class="class-item__name">{{ cls.name }}</h4>
              <p class="class-item__trainer">{{ cls.trainer }}</p>
            </div>
            <div class="class-item__hall">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>
              {{ cls.hall }}
            </div>
            <button class="class-item__book" @click="$emit('open-tour')">Записаться</button>
          </div>
        </div>
      </div>
    </section>

    <section class="schedule-note">
      <div class="container">
        <div class="note-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p>Расписание может меняться в праздничные дни. Актуальное расписание уточняйте у администраторов или по телефону <a href="tel:+78126100606">(812) 610-06-06</a>.</p>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

defineEmits(['open-tour'])

const days = [
  { short: 'Пн', full: 'Понедельник' },
  { short: 'Вт', full: 'Вторник' },
  { short: 'Ср', full: 'Среда' },
  { short: 'Чт', full: 'Четверг' },
  { short: 'Пт', full: 'Пятница' },
  { short: 'Сб', full: 'Суббота' },
  { short: 'Вс', full: 'Воскресенье' },
]

const todayIndex = computed(() => {
  const d = new Date().getDay()
  return d === 0 ? 6 : d - 1
})

const activeDay = ref(todayIndex.value)

const classTypes = [
  { id: 'yoga', label: 'Йога / Пилатес', color: '#48bb78' },
  { id: 'pool', label: 'Плавание / Аква', color: '#4299e1' },
  { id: 'dance', label: 'Танцы / Зумба', color: '#ed64a6' },
  { id: 'power', label: 'Силовые / CrossFit', color: '#ed8936' },
  { id: 'kids', label: 'Детские', color: '#9f7aea' },
]

function getTypeColor(type) {
  return classTypes.find(t => t.id === type)?.color || '#ccc'
}

const scheduleData = [
  // Пн (0)
  [
    { time: '07:00', name: 'Аквааэробика', trainer: 'Морозова Н.А.', hall: 'Бассейн', duration: 45, type: 'pool' },
    { time: '08:00', name: 'Хатха-Йога', trainer: 'Соколова М.В.', hall: 'Зал йоги', duration: 60, type: 'yoga' },
    { time: '10:00', name: 'Пилатес', trainer: 'Белова А.С.', hall: 'Зал 2', duration: 55, type: 'yoga' },
    { time: '12:00', name: 'Стретчинг', trainer: 'Соколова М.В.', hall: 'Зал 1', duration: 45, type: 'yoga' },
    { time: '17:00', name: 'Детское плавание', trainer: 'Морозова Н.А.', hall: 'Детский бассейн', duration: 45, type: 'kids' },
    { time: '18:00', name: 'CrossFit', trainer: 'Иванов А.О.', hall: 'Тренажёрный зал', duration: 60, type: 'power' },
    { time: '19:15', name: 'Зумба', trainer: 'Кузнецова Е.И.', hall: 'Зал 2', duration: 55, type: 'dance' },
    { time: '20:30', name: 'Вечерняя йога', trainer: 'Соколова М.В.', hall: 'Зал йоги', duration: 60, type: 'yoga' },
  ],
  // Вт (1)
  [
    { time: '07:30', name: 'Утренняя йога', trainer: 'Соколова М.В.', hall: 'Зал йоги', duration: 45, type: 'yoga' },
    { time: '09:00', name: 'Аквааэробика', trainer: 'Морозова Н.А.', hall: 'Бассейн', duration: 45, type: 'pool' },
    { time: '11:00', name: 'Фитнес-йога', trainer: 'Белова А.С.', hall: 'Зал 1', duration: 55, type: 'yoga' },
    { time: '13:00', name: 'Латиноамериканские танцы', trainer: 'Кузнецова Е.И.', hall: 'Зал 2', duration: 60, type: 'dance' },
    { time: '17:30', name: 'Детские единоборства', trainer: 'Волков Д.С.', hall: 'Зал 1', duration: 50, type: 'kids' },
    { time: '18:30', name: 'Функциональный тренинг', trainer: 'Иванов А.О.', hall: 'Тренажёрный зал', duration: 50, type: 'power' },
    { time: '20:00', name: 'Пилатес', trainer: 'Белова А.С.', hall: 'Зал йоги', duration: 55, type: 'yoga' },
  ],
  // Ср (2)
  [
    { time: '07:00', name: 'Силовая аэробика', trainer: 'Иванов А.О.', hall: 'Зал 1', duration: 55, type: 'power' },
    { time: '08:30', name: 'Аквааэробика', trainer: 'Морозова Н.А.', hall: 'Бассейн', duration: 45, type: 'pool' },
    { time: '10:30', name: 'Хатха-Йога', trainer: 'Соколова М.В.', hall: 'Зал йоги', duration: 60, type: 'yoga' },
    { time: '12:30', name: 'Стретчинг', trainer: 'Кузнецова Е.И.', hall: 'Зал 2', duration: 45, type: 'yoga' },
    { time: '16:30', name: 'Детская йога', trainer: 'Белова А.С.', hall: 'Зал йоги', duration: 45, type: 'kids' },
    { time: '18:00', name: 'Зумба', trainer: 'Кузнецова Е.И.', hall: 'Зал 2', duration: 55, type: 'dance' },
    { time: '19:15', name: 'CrossFit', trainer: 'Иванов А.О.', hall: 'Тренажёрный зал', duration: 60, type: 'power' },
    { time: '20:30', name: 'Вечерняя йога', trainer: 'Соколова М.В.', hall: 'Зал йоги', duration: 60, type: 'yoga' },
  ],
  // Чт (3)
  [
    { time: '07:30', name: 'Утренняя йога', trainer: 'Соколова М.В.', hall: 'Зал йоги', duration: 45, type: 'yoga' },
    { time: '09:00', name: 'Аквааэробика', trainer: 'Морозова Н.А.', hall: 'Бассейн', duration: 45, type: 'pool' },
    { time: '10:30', name: 'Пилатес', trainer: 'Белова А.С.', hall: 'Зал 2', duration: 55, type: 'yoga' },
    { time: '17:00', name: 'Детское плавание', trainer: 'Морозова Н.А.', hall: 'Детский бассейн', duration: 45, type: 'kids' },
    { time: '18:00', name: 'Бокс для начинающих', trainer: 'Волков Д.С.', hall: 'Зал 1', duration: 60, type: 'power' },
    { time: '19:15', name: 'Латиноамериканские танцы', trainer: 'Кузнецова Е.И.', hall: 'Зал 2', duration: 55, type: 'dance' },
    { time: '20:30', name: 'Йога для сна', trainer: 'Соколова М.В.', hall: 'Зал йоги', duration: 45, type: 'yoga' },
  ],
  // Пт (4)
  [
    { time: '07:00', name: 'CrossFit', trainer: 'Иванов А.О.', hall: 'Тренажёрный зал', duration: 60, type: 'power' },
    { time: '08:30', name: 'Аквааэробика', trainer: 'Морозова Н.А.', hall: 'Бассейн', duration: 45, type: 'pool' },
    { time: '10:00', name: 'Стретчинг', trainer: 'Белова А.С.', hall: 'Зал 1', duration: 45, type: 'yoga' },
    { time: '12:00', name: 'Зумба', trainer: 'Кузнецова Е.И.', hall: 'Зал 2', duration: 55, type: 'dance' },
    { time: '17:00', name: 'Детская ОФП', trainer: 'Белова А.С.', hall: 'Зал 1', duration: 50, type: 'kids' },
    { time: '18:00', name: 'Функциональный тренинг', trainer: 'Иванов А.О.', hall: 'Тренажёрный зал', duration: 55, type: 'power' },
    { time: '19:15', name: 'Пилатес', trainer: 'Соколова М.В.', hall: 'Зал йоги', duration: 55, type: 'yoga' },
    { time: '20:30', name: 'Хатха-Йога', trainer: 'Соколова М.В.', hall: 'Зал йоги', duration: 60, type: 'yoga' },
  ],
  // Сб (5)
  [
    { time: '09:00', name: 'Йога для всех', trainer: 'Соколова М.В.', hall: 'Зал йоги', duration: 75, type: 'yoga' },
    { time: '10:30', name: 'Аквааэробика', trainer: 'Морозова Н.А.', hall: 'Бассейн', duration: 45, type: 'pool' },
    { time: '12:00', name: 'CrossFit', trainer: 'Иванов А.О.', hall: 'Тренажёрный зал', duration: 60, type: 'power' },
    { time: '14:00', name: 'Зумба-Фитнес', trainer: 'Кузнецова Е.И.', hall: 'Зал 2', duration: 60, type: 'dance' },
    { time: '15:30', name: 'Детское плавание', trainer: 'Морозова Н.А.', hall: 'Детский бассейн', duration: 45, type: 'kids' },
    { time: '17:00', name: 'Бокс', trainer: 'Волков Д.С.', hall: 'Зал 1', duration: 60, type: 'power' },
    { time: '19:00', name: 'Вечерняя йога', trainer: 'Белова А.С.', hall: 'Зал йоги', duration: 60, type: 'yoga' },
  ],
  // Вс (6)
  [
    { time: '09:30', name: 'Утренняя йога', trainer: 'Соколова М.В.', hall: 'Зал йоги', duration: 60, type: 'yoga' },
    { time: '11:00', name: 'Аквааэробика', trainer: 'Морозова Н.А.', hall: 'Бассейн', duration: 45, type: 'pool' },
    { time: '12:30', name: 'Пилатес', trainer: 'Белова А.С.', hall: 'Зал 2', duration: 55, type: 'yoga' },
    { time: '14:00', name: 'Танцевальный микс', trainer: 'Кузнецова Е.И.', hall: 'Зал 2', duration: 60, type: 'dance' },
    { time: '16:00', name: 'Детская ОФП', trainer: 'Белова А.С.', hall: 'Зал 1', duration: 45, type: 'kids' },
    { time: '17:30', name: 'CrossFit', trainer: 'Иванов А.О.', hall: 'Тренажёрный зал', duration: 60, type: 'power' },
  ],
]

const daySchedule = computed(() => scheduleData[activeDay.value] || [])
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, var(--black) 0%, #1a0506 60%, var(--black) 100%);
  padding: 64px 0;
  position: relative;
  overflow: hidden;
}
.page-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(227,30,36,0.15) 0%, transparent 65%);
  pointer-events: none;
}
.page-hero__title {
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 96px);
  color: var(--white); line-height: 1;
  letter-spacing: 2px; margin-bottom: 12px;
}
.page-hero__sub { font-size: 18px; color: rgba(255,255,255,0.6); font-weight: 300; }

.schedule-section { padding: 56px 0; }

.schedule-controls { margin-bottom: 40px; }

.day-tabs {
  display: flex; gap: 4px; margin-bottom: 24px; overflow-x: auto; padding-bottom: 4px;
}
.day-tab {
  position: relative;
  display: flex; flex-direction: column; align-items: center;
  padding: 12px 20px; border-radius: var(--radius);
  border: 1.5px solid var(--gray-mid);
  font-size: 13px; cursor: pointer;
  background: var(--white); color: var(--text);
  transition: all var(--transition); white-space: nowrap; min-width: 80px;
}
.day-tab:hover { border-color: var(--red); color: var(--red); }
.day-tab.active { background: var(--red); color: var(--white); border-color: var(--red); }
.day-tab__short { font-weight: 700; font-size: 15px; }
.day-tab__full { font-size: 10px; opacity: 0.7; margin-top: 2px; }
.day-tab__today-dot {
  position: absolute; top: 6px; right: 8px;
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor; opacity: 0.8;
}
.day-tab.active .day-tab__today-dot { background: var(--white); }

.legend { display: flex; gap: 16px; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-light); }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

.no-classes {
  background: var(--gray); border-radius: 10px;
  padding: 40px; text-align: center;
  color: var(--text-light); font-size: 15px;
}

.classes-list { display: flex; flex-direction: column; gap: 8px; }
.class-item {
  display: grid;
  grid-template-columns: 90px 4px 1fr auto auto;
  align-items: center;
  gap: 16px;
  background: var(--white);
  border: 1px solid var(--gray-mid);
  border-radius: 10px; padding: 16px 20px;
  transition: box-shadow var(--transition), transform var(--transition);
}
.class-item:hover { box-shadow: var(--shadow); transform: translateX(2px); }

.class-item__time { text-align: right; }
.class-item__time strong { display: block; font-size: 18px; font-weight: 800; color: var(--black); }
.class-item__time span { font-size: 11px; color: var(--text-light); }

.class-item__bar { width: 4px; height: 40px; border-radius: 2px; flex-shrink: 0; }

.class-item__name {
  font-size: 15px; font-weight: 700; color: var(--black); margin-bottom: 3px;
}
.class-item__trainer { font-size: 12px; color: var(--text-light); }

.class-item__hall {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; color: var(--text-light); white-space: nowrap;
}
.class-item__hall svg { color: var(--red); flex-shrink: 0; }

.class-item__book {
  padding: 8px 16px; border-radius: var(--radius);
  border: 1.5px solid var(--red); color: var(--red);
  font-size: 12px; font-weight: 700; text-transform: uppercase;
  cursor: pointer; background: none; white-space: nowrap;
  transition: all var(--transition);
}
.class-item__book:hover { background: var(--red); color: var(--white); }

.schedule-note { padding: 0 0 48px; }
.note-box {
  display: flex; align-items: flex-start; gap: 12px;
  background: #fff8f0; border: 1px solid #fed7aa;
  border-left: 4px solid #ed8936;
  border-radius: 8px; padding: 16px 20px;
  font-size: 13px; color: var(--text); line-height: 1.6;
}
.note-box svg { color: #ed8936; flex-shrink: 0; margin-top: 2px; }
.note-box a { color: var(--red); font-weight: 600; }

@media (max-width: 900px) {
  .class-item {
    grid-template-columns: 80px 4px 1fr;
    grid-template-rows: auto auto;
  }
  .class-item__hall { grid-column: 3; grid-row: 2; }
  .class-item__book { display: none; }
}
@media (max-width: 480px) {
  .day-tab { min-width: 60px; padding: 10px 12px; }
  .day-tab__full { display: none; }
  .class-item { gap: 10px; padding: 12px 14px; }
}
</style>
