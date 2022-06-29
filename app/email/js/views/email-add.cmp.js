import { emailService } from "../services/email-service.js"

export default {
  template: `
    <section>

      <form>

        <button @click='addEmail(email)'><img src='app/email/img/send-arrow.png'></button>
      </form>
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
