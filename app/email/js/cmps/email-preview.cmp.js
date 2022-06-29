import longText from "../cmps/long-text.cmp.js"

export default {
  props: ["email"],
  template: `
      <div>{{email.name}}</div>
      <div>{{email.subject}}</div>
      <long-text :text="email.body"></long-text>
      <div>{{date}}</div>
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
      return this.email.sentAt
    },
  },
}
