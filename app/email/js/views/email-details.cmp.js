import longText from "../cmps/long-text.cmp.js"
// import addRate from "../cmps/add-rate.cmp.js"
import { mailService } from "../services/mail-service.js"

export default {
  template: `
      <section v-if="mail" class="mail-details">
          <h4>mail Details</h4>
          <h2>{{mail.subject}}</h2>
          <h3>{{mail.name}}  <{{mail.to}}></h3>
          <p>{{mail.body}}</p>
          <button @click="remove(mail.id)">🗑</button>
          <button @click='nextmail'>next email</button>
          <button @click='clickBack'>Back</button>
      </section>
      <div v-else>Loading...</div>
  `,
  components: {
    longText,
    // addRate,
  },
  data() {
    return {
      mail: null,
      nextmailId: null,
    }
  },
  created() {
    const id = this.$route.params.mailId
    mailService.get(id).then((mail) => (this.mail = mail))
  },
  methods: {
    clickBack() {
      this.$router.back()
    },
    nextmail() {
      this.$router.push("/mail/" + this.nextmailId)
    },
    remove(id) {
      mailService
      .remove(id)
      .then(() => {
        console.log("Deleted successfully")
        const idx = this.mails.findIndex((mail) => mail.id === id)
        this.mails.splice(idx, 1)
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
      })    },
  },
  computed: {
  },
  watch: {
    "$route.params.mailId": {
      handler() {
        const id = this.$route.params.mailId
        if (!id) return
        mailService.get(id).then((mail) => {
          this.mail = mail
          mailService.getNextmailId(id).then((nextmailId) => {
            this.nextmailId = nextmailId
          })
        })
      },
      immediate: true,
    },
  },
}
