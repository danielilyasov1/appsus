export default {
  template: `
  <header :class="{'scrolled-nav':scrollPosition}">
    <nav>
      <div class="branding">
      <img alt="logo">
      <ul v-show="!mobile" class="navigation">
        <li><router-link class="link" to="">Books</router-link></li>
        <li><router-link class="link" to="/keep">Keep</router-link></li>
        <li><router-link class="link" to="/email">Email</router-link></li>
      </ul>
      </div>
    </nav>
  </header>
   `,
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
/* <router-link to="/">Home</router-link>|
<router-link to="/book">Books</router-link>|
<router-link to="/about">About</router-link>| */
