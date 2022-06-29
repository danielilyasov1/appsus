import appHeader from './cmp/app-header.cmp.js'
import appFooter from './cmp/app-footer.cmp.js'
import homePage from './views/home-page.cmp.js'
import { router } from './router.js'
// import userMsg from './cmps/user-msg.cmp.js';

const options = {
  template: `
        <section class="app-layout">
            <app-header />
            <router-view/>
            <app-footer />
        </section>
    `,
  components: {
    appHeader,
    appFooter,
    homePage
  },
}
/* <user-msg/>
            <router-view/> */
// <app-footer />
const app = Vue.createApp(options)
app.use(router)
app.mount('#app')
