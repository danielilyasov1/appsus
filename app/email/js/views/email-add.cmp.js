import { emailService } from "../services/email-service.js"

export default {
  template: `
 <!-- <h2>hi</h2> -->

 <!-- <button @click='clickBack'>Back</button>  -->
    <section>
       <button @click='searchEmail'>search</button>
       <ul><li v-for="email in emails"><button @click='addEmail(email)'><img src='./img/send-arrow.png'></button>{{email.title}}</li></ul>
    </section>

`,
  data() {
    return {
      emailName: "",
      emails: null,
    }
  },
  created() {},
  methods: {
    addEmail(email) {
      emailService.addEmail(email)
    },
  },
  computed: {},
  unmounted() {},
}
