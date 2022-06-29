import longText from "../cmps/long-text.cmp.js"

export default {
  props: ["mail"],
  template: `
      <p>{{mail.name}}</p>
      <p>{{mail.subject}}</p>
      <long-text :text="mail.body"></long-text>
      <p>{{date}}</p>
  `,
  components: {
    longText,
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
   date(){
    return this.mail.sentAt.toLocaleTimeString()
   }
  },
}
