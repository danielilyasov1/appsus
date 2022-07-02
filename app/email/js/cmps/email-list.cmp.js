import emailPreview from "./email-preview.cmp.js"

export default {
  props: ["emails"],
  template: `
 <section v-if="emails" class="email-list">
    <ul>
        <li v-for="(email,idx) in emails" :key="email.id" class="email-preview-container">
            <img class='img-user' src='app/email/img/user-img.png'/>
            <div class='mail'>
              <email-preview :email="email"/>
            </div>  
        </li>
    </ul>
  </section>
`,
  components: {
    emailPreview,
    // emailDetails,
  },

  data() {
    return {
    
      

    }
  },
  methods: {
    select(email) {
      this.$emit("selected", email)
    },
    click(id){
      console.log('id',id)
      
      // this.shouldShow= !this.shouldShow
    },
  },
  computed: {},
}
