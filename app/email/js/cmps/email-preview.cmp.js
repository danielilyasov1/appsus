import longText from "../cmps/long-text.cmp.js"
import emailDetails from "./../views/email-details.cmp.js"
import { emailService } from "../services/email-service.js"

export default {
  props: ["email"],
  template: `
    <section  v-on:click="shouldShow =!shouldShow"  class="email-preview-container-section is">

    <span class='name-email'>{{name}}</span>
    <span class='sub-email'>{{email.subject}}</span>
    <long-text :text='email.body'></long-text>
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
      return new Date(this.email.sentAt)
        .toString()
        .split(" ")
        .splice(1, 2)
        .join(" ")
    },
    name() {
      if(this.email.name) return this.email.name
      const idx = this.email.to.indexOf("@")
      return this.email.to.slice(0, idx) 
    },
    // isRead(){
    //   console.log('isRead',this.email.isRead)
    //   this.email.isRead = true
    // },
  },
}
