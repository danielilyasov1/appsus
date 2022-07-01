import longText from '../cmps/long-text.cmp.js'
import { emailService } from '../services/email-service.js'
import { eventBus } from '../services/eventBus-service.js'

export default {
  props: ['email'],
  template: `
      <section v-if="email" class="email-details">
      <h2>{{email.subject}}</h2>
          <p><span class='email-name'>{{email.name}}</span>  &#60;{{email.to}}&#62;</p>
          <p>{{email.body}}</p>
          <button @click="remove(email.id)">Delete mail</button>
      </section>
      <div v-else>Loading...</div>
  `,
  components: {
    longText,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    remove(id) {
      emailService
        .remove(id)
        .then(() => {
          console.log('Deleted successfully')
          const idx = this.emails.findIndex((email) => email.id === id)
          this.emails.splice(idx, 1)
          eventBus.emit('show-msg', {
            txt: 'Deleted successfully',
            type: 'success',
          })
        })
        .catch((err) => {
          console.log(err)
          eventBus.emit('show-msg', {
            txt: 'Error - try again later',
            type: 'error',
          })
        })
    },
  },
  computed: {},
}
