import { emailService } from "../services/email-service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailFilter from "../cmps/email-filter-cmp.js"
import emailAdd from "./email-add.cmp.js"
// import { eventBus } from "../services/eventBus-service.js"

export default {
  template: `
   <section class="email-app">
    <email-filter @filtered="filterEmail" :emails="emails" v-if="emails"/>
    <email-add></email-add>
    <email-list @selected="selectEmail" :emails="emailsToDisplay" />
   </section>

`,
  components: {
    emailList,
    emailFilter,
    emailAdd,
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
