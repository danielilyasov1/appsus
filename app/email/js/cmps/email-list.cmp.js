import mailPreview from "./email-preview.cmp.js"

export default {
  props: ["mails"],
  template: `
 <section v-if="mails" class="mail-list">
    <ul>
        <li v-for="(mail,idx) in mails" :key="mail.id" class="mail-preview-container">
            <router-link :to="'/mail/'+mail.id" class='details'>    
            <mail-preview :mail="mail"/>
            <!-- <div class="actions">
                <button @click="remove(mail.id)">X</button>
                <router-link :to="'/mail/'+mail.id" class='details'>Details</router-link>
                <router-link :to="'/mail/edit/'+mail.id">Edit</router-link>
              </div> -->
            </router-link>
        </li>
    </ul>
  </section>
`,
  components: {
    mailPreview,
  },

  data() {
    return {}
  },
  methods: {
    select(mail) {
      this.$emit("selected", mail)
    },
  },
  computed: {},
}
