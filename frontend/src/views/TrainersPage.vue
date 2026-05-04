<template>
  <main class="trainers-page">

    <section class="page-hero">
      <div class="container">
        <h1 class="page-hero__title fade-up">Тренеры</h1>
        <p class="page-hero__sub fade-up delay-1">Профессионалы, которые помогут вам достичь результата</p>
      </div>
    </section>

    <section class="trainers-section">
      <div class="container">
        <div class="spec-tabs">
          <button
            v-for="spec in specializations"
            :key="spec"
            :class="['spec-tab', { active: activeSpec === spec }]"
            @click="activeSpec = spec"
          >{{ spec }}</button>
        </div>

        <div class="trainers-grid">
          <article v-for="trainer in filteredTrainers" :key="trainer.id" class="trainer-card">
            <div class="trainer-card__photo-wrap">
              <img :src="trainer.photo" :alt="trainer.name" class="trainer-card__photo" loading="lazy" />
              <span class="trainer-card__exp-badge">{{ trainer.experience }} лет опыта</span>
            </div>
            <div class="trainer-card__body">
              <h3 class="trainer-card__name">{{ trainer.name }}</h3>
              <span class="trainer-card__spec">{{ trainer.specialty }}</span>
              <p class="trainer-card__bio">{{ trainer.bio }}</p>
              <div class="trainer-card__tags">
                <span v-for="tag in trainer.tags" :key="tag" class="trainer-tag">{{ tag }}</span>
              </div>
              <button class="btn-red trainer-card__btn" @click="$emit('open-tour')">Записаться</button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="trainer-cta">
      <div class="container trainer-cta__inner">
        <div>
          <h2>Не знаете, с чего начать?</h2>
          <p>Запишитесь на бесплатную консультацию — тренер подберёт программу под ваши цели</p>
        </div>
        <button class="btn-red" @click="$emit('open-tour')">Бесплатная консультация</button>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

defineEmits(['open-tour'])

const specializations = ['Все направления', 'Персональные тренировки', 'Групповые занятия', 'Плавание и аквааэробика', 'Детский фитнес', 'Единоборства']
const activeSpec = ref('Все направления')

const trainers = [
  {
    id: 1, name: 'Иван Петров',
    photo: 'https://randomuser.me/api/portraits/men/10.jpg',
    specialty: 'Персональные тренировки', experience: 9,
    bio: 'Мастер спорта по пауэрлифтингу. Специализируется на силовых тренировках и наборе мышечной массы. Разработает индивидуальный план питания и тренировок.',
    tags: ['Силовые', 'Пауэрлифтинг', 'Набор массы'],
    specGroup: 'Персональные тренировки',
  },
  {
    id: 2, name: 'Мария Соколова',
    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
    specialty: 'Йога и пилатес', experience: 7,
    bio: 'Сертифицированный инструктор по хатха-йоге и пилатесу. Помогает работать с осанкой, снять мышечное напряжение и повысить гибкость тела.',
    tags: ['Йога', 'Пилатес', 'Гибкость', 'Реабилитация'],
    specGroup: 'Групповые занятия',
  },
  {
    id: 3, name: 'Алексей Иванов',
    photo: 'https://randomuser.me/api/portraits/men/33.jpg',
    specialty: 'CrossFit и функциональный тренинг', experience: 6,
    bio: 'Участник CrossFit Open. Тренирует как новичков, так и профессиональных спортсменов. Делает акцент на правильной технике и профилактике травм.',
    tags: ['CrossFit', 'Функциональный', 'Кардио', 'Похудение'],
    specGroup: 'Персональные тренировки',
  },
  {
    id: 4, name: 'Елена Кузнецова',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    specialty: 'Групповые программы и танцы', experience: 11,
    bio: 'Хореограф и инструктор по зумбе, аэробике и стретчингу. Проводит занятия с 2015 года, постоянно осваивает новые направления.',
    tags: ['Зумба', 'Аэробика', 'Стретчинг', 'Танцы'],
    specGroup: 'Групповые занятия',
  },
  {
    id: 5, name: 'Дмитрий Волков',
    photo: 'https://randomuser.me/api/portraits/men/55.jpg',
    specialty: 'Единоборства и самооборона', experience: 8,
    bio: 'КМС по боксу, инструктор по самообороне. Тренирует детей и взрослых. Учит уверенности в себе через физическую и ментальную подготовку.',
    tags: ['Бокс', 'Самооборона', 'Единоборства'],
    specGroup: 'Единоборства',
  },
  {
    id: 6, name: 'Наталья Морозова',
    photo: 'https://randomuser.me/api/portraits/women/66.jpg',
    specialty: 'Плавание и аквааэробика', experience: 5,
    bio: 'Мастер спорта по синхронному плаванию. Проводит занятия по спортивному и оздоровительному плаванию для взрослых и детей от 3 лет.',
    tags: ['Плавание', 'Аквааэробика', 'Дети'],
    specGroup: 'Плавание и аквааэробика',
  },
  {
    id: 7, name: 'Сергей Лаптев',
    photo: 'https://randomuser.me/api/portraits/men/77.jpg',
    specialty: 'Персональные тренировки и похудение', experience: 10,
    bio: 'Эксперт по снижению веса. Использует научный подход: КБЖУ, периодизацию нагрузок, функциональные тренировки. Средний результат клиентов — −8 кг за 2 месяца.',
    tags: ['Похудение', 'Персональные', 'Питание', 'Кардио'],
    specGroup: 'Персональные тренировки',
  },
  {
    id: 8, name: 'Анастасия Белова',
    photo: 'https://randomuser.me/api/portraits/women/88.jpg',
    specialty: 'Детский фитнес и плавание', experience: 5,
    bio: 'Педагог-хореограф и инструктор детского фитнеса. Ведёт занятия ОФП, детской йогой и плаванием. Находит подход к каждому ребёнку.',
    tags: ['Дети', 'ОФП', 'Детская йога', 'Плавание'],
    specGroup: 'Детский фитнес',
  },
]

const filteredTrainers = computed(() =>
  activeSpec.value === 'Все направления'
    ? trainers
    : trainers.filter(t => t.specGroup === activeSpec.value)
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
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 96px); color: var(--white); line-height: 1;
  letter-spacing: 2px; margin-bottom: 12px;
}
.page-hero__sub { font-size: 18px; color: rgba(255,255,255,0.6); font-weight: 300; }

.trainers-section { padding: 56px 0; }

.spec-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
.spec-tab {
  padding: 8px 18px; border-radius: 100px;
  border: 1.5px solid var(--gray-mid);
  font-size: 13px; font-weight: 500; cursor: pointer;
  background: var(--white); color: var(--text); transition: all var(--transition);
}
.spec-tab:hover { border-color: var(--red); color: var(--red); }
.spec-tab.active { background: var(--red); color: var(--white); border-color: var(--red); }

.trainers-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;
}
.trainer-card {
  background: var(--white); border-radius: 12px; overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition);
}
.trainer-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.15); }

.trainer-card__photo-wrap { position: relative; height: 220px; overflow: hidden; }
.trainer-card__photo { width: 100%; height: 100%; object-fit: cover; object-position: top; }
.trainer-card__exp-badge {
  position: absolute; bottom: 12px; right: 12px;
  background: rgba(0,0,0,0.6); color: var(--white);
  font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 100px;
}

.trainer-card__body { padding: 20px 20px 24px; }
.trainer-card__name { font-family: var(--font-display); font-size: 22px; color: var(--black); margin-bottom: 4px; }
.trainer-card__spec {
  font-size: 12px; color: var(--red); font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 12px;
}
.trainer-card__bio { font-size: 13px; color: var(--text-light); line-height: 1.7; margin-bottom: 14px; }
.trainer-card__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
.trainer-tag { font-size: 11px; padding: 3px 10px; background: var(--gray); color: var(--text); border-radius: 100px; font-weight: 500; }
.trainer-card__btn { width: 100%; text-align: center; }

.trainer-cta { background: var(--red); padding: 48px 0; }
.trainer-cta__inner {
  display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
}
.trainer-cta__inner h2 { font-family: var(--font-display); font-size: 32px; color: var(--white); margin-bottom: 4px; }
.trainer-cta__inner p { color: rgba(255,255,255,0.85); font-size: 15px; }
.trainer-cta .btn-red { background: var(--white); color: var(--red); }
.trainer-cta .btn-red:hover { background: rgba(255,255,255,0.9); }

@media (max-width: 900px) {
  .trainers-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
  .trainer-cta__inner { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 480px) { .trainers-grid { grid-template-columns: 1fr; } }
</style>
