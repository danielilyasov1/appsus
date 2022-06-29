import longText from "../cmps/long-text.cmp.js"
import addRate from "../cmps/add-rate.cmp.js"
import { bookService } from "../services/book-service.js"

export default {
  template: `
      <section v-if="book" class="book-details">
          <h4>Book Details</h4>
          <img :src="bookImgUrl" alt="">
          <add-rate/>
          <p><span>Title: </span>{{book.title}}</p>
          <p><span>Subtitle: </span>{{book.subtitle}}</p>
          <p><span>Authors: </span>{{book.authors[0]}}</p>
          <p><span>Description: </span>
            <long-text :text="book.description"></long-text>
          </p>
          <p :class='priceColor'><span>Price: </span>{{book.listPrice.amount}}{{sign}}</p>
          <p><span>{{reading}}</span></p>
          <p><span>{{bookStatus}} </span></p>
          <p><span>Page count: </span>{{book.pageCount}}</p>
          <p><span>Published date: </span>{{book.publishedDate}}</p>
          <p><span>Language: </span>{{book.language}}</p>
          <button @click='nextBook'>next book</button>
          <!-- <router-link :to="'/book/' + nextBookId">Next Book</router-link> -->
          <button @click='clickBack'>Back</button>
      </section>
      <div v-else>Loading...</div>
  `,
  components: {
    longText,
    addRate,
  },
  data() {
    return {
      book: null,
      nextBookId: null,
    }
  },
  created() {
    const id = this.$route.params.bookId
    bookService.get(id).then((book) => (this.book = book))
  },
  methods: {
    clickBack() {
      this.$router.back()
    },
    nextBook() {
      this.$router.push("/book/" + this.nextBookId)
    },
  },
  computed: {
    bookImgUrl() {
      return `${this.book.thumbnail}`
    },
    sign() {
      switch (this.book.listPrice.currencyCode) {
        case "USD":
          return "$"
        case "EUR":
          return "€"
        case "ILS":
          return "₪"
      }
    },
    reading() {
      const pageCount = this.book.pageCount
      if (pageCount > 500) return "Long reading"
      if (pageCount > 200) return " Decent Reading"
      if (pageCount < 100) return "Light Reading"
    },
    bookStatus() {
      const currYear = new Date().getFullYear()
      const publishedDate = this.book.publishedDate
      if (currYear - publishedDate < 1) return "new!"
      if (currYear - publishedDate > 10) return "Veteran Book"
    },
    priceColor() {
      const bookPrice = this.book.listPrice.amount
      if (bookPrice > 150) return "color-red"
      if (bookPrice < 20) return "color-green"
    },
  },
  watch: {
    "$route.params.bookId": {
      handler() {
        const id = this.$route.params.bookId
        if (!id) return
        bookService.get(id).then((book) => {
          this.book = book
          bookService.getNextBookId(id).then((nextBookId) => {
            this.nextBookId = nextBookId
          })
        })
      },
      immediate: true,
    },
  },
}
