import { bookService } from "../services/book-service.js"

export default {
  template: `
 <!-- <h2>hi</h2>

 <button @click='clickBack'>Back</button> -->
    <section>
       <button @click='searchBook'>search</button>
       <ul><li v-for="book in books"><button @click='addBook(book)'><img src='./img/send-arrow.png'></button>{{book.title}}</li></ul>
    </section>

`,
  data() {
    return {
      bookName: "",
      books: null,
    }
  },
  created() {},
  methods: {
    addBook(book){
        bookService.addBook(book)
    },
  },
  computed: {},
  unmounted() {},
}
