export default {
  props: ["text"],
  template: `
    <p class='text-body'>{{formatedText}}<span v-if="!isMore && longText" >...</span> <span v-if="longText" @click="isMore=!isMore"></span></p>
`,
  data() {
    return {
      isMore: false,
      longText: this.text.length > 30,
    }
  },
  methods: {},
  computed: {
    formatedText() {
      return this.isMore ? this.text : this.text.slice(0, 30)
    },

    
  },
}
