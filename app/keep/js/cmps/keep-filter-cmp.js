export default {
  props: ["notes"],
  template: `
    <section class="filter-notes" >
    Search:
	<input type="text" v-model="filterBy.title" @input="filter" placeholder='Enter note name..'>
    Min price:
	<input type="range" v-model="filterBy.price" @input="filter" :min="minPrice" :max="maxPrice"  v-model.number="filterBy.price">
    {{filterBy.price}}
    </section>
  `,
  data() {
    return {
      filterBy: {
        title: "",
        price: "",
      },
    }
  },
  created() {
    this.filterBy.price = this.minPrice
  },
  methods: {
    filter() {
      this.$emit("filtered", this.filterBy)
    },
  },
  computed: {
    minPrice() {
      return Math.min(...this.notes.map((note) => note.listPrice.amount))
    },
    maxPrice() {
      return Math.max(...this.notes.map((note) => note.listPrice.amount))
    },
  },
  components: {},
}
