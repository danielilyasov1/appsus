export default {
  template: `
    <div class='side-bar'>
        <button class="email-compose" @click="composeMode">&#43;Compose</button>
        <button class="nav-btn" @click="sort('all')">&#9993;Inbox</button>
        <button class="nav-btn" @click="sort('unread')">&#xF32E;Unread</button>
        <button class="nav-btn" @click="sort('starred')">&#9733;starred</button>
        <button class="nav-btn" @click="sort('sent')">&#10148;Sent</button>
        <button class="nav-btn trash" @click="sort('trash')">&#128465;Trash</button>
    </div>
`,
  data() {
    return {}
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
