import emailPreview from "./email-preview.cmp.js"

export default {
  props: ["emails"],
  template: `
 <section v-if="emails" class="email-list">
    <ul>
        <li v-for="(email,idx) in emails" :key="email.id" class="email-preview-container">
            <router-link :to="'/email/'+email.id" class='details'>    
            <email-preview :email="email"/>
            <!-- <div class="actions">
                <button @click="remove(email.id)">X</button>
                <router-link :to="'/email/'+email.id" class='details'>Details</router-link>
                <router-link :to="'/email/edit/'+email.id">Edit</router-link>
              </div> -->
            </router-link>
        </li>
    </ul>
  </section>
`,
  components: {
    emailPreview,
  },

  data() {
    return {}
  },
  methods: {
    select(email) {
      this.$emit("selected", email)
    },
  },
  computed: {},
}
