import { emailService } from "../services/email-service.js"

export default {
  template: `
    <section class='new-email'>
      <form class='email-form'>
        <div>
          <h2>New Message</h2><button @click='close' class='close'>X</button>
        </div>    
        <div>
          <span>To</span>
          <input type="email" v-model="newEmail.to" required>
        </div>
        <div>
          <span>Subject</span>
          <input type="text" v-model="newEmail.subject">
        </div>
        <div>
          <textarea v-model="newEmail.body" placeholder='enter some message...'></textarea>
        </div>
        <button @click='send' class='send'>&#10148;</button>
      </form>
    </section>

`,
  data() {
    return {
      newEmail: {
        to: null,
        subject: null,
        body: null,
        isRead: false,
        sentAt: Date.now(),
        state: 'sent',
    },
    }
  },
  created() {},
  methods: {
    send() {
      // emailService.addEmail(this.newEmail)
      emailService.save(this.newEmail)
      this.$emit('close')
    },
    close() {
      this.$emit('close')
    },
  },
  computed: {},
  unmounted() {},
}
