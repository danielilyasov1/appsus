import { mailService } from "../services/mail-service.js"
import mailList from "../cmps/mail-list.cmp.js"
import mailFilter from "../cmps/mail-filter-cmp.js"
import mailAdd from "./mail-add.cmp.js"
// import { eventBus } from "../services/eventBus-service.js"

export default {
  template: `
   <section class="mail-app">
    <mail-filter @filtered="filterMail" :mails="mails" v-if="mails"/>
    <mail-add></mail-add>
   </section>

`,
  components: {
    mailList,
    mailFilter,
    mailAdd,
  },
  data() {
    return {
      mails: null,
      selectedMail: null,
      filterBy: null,
    }
  },
  created() {
    mailService.query().then((mails) => {
      this.mails = mails
    })
  },
  methods: {
    selectMail(mail) {
      this.selectedMail = mail
    },
    filterMail(filterBy) {
      this.filterBy = filterBy
    },
  },
  computed: {
    mailsToDisplay() {
      if (!this.filterBy) return this.mails
      const regex = new RegExp(this.filterBy.subject, "i")
      return this.mails.filter(
        (mail) =>
          regex.test(mail.subject) 
      )
    },
  },
  unmounted() {},
}
