import longText from "../cmps/long-text.cmp.js"
// import addRate from "../cmps/add-rate.cmp.js"
import { emailService } from "../services/email-service.js"

export default {
  template: `
      <section v-if="email" class="email-details">
          <h4>email Details</h4>
          <h2>{{email.subject}}</h2>
          <p>{{email.name}}  &#60;{{email.to}}&#62;</p>
          <p>{{email.body}}</p>
          <button @click="remove(email.id)">🗑</button>
          <button @click="nextemail">next email</button>
          <button @click="clickBack">Back</button>
      </section>
      <div v-else>Loading...</div>
  `,
  components: {
    longText,
    // addRate,
  },
  data() {
    return {
      email: null,
      nextemailId: null,
    }
  },
  created() {
    const id = this.$route.params.emailId
    emailService.get(id).then((email) => (this.email = email))
  },
  methods: {
    clickBack() {
      this.$router.back()
    },
    nextemail() {
      this.$router.push("/email/" + this.nextemailId)
    },
    remove(id) {
      emailService
        .remove(id)
        .then(() => {
          console.log("Deleted successfully")
          const idx = this.emails.findIndex((email) => email.id === id)
          this.emails.splice(idx, 1)
          eventBus.emit("show-msg", {
            txt: "Deleted successfully",
            type: "success",
          })
        })
        .catch((err) => {
          console.log(err)
          eventBus.emit("show-msg", {
            txt: "Error - try again later",
            type: "error",
          })
        })
    },
  },
  computed: {},
  watch: {
    "$route.params.emailId": {
      handler() {
        const id = this.$route.params.emailId
        if (!id) return
        emailService.get(id).then((email) => {
          this.email = email
          emailService.getNextEmailId(id).then((nextemailId) => {
            this.nextemailId = nextemailId
          })
        })
      },
      immediate: true,
    },
  },
}
