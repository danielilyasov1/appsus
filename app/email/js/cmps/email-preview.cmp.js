import longText from "../cmps/long-text.cmp.js"

export default {
  props: ["email"],
  template: `
      <div class='date-mail'>{{date}}</div>
      <div>{{email.name}}</div>
      <div>{{email.subject}}</div>
      <long-text :text="email.body"></long-text>
  `,
  components: {
    longText,
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    date() {
      let date = this.email.sentAt
      return new Date(date).toLocaleTimeString()
    },
  },
}
