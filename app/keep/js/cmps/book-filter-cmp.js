export default {
  props: ["books"],
  template: `
    <section class="filter-books" >
    Search:
	<input type="text" v-model="filterBy.title" @input="filter" placeholder='Enter book name..'>
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
      return Math.min(...this.books.map((book) => book.listPrice.amount))
    },
    maxPrice() {
      return Math.max(...this.books.map((book) => book.listPrice.amount))
    },
  },
  components: {},
}
