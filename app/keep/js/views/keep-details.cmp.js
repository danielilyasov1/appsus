import longText from '../cmps/long-text.cmp.js'
import addRate from '../cmps/add-rate.cmp.js'
import noteImg from '../cmps/keep-type-cmp/keep-img.cmp.js'
import noteTxt from '../cmps/keep-type-cmp/keep-text.cmp.js'
import noteTodos from '../cmps/keep-type-cmp/keep-todo.cmp.js'
import noteVideo from '../cmps/keep-type-cmp/keep-video.cmp.js'
import noteAudio from '../cmps/keep-type-cmp/keep-audio.cmp.js'
import noteCanvas from '../cmps/keep-type-cmp/keep-canvas.cmp.js'
import noteMap from '../cmps/keep-type-cmp/keep-map.cmp.js'
import { keepService } from '../services/keep-service.js'

export default {
  template: `
      <section v-if="note" class="note-details">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
      <component  :is="note.type" :note="note" ></component>
          <button @click='nextnote'>next note</button>
          <button @click="remove(pinnedNote.id)">X</button>
          <button @click="duplicate(pinnedNote)">duplicate</button>
          <button @click="tooglePinned(pinnedNote)">P</button>
          <!-- <router-link :to="'/keep/' + nextnoteId">Next note</router-link> -->
          <button @click='clickBack'>Back</button>
          </div>
          </div>
          </div>
          </transition>
      </section>
      <div v-else>Loading...</div>
  `,
  components: {
    longText,
    addRate,
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo,
    noteAudio,
    noteCanvas,
    noteMap,
  },
  data() {
    return {
      note: null,
      nextnoteId: null,
    }
  },
  created() {
    const id = this.$route.params.keepId
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
