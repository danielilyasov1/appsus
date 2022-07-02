export default {
  props: ["text"],
  template: `
    <span class='text-body'>-{{formatedText}}<span v-if="!isMore && longText" >...</span> <span v-if="longText" @click="isMore=!isMore"></span></span>
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
  mounted(){
  }
}
