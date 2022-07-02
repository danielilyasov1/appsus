import emailAdd from "./email-add.cmp.js"
import { sortEmit } from "./../services/eventBus-service.js"

export default {
  template: `
    <div class='side-bar'>
        <button class="email-compose" @click="compose=true"><img src="app/email/img/plus.png"><div class='comp'>Compose</div></button>
        <button class="nav-btn" @click="sort('inbox')" class="{active: (active === 'inbox')}">&#9993;Inbox</button>
        <button class="nav-btn" @click="sort('unread')">&#xF32E;Unread</button>
        <button class="nav-btn" @click="sort('starred')" :class="{active: (active === 'starred')}">&#9733;starred</button>
        <button class="nav-btn" @click="sort('sent')" :class="{active: (active === 'sent')}">&#10148;Sent</button>
        <button class="nav-btn trash" @click="sort('trash')" :class="{active: (active === 'trash')}">&#128465;Trash</button>
    </div>
    <div v-if='compose'>
        <email-add @close='compose=false'/>
    </div>
`,
  components: {
    emailAdd,
  },
  emits: ["close","sort"],
  data() {
    return {
      compose: false,
      active: 'inbox',
    }
  },
  created() {},
  methods: {
    sort(type) {
      this.active = type
      sortEmit(type)
  }, 
  },
  computed: {},
  unmounted() {},
}
