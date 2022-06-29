export default {
  props: ["text"],
  template: `
    <p>{{formatedText}}<span v-if="!isMore && longText">...</span> <span :style="readStyle" v-if="longText" @click="isMore=!isMore">{{readText}} </span></p>
`,
  data() {
    return {
      isMore: false,
      longText: this.text.length > 100,
    }
  },
  methods: {},
  computed: {
    formatedText() {
      return this.isMore ? this.text : this.text.slice(0, 100)
    },
    readText() {
      return this.isMore ? " Read Less" : " Read more"
    },
    readStyle() {
      return {
        color: this.isMore ? "rgb(197, 4, 4)" : "rgb(35, 35, 222)",
        cursor: "pointer",
        "text-decoration": "underline",
      }
    },
  },
}
