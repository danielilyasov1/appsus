import emailPreview from "./email-preview.cmp.js"

export default {
  props: ["emails"],
  template: `
 <section v-if="emails" class="email-list">
    <ul>
        <li v-for="(email,idx) in emails" :key="email.id" class="email-preview-container">
            <img class='img-user' src='app/email/img/user-img.png'/>
            <div class='mail'>
              <router-link :to="'/email/'+email.id" class='details'>    
                <email-preview :email="email"/>
              </router-link>
            </div>  
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
