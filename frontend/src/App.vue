<template>
  <div id="fh-app">
    <TheHeader @open-tour="showTourModal = true" />
    <router-view @open-tour="showTourModal = true" />
    <TheFooter />

    <!-- Tour Modal -->
    <Teleport to="body">
      <div v-if="showTourModal" class="modal-overlay" @click.self="showTourModal = false">
        <div class="modal-box">
          <button class="modal-close" @click="showTourModal = false">✕</button>
          <TourForm @submitted="showTourModal = false" />
        </div>
      </div>
    </Teleport>

    <!-- Cookie Banner -->
    <div v-if="!cookieAccepted" class="cookie-banner">
      <span>Мы используем файлы cookies. Продолжая работу с сайтом, Вы соглашаетесь
        с использованием файлов cookies и обработкой персональных данных в соответствии с
        <a href="#" target="_blank">Положением</a>.</span>
      <button @click="acceptCookie">Согласен</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import TourForm from './components/TourForm.vue'

const showTourModal = ref(false)
const cookieAccepted = ref(true)

onMounted(() => {
  cookieAccepted.value = !!localStorage.getItem('fh_cookie')
})

function acceptCookie() {
  localStorage.setItem('fh_cookie', '1')
  cookieAccepted.value = true
}
</script>
