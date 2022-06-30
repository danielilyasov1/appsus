import { emailService } from "../services/email-service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailFilter from "../cmps/email-filter-cmp.js"
import emailSide from "./email-side.cmp.js"

export default {
  template: `
   <section class="email-app">
    <email-filter @filtered="filterEmail" :emails="emails" v-if="emails"/>
    <div class='email-container'>
    <email-side></email-side>
    <email-list @selected="selectEmail" :emails="emailsToDisplay" />
    </div>
   </section>

`,
  components: {
    emailList,
    emailFilter,
    emailSide,
    
  },
  data() {
    return {
      emails: null,
      selectedEmail: null,
      filterBy: null,
    }
  },
  created() {
    emailService.query().then((emails) => {
      this.emails = emails
    })
  },
  methods: {
    selectEmail(email) {
      this.selectedEmail = email
    },
    filterEmail(filterBy) {
      this.filterBy = filterBy
    },
  },
  computed: {
    emailsToDisplay() {
      if (!this.filterBy) return this.emails
      const regex = new RegExp(this.filterBy.subject, "i")
      return this.emails.filter((email) => regex.test(email.subject))
    },
  },
  unmounted() {},
}
