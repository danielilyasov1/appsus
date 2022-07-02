import emailAdd from "./email-add.cmp.js"

export default {
  template: `
    <div class='side-bar'>
        <button class="email-compose" @click="compose=true"><img src="app/email/img/plus.png"><div class='comp'>Compose</div></button>
        <button class="nav-btn" @click="sort('all')">&#9993;Inbox</button>
        <button class="nav-btn" @click="sort('unread')">&#xF32E;Unread</button>
        <button class="nav-btn" @click="sort('starred')">&#9733;starred</button>
        <button class="nav-btn" @click="sort('sent')">&#10148;Sent</button>
        <button class="nav-btn trash" @click="sort('trash')">&#128465;Trash</button>
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
    }
  },
  created() {},
  methods: {
    sort(type) {
      this.$emit("sort", type)
    },
  },
  computed: {},
  unmounted() {},
}
