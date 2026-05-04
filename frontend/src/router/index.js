import { createRouter, createWebHistory } from 'vue-router'
import ClubPage from '../views/ClubPage.vue'
import ClubsPage from '../views/ClubsPage.vue'
import PromotionsPage from '../views/PromotionsPage.vue'
import TrainersPage from '../views/TrainersPage.vue'
import SchedulePage from '../views/SchedulePage.vue'
import BlogPage from '../views/BlogPage.vue'
import CareersPage from '../views/CareersPage.vue'
import SubscriptionsPage from '../views/SubscriptionsPage.vue'
import PartnersPage from '../views/PartnersPage.vue'
import AcademyPage from '../views/AcademyPage.vue'
import LoginPage from '../views/LoginPage.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import DashboardPage from '../views/admin/DashboardPage.vue'
import TrainersAdmin from '../views/admin/TrainersAdmin.vue'
import PromotionsAdmin from '../views/admin/PromotionsAdmin.vue'
import BlogAdmin from '../views/admin/BlogAdmin.vue'
import NewsAdmin from '../views/admin/NewsAdmin.vue'
import LeadsAdmin from '../views/admin/LeadsAdmin.vue'

const routes = [
  { path: '/', component: ClubPage },
  { path: '/clubs', component: ClubsPage },
  { path: '/promotions', component: PromotionsPage },
  { path: '/trainers', component: TrainersPage },
  { path: '/schedule', component: SchedulePage },
  { path: '/blog', component: BlogPage },
  { path: '/careers', component: CareersPage },
  { path: '/subscriptions', component: SubscriptionsPage },
  { path: '/partners', component: PartnersPage },
  { path: '/academy', component: AcademyPage },
  { path: '/login', component: LoginPage },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: DashboardPage },
      { path: 'trainers', component: TrainersAdmin },
      { path: 'promotions', component: PromotionsAdmin },
      { path: 'blog', component: BlogAdmin },
      { path: 'news', component: NewsAdmin },
      { path: 'leads', component: LeadsAdmin },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('fh_admin_token')) {
    next('/login')
  } else {
    next()
  }
})

export default router
