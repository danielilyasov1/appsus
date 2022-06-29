import longText from '../cmps/long-text.cmp.js'
import addRate from '../cmps/add-rate.cmp.js'
import {  keepService } from '../services/keep-service.js'

export default {
  template: `
      <section v-if="note" class="note-details">
          <h4>note Details</h4>
          <img :src="noteImgUrl" alt="">
          <add-rate/>
          <p><span>Title: </span>{{note.title}}</p>
          <p><span>Subtitle: </span>{{note.subtitle}}</p>
          <p><span>Authors: </span>{{note.authors[0]}}</p>
          <p><span>Description: </span>
            <long-text :text="note.description"></long-text>
          </p>
          <p :class='priceColor'><span>Price: </span>{{note.listPrice.amount}}{{sign}}</p>
          <p><span>{{reading}}</span></p>
          <p><span>{{noteStatus}} </span></p>
          <p><span>Page count: </span>{{note.pageCount}}</p>
          <p><span>Published date: </span>{{note.publishedDate}}</p>
          <p><span>Language: </span>{{note.language}}</p>
          <button @click='nextnote'>next note</button>
          <!-- <router-link :to="'/note/' + nextnoteId">Next note</router-link> -->
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
      note: null,
      nextnoteId: null,
    }
  },
  created() {
    const id = this.$route.params.noteId
    keepService.get(id).then((note) => (this.note = note))
  },
  methods: {
    clickBack() {
      this.$router.back()
    },
    nextnote() {
      this.$router.push('/note/' + this.nextNoteId)
    },
  },
  computed: {
    noteImgUrl() {
      return `${this.note.thumbnail}`
    },
    sign() {
      switch (this.note.listPrice.currencyCode) {
        case 'USD':
          return '$'
        case 'EUR':
          return '€'
        case 'ILS':
          return '₪'
      }
    },
    reading() {
      const pageCount = this.note.pageCount
      if (pageCount > 500) return 'Long reading'
      if (pageCount > 200) return ' Decent Reading'
      if (pageCount < 100) return 'Light Reading'
    },
    noteStatus() {
      const currYear = new Date().getFullYear()
      const publishedDate = this.note.publishedDate
      if (currYear - publishedDate < 1) return 'new!'
      if (currYear - publishedDate > 10) return 'Veteran note'
    },
    priceColor() {
      const notePrice = this.note.listPrice.amount
      if (notePrice > 150) return 'color-red'
      if (notePrice < 20) return 'color-green'
    },
  },
  watch: {
    '$route.params.noteId': {
      handler() {
        const id = this.$route.params.noteId
        if (!id) return
        keepService.get(id).then((note) => {
          this.note = note
          keepService.getNextNoteId(id).then((nextNoteId) => {
            this.nextnoteId = nextNoteId
          })
        })
      },
      immediate: true,
    },
  },
}
