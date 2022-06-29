export default {
  template: `
  <header :class="{'scrolled-nav':scrollNav}">
    <nav>
      <div class="branding">
      <router-link class="link" to="/"><img src="/img/Appsus.png" alt="logo"></router-link>
      </div>
      <ul v-show="!mobile" class="navigation">
        <li><router-link class="link" to="/book">📚Books</router-link></li>
        <li><router-link class="link" to="/keep">📌Keep</router-link></li>
        <li><router-link class="link" to="/email">📧Email</router-link></li>
      </ul>
      <div class="icon">
        <span @click="toogleMobileNav" v-show="mobile" :class="{'icon-active' : mobileNav}">☰</span>
      </div>
      <transition name="mobile-nav">
      <ul v-show="mobileNav" class="dropdown-nav">
        <li><router-link class="link" to="/book">📚Books</router-link></li>
        <li><router-link class="link" to="/keep">📌Keep</router-link></li>
        <li><router-link class="link" to="/email">📧Email</router-link></li>
      </ul>
      </transition>
    </nav>
  </header>
   `,
  name: 'navigation',
  data() {
    return {
      scrollNav: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    }
  },
  created() {
    window.addEventListener('resize', this.cheackScreen)
    this.cheackScreen()
  },
  methods: {
    toogleMobileNav() {
      this.mobileNav = !this.mobileNav
    },
    cheackScreen() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 750) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
      return
    },
  },
  computed: {},
}
