<template>
  <footer class="footer">
    <div class="footer__callback">
      <div class="container">
        <div class="footer__callback-inner">
          <div class="footer__callback-text">
            <h3>Заказать обратный звонок</h3>
            <p>Узнайте стоимость абонемента или позвоните прямо сейчас:</p>
            <a href="tel:+78126100606" class="footer__phone">(812) 610-06-06</a>
          </div>
          <CallbackForm />
        </div>
      </div>
    </div>

    <div class="footer__main">
      <div class="container footer__grid">
        <div class="footer__brand">
          <router-link to="/">
            <img src="https://www.fitnesshouse.ru/assets/templates/fh2023/img/logo.svg" alt="Fitness House" class="footer__logo" />
          </router-link>
          <div class="footer__socials">
            <a href="https://max.ru/join/yXjVK1wT4rFIxyAkNxrJGMdsVAtw1k8Xu-Y9dmNECfM" target="_blank">
              <img src="https://www.fitnesshouse.ru/assets/images/icons/max.svg" alt="max" />
            </a>
            <a href="https://dzen.ru/fitnesshouse" target="_blank">
              <img src="https://www.fitnesshouse.ru/assets/templates/fh2023/img/dzen.png" alt="dzen" />
            </a>
          </div>
          <div class="footer__app">
            <p>МОБИЛЬНОЕ ПРИЛОЖЕНИЕ</p>
            <div class="footer__app-links">
              <a href="https://apps.apple.com/ru/app/fitness-house/id6476276280" target="_blank">
                <img src="https://www.fitnesshouse.ru/assets/templates/fh2023/img/icons/appstore.png" alt="App Store" />
              </a>
              <a href="https://www.rustore.ru/catalog/app/com.fitnesshouseapp.app" target="_blank">
                <img src="https://www.fitnesshouse.ru/assets/templates/fh2023/img/icons/rustore.png" alt="RuStore" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.fitnesshouseapp.app" target="_blank">
                <img src="https://www.fitnesshouse.ru/assets/templates/fh2023/img/icons/googleplay.png" alt="Google Play" />
              </a>
            </div>
          </div>
        </div>

        <div class="footer__links">
          <ul>
            <li><router-link to="/subscriptions">Фитнес по Подписке</router-link></li>
            <li><router-link to="/blog">Новости клубов</router-link></li>
            <li><router-link to="/academy">Академия фитнеса Корус</router-link></li>
            <li><router-link to="/careers">Вакансии</router-link></li>
            <li><router-link to="/partners">Субаренда</router-link></li>
          </ul>
          <ul>
            <li><router-link to="/partners">Корпоративные продажи</router-link></li>
            <li><router-link to="/partners">Предложить помещение</router-link></li>
            <li><router-link to="/partners">Реклама в клубах</router-link></li>
            <li><router-link to="/clubs">Аренда тренажерного зала</router-link></li>
            <li><router-link to="/blog">Блог</router-link></li>
          </ul>
        </div>

        <div class="footer__support">
          <h4>Служба поддержки</h4>
          <div class="footer__support-icons">
            <a href="https://wa.me/+79213443525" target="_blank">
              <img src="https://www.fitnesshouse.ru/assets/templates/fh2023/img/icons/wp.svg" alt="WhatsApp" />
            </a>
            <a href="https://t.me/+79213443525" target="_blank">
              <img src="https://www.fitnesshouse.ru/assets/templates/fh2023/img/icons/tl.svg" alt="Telegram" />
            </a>
            <a href="https://max.ru/u/f9LHodD0cOLDuHEizCss5eTL5RXwmuFHpV6xfpB71iH3Ci0ET4tadIOU6BA" target="_blank">
              <img src="https://www.fitnesshouse.ru/assets/images/icons/max.svg" alt="MAX" />
            </a>
          </div>
          <p class="footer__support-hours">c 7:00 до 00:00</p>
          <a href="mailto:help@fhclub.ru" class="footer__email">help@fhclub.ru</a>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <span>© 2007 – 2026 Все права защищены.</span>
        <div class="footer__legal">
          <a href="https://market.fitnesshouse.ru/documentation">Юридическая информация</a>
          <a href="https://market.fitnesshouse.ru/storage/documents/legal_information.pdf">Соглашение на обработку персональных данных</a>
        </div>
        <span class="footer__credit">Продвижение сайта — <a href="https://q2zov.ru/" target="_blank">KUTUZOV</a></span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import CallbackForm from './CallbackForm.vue'
</script>

<style scoped>
.footer { background: var(--black); color: var(--white); }

.footer__callback { background: #1c1c1c; padding: 48px 0; }
.footer__callback-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
.footer__callback-text h3 { font-family: var(--font-display); font-size: 28px; margin-bottom: 8px; }
.footer__callback-text p { color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 12px; }
.footer__phone { font-size: 22px; font-weight: 800; color: var(--red); }
.footer__phone:hover { color: #ff3a40; }

.footer__main { padding: 48px 0; border-top: 1px solid rgba(255,255,255,0.08); }
.footer__grid { display: grid; grid-template-columns: 280px 1fr 200px; gap: 40px; }

.footer__logo { height: 40px; filter: brightness(0) invert(1); margin-bottom: 16px; }
.footer__socials { display: flex; gap: 12px; margin-bottom: 24px; }
.footer__socials img { height: 28px; opacity: 0.7; transition: opacity 0.2s; }
.footer__socials a:hover img { opacity: 1; }

.footer__app p { font-size: 11px; font-weight: 700; letter-spacing: 1px; color: rgba(255,255,255,0.4); margin-bottom: 10px; }
.footer__app-links { display: flex; gap: 8px; flex-wrap: wrap; }
.footer__app-links img { height: 36px; opacity: 0.85; transition: opacity 0.2s; }
.footer__app-links a:hover img { opacity: 1; }

.footer__links { display: flex; gap: 40px; }
.footer__links ul { display: flex; flex-direction: column; gap: 10px; }
.footer__links a { font-size: 13px; color: rgba(255,255,255,0.6); transition: color 0.2s; }
.footer__links a:hover { color: var(--red); }

.footer__support h4 { font-size: 13px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 14px; }
.footer__support-icons { display: flex; gap: 12px; margin-bottom: 10px; }
.footer__support-icons img { height: 32px; opacity: 0.7; transition: opacity 0.2s; }
.footer__support-icons a:hover img { opacity: 1; }
.footer__support-hours { font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 6px; }
.footer__email { font-size: 13px; color: var(--red); }
.footer__email:hover { text-decoration: underline; }

.footer__bottom { border-top: 1px solid rgba(255,255,255,0.08); padding: 20px 0; }
.footer__bottom-inner { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; font-size: 12px; color: rgba(255,255,255,0.4); }
.footer__legal { display: flex; gap: 20px; }
.footer__legal a { color: rgba(255,255,255,0.4); transition: color 0.2s; }
.footer__legal a:hover { color: var(--red); }
.footer__credit { margin-left: auto; }
.footer__credit a { color: var(--red); }

@media (max-width: 900px) {
  .footer__callback-inner { grid-template-columns: 1fr; gap: 32px; }
  .footer__grid { grid-template-columns: 1fr; }
  .footer__links { gap: 24px; }
  .footer__bottom-inner { flex-direction: column; align-items: flex-start; }
  .footer__credit { margin-left: 0; }
}
</style>
