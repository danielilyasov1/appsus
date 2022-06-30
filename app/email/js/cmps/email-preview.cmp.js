import longText from "../cmps/long-text.cmp.js"
import emailDetails from "./../views/email-details.cmp.js"

export default {
  props: ["email"],
  template: `
    <section  v-on:click="shouldShow =!shouldShow" class="email-preview-container-section">

    <span class='name-email'>{{email.name}}</span>
    <span class='sub-email'>{{email.subject}}</span>
    <long-text :text="email.body"></long-text>
    <span class='date-mail'>{{date}}</span>
    
    <email-details :email='email' v-if='shouldShow' class='detailsE'></email-details>
  </section>

    `,
  components: {
    longText,
    emailDetails,

  },
  data() {
    return {
      shouldShow: false,
    }
  },
  methods: {},
  computed: {
    date() {
      let date = this.email.sentAt
      return new Date(date).toLocaleTimeString()
    },
  },
}
