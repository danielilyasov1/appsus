export default {
  props: ["emails"],
  template: `
    <section class="filter-emails" >
    <input type="text" v-model="filterBy.subject" @input="filter" placeholder='🔍Search mail..'>
    </section>
  `,
  data() {
    return {
      filterBy: {
        subject: "",
      },
    }
  },
  created() {
  },
  methods: {
    filter() {
      this.$emit("filtered", this.filterBy)
    },
  },
  computed: {
  },
  components: {},
}
