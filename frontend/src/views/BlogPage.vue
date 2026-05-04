<template>
  <main class="blog-page">

    <section class="page-hero">
      <div class="container">
        <h1 class="page-hero__title fade-up">Блог</h1>
        <p class="page-hero__sub fade-up delay-1">Полезные статьи о тренировках, питании и здоровом образе жизни</p>
      </div>
    </section>

    <section class="blog-section">
      <div class="container">
        <div class="cat-tabs">
          <button
            v-for="cat in categories"
            :key="cat"
            :class="['cat-tab', { active: activeCategory === cat }]"
            @click="activeCategory = cat"
          >{{ cat }}</button>
        </div>

        <div v-if="featured && activeCategory === 'Все статьи'" class="featured-article">
          <div class="featured-article__img">
            <img :src="featured.image" :alt="featured.title" loading="lazy" />
          </div>
          <div class="featured-article__content">
            <span class="article-category">{{ featured.category }}</span>
            <h2 class="featured-article__title">{{ featured.title }}</h2>
            <p class="featured-article__excerpt">{{ featured.excerpt }}</p>
            <div class="featured-article__meta">
              <time>{{ featured.date }}</time>
              <span class="read-time">{{ featured.readTime }} мин чтения</span>
            </div>
          </div>
        </div>

        <div class="articles-grid">
          <article v-for="article in filteredArticles" :key="article.id" class="article-card">
            <div class="article-card__img">
              <img :src="article.image" :alt="article.title" loading="lazy" />
            </div>
            <div class="article-card__body">
              <span class="article-category">{{ article.category }}</span>
              <h3 class="article-card__title">{{ article.title }}</h3>
              <p class="article-card__excerpt">{{ article.excerpt }}</p>
              <div class="article-card__footer">
                <div class="article-card__meta">
                  <time>{{ article.date }}</time>
                  <span class="read-time">{{ article.readTime }} мин</span>
                </div>
                <a href="#" class="article-read-more">Читать →</a>
              </div>
            </div>
          </article>
        </div>

        <div v-if="filteredArticles.length === 0" class="no-articles">
          Статей в этой категории пока нет. Загляните позже!
        </div>
      </div>
    </section>

    <section class="blog-newsletter">
      <div class="container blog-newsletter__inner">
        <div>
          <h2>Подпишитесь на блог</h2>
          <p>Раз в неделю — лучшие материалы о фитнесе, питании и здоровье</p>
        </div>
        <form class="blog-newsletter__form" @submit.prevent="subscribeNews">
          <input v-model="email" type="email" placeholder="Ваш email" required />
          <button type="submit" class="btn-red">
            <span v-if="subscribed">✓ Подписаны!</span>
            <span v-else>Подписаться</span>
          </button>
        </form>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = ['Все статьи', 'Фитнес', 'Питание', 'Здоровье', 'Дети', 'Плавание']
const activeCategory = ref('Все статьи')
const email = ref('')
const subscribed = ref(false)

function subscribeNews() {
  subscribed.value = true
  email.value = ''
  setTimeout(() => { subscribed.value = false }, 4000)
}

const articles = [
  {
    id: 1, category: 'Фитнес',
    image: 'https://picsum.photos/seed/blog-return/800/400',
    title: 'Как правильно начать тренировки после долгого перерыва',
    excerpt: 'Возвращение к тренировкам после паузы требует постепенного подхода. Рассказываем, как избежать травм и сохранить мотивацию в первые недели.',
    date: '18 апреля 2026', readTime: 5, featured: true,
  },
  {
    id: 2, category: 'Питание',
    image: 'https://picsum.photos/seed/blog-nutrition/800/400',
    title: 'Питание до и после тренировки: что важно знать',
    excerpt: 'Правильный рацион напрямую влияет на результат. Разбираемся, что есть за 1–2 часа до занятия и как восстановить силы после нагрузки.',
    date: '10 апреля 2026', readTime: 6, featured: false,
  },
  {
    id: 3, category: 'Плавание',
    image: 'https://picsum.photos/seed/blog-swim/800/400',
    title: 'Польза плавания для здоровья позвоночника',
    excerpt: 'Плавание — одна из немногих активностей, которая одновременно укрепляет мышцы и снимает нагрузку с позвоночника. Объясняем механику и пользу.',
    date: '2 апреля 2026', readTime: 4, featured: false,
  },
  {
    id: 4, category: 'Фитнес',
    image: 'https://picsum.photos/seed/blog-group/800/400',
    title: 'Групповые занятия vs персональные тренировки: что выбрать?',
    excerpt: 'У каждого формата есть свои преимущества. Поможем разобраться, что подойдёт именно вам, исходя из ваших целей и уровня подготовки.',
    date: '25 марта 2026', readTime: 5, featured: false,
  },
  {
    id: 5, category: 'Здоровье',
    image: 'https://picsum.photos/seed/blog-meditate/800/400',
    title: 'Медитация как инструмент восстановления после тренировки',
    excerpt: 'Спокойный ум — ключ к быстрому физическому восстановлению. Рассматриваем, как практика осознанности помогает спортсменам и любителям.',
    date: '15 марта 2026', readTime: 7, featured: false,
  },
  {
    id: 6, category: 'Дети',
    image: 'https://picsum.photos/seed/blog-kids/800/400',
    title: 'Детский фитнес: почему важно начинать с раннего возраста',
    excerpt: 'Занятия спортом в детстве формируют правильную осанку, укрепляют иммунитет и прививают здоровые привычки на всю жизнь. Советы родителям.',
    date: '5 марта 2026', readTime: 5, featured: false,
  },
  {
    id: 7, category: 'Питание',
    image: 'https://picsum.photos/seed/blog-calories/800/400',
    title: 'КБЖУ для новичка: как не запутаться в калориях',
    excerpt: 'Считать калории сложно только поначалу. Простое руководство по базовым принципам питания для тех, кто хочет похудеть или набрать массу.',
    date: '22 февраля 2026', readTime: 6, featured: false,
  },
  {
    id: 8, category: 'Здоровье',
    image: 'https://picsum.photos/seed/blog-spa/800/400',
    title: 'СПА-зона после тренировки: правила безопасного восстановления',
    excerpt: 'Сауна и хаммам ускоряют восстановление мышц, но важно знать правила. Рассказываем, через сколько времени после нагрузки можно идти в парную.',
    date: '10 февраля 2026', readTime: 4, featured: false,
  },
  {
    id: 9, category: 'Фитнес',
    image: 'https://picsum.photos/seed/blog-breath/800/400',
    title: 'Как правильно дышать во время силовых упражнений',
    excerpt: 'Неправильное дыхание — одна из самых частых ошибок новичков в тренажёрном зале. Разбираем технику дыхания для разных типов упражнений.',
    date: '28 января 2026', readTime: 4, featured: false,
  },
]

const featured = computed(() => articles.find(a => a.featured))

const filteredArticles = computed(() => {
  if (activeCategory.value === 'Все статьи') return articles.filter(a => !a.featured)
  return articles.filter(a => a.category === activeCategory.value)
})
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

.blog-section { padding: 56px 0; }

.cat-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
.cat-tab {
  padding: 8px 18px; border-radius: 100px; border: 1.5px solid var(--gray-mid);
  font-size: 13px; font-weight: 500; cursor: pointer; background: var(--white); color: var(--text);
  transition: all var(--transition);
}
.cat-tab:hover { border-color: var(--red); color: var(--red); }
.cat-tab.active { background: var(--red); color: var(--white); border-color: var(--red); }

.featured-article {
  display: grid; grid-template-columns: 460px 1fr;
  border-radius: 16px; overflow: hidden; box-shadow: var(--shadow);
  margin-bottom: 48px; min-height: 300px;
}
.featured-article__img { overflow: hidden; }
.featured-article__img img { width: 100%; height: 100%; object-fit: cover; }
.featured-article__content {
  padding: 36px 40px; background: var(--white);
  display: flex; flex-direction: column; justify-content: center;
}
.article-category {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1px; color: var(--red); display: block; margin-bottom: 10px;
}
.featured-article__title {
  font-family: var(--font-display); font-size: 32px; color: var(--black);
  line-height: 1.1; margin-bottom: 14px;
}
.featured-article__excerpt {
  font-size: 15px; color: var(--text-light); line-height: 1.7; margin-bottom: 20px;
}
.featured-article__meta { display: flex; gap: 16px; align-items: center; font-size: 12px; color: var(--text-light); }

.articles-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;
}
.article-card {
  background: var(--white); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition);
}
.article-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.15); }

.article-card__img { height: 180px; overflow: hidden; }
.article-card__img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.article-card:hover .article-card__img img { transform: scale(1.05); }

.article-card__body { padding: 20px 20px 22px; }
.article-card__title {
  font-family: var(--font-display); font-size: 18px; color: var(--black);
  line-height: 1.2; margin-bottom: 10px;
}
.article-card__excerpt { font-size: 13px; color: var(--text-light); line-height: 1.7; margin-bottom: 16px; }
.article-card__footer { display: flex; align-items: center; justify-content: space-between; }
.article-card__meta { display: flex; gap: 12px; font-size: 11px; color: var(--text-light); }
.read-time { color: var(--red); font-weight: 600; }
.article-read-more { font-size: 13px; font-weight: 700; color: var(--red); transition: text-decoration var(--transition); }
.article-read-more:hover { text-decoration: underline; }

.no-articles {
  background: var(--gray); border-radius: 10px;
  padding: 40px; text-align: center; color: var(--text-light); font-size: 15px;
}

.blog-newsletter { background: var(--black); padding: 56px 0; }
.blog-newsletter__inner {
  display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap;
}
.blog-newsletter__inner h2 {
  font-family: var(--font-display); font-size: 32px; color: var(--white); margin-bottom: 4px;
}
.blog-newsletter__inner p { color: rgba(255,255,255,0.6); font-size: 15px; }
.blog-newsletter__form { display: flex; gap: 8px; flex-shrink: 0; }
.blog-newsletter__form input {
  padding: 12px 18px; border-radius: var(--radius);
  border: 1.5px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.08); color: var(--white);
  font-size: 14px; width: 260px; transition: border-color var(--transition);
}
.blog-newsletter__form input::placeholder { color: rgba(255,255,255,0.4); }
.blog-newsletter__form input:focus { border-color: var(--red); outline: none; }

@media (max-width: 900px) {
  .featured-article { grid-template-columns: 1fr; }
  .featured-article__img { height: 220px; }
  .featured-article__content { padding: 24px; }
  .featured-article__title { font-size: 24px; }
  .articles-grid { grid-template-columns: 1fr; }
  .blog-newsletter__inner { flex-direction: column; align-items: flex-start; }
  .blog-newsletter__form { flex-direction: column; width: 100%; }
  .blog-newsletter__form input { width: 100%; }
}
</style>
