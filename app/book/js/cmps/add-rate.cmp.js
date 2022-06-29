export default {
  template: `
        <form class='rate'>
            <h2>new rate</h2>
            <p>Full name: </p>
                <input v-model="newReview.name" placeholder="Enter your full name" />
            <div>Rate: </div>
                <select v-model="newReview.selected">
                    <option>★★★★★</option>
                    <option>★★★★</option>
                    <option>★★★</option>
                    <option>★★</option>
                    <option>★</option>
                </select>
            <p>Read at: </p>
                <input v-model="newReview.date" type="date" placeholder="Enter your full name" />
            <p>Multiline message is:</p>
                <textarea v-model="newReview.longMessage" placeholder="add multiple lines"></textarea>
        </form>

`,
  data() {
    return {
      newReview:{name:'',selected:'',date:0,longMessage:''}
    }
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
}


