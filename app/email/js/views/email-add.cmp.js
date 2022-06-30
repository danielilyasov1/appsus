import { emailService } from "../services/email-service.js"

export default {
  template: `
    <section>
      <form>
        <h1>hi</h1>
        <button @click='addEmail(email)'>&#10148;</button>
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
