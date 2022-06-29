import { bookService } from "../services/book-service.js"
import bookList from "../cmps/book-list.cmp.js"
import bookFilter from "../cmps/book-filter-cmp.js"
import bookAdd from "./book-add.cmp.js"
import { eventBus } from "../services/eventBus-service.js"

export default {
  template: `
   <section class="book-app">
    <book-filter @filtered="filterBook" :books="books" v-if="books"/>
    <book-add class='googleBook'></book-add>
    <book-list @removed="removeBook" @selected="selectBook" :books="booksToDisplay" />
   </section>

`,
  components: {
    bookList,
    bookFilter,
    bookAdd,
  },
  data() {
    return {
      books: null,
      selectedBook: null,
      filterBy: null,
    }
  },
  created() {
    bookService.query().then((books) => {
      this.books = books
    })
  },
  methods: {
    removeBook(id) {
      bookService
        .remove(id)
        .then(() => {
          console.log("Deleted successfully")
          const idx = this.books.findIndex((book) => book.id === id)
          this.books.splice(idx, 1)
          eventBus.emit("show-msg", {
            txt: "Deleted successfully",
            type: "success",
          })
        })
        .catch((err) => {
          console.log(err)
          eventBus.emit("show-msg", {
            txt: "Error - try again later",
            type: "error",
          })
        })
    },
    selectBook(book) {
      this.selectedBook = book
    },
    filterBook(filterBy) {
      this.filterBy = filterBy
    },
  },
  computed: {
    booksToDisplay() {
      if (!this.filterBy) return this.books
      const regex = new RegExp(this.filterBy.title, "i")
      return this.books.filter(
        (book) =>
          regex.test(book.title) && book.listPrice.amount >= this.filterBy.price
      )
    },
  },
  unmounted() {},
}
