import emailPreview from "./email-preview.cmp.js"
// import emailDetails from "./../views/email-details.cmp.js"

export default {
  props: ["emails"],
  template: `
 <section v-if="emails" class="email-list">
    <ul>
        <li v-for="(email,idx) in emails" :key="email.id" class="email-preview-container">
            <img class='img-user' src='app/email/img/user-img.png'/>
            <div class='mail'>
              <email-preview :email="email"/>
              <!-- <router-link :to="'/email/'+email.id" class='detailsE'>    
                </router-link> -->
                <!-- <email-details :email='email' v-if='email.id' class='detailsE'></email-details> -->
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
