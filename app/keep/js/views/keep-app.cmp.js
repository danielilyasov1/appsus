import { keepService } from '../services/keep-service.js'
import keepList from '../cmps/keep-list.cmp.js'
import keepFilter from '../cmps/keep-filter-cmp.js'
import keepAdd from './keep-add.cmp.js'
import { eventBus } from '../services/eventBus-service.js'

export default {
  template: `
   <section class="note-app">
    <keep-filter @filtered="filterNote" :notes="notes" v-if="notes"/>
    <keep-add class='google-note' />
    <keep-list @removed="removeNote" @selected="selectNote" :notes="notesToDisplay" />
   </section>

`,
  components: {
    keepList,
    keepFilter,
    keepAdd,
  },
  data() {
    return {
      notes: null,
      selectedNote: null,
      filterBy: null,
    }
  },
  created() {
    keepService.query().then((notes) => {
      this.notes = notes
    })
  },
  methods: {
    removeNote(id) {
      keepService
        .remove(id)
        .then(() => {
          console.log('Deleted successfully')
          const idx = this.notes.findIndex((note) => note.id === id)
          this.notes.splice(idx, 1)
          eventBus.emit('show-msg', {
            txt: 'Deleted successfully',
            type: 'success',
          })
        })
        .catch((err) => {
          console.log(err)
          eventBus.emit('show-msg', {
            txt: 'Error - try again later',
            type: 'error',
          })
        })
    },
    selectNote(note) {
      this.selectedNote = note
    },
    filterNote(filterBy) {
      this.filterBy = filterBy
    },
  },
  computed: {
    notesToDisplay() {
      if (!this.filterBy) return this.notes
      const regex = new RegExp(this.filterBy.title, 'i')
      return this.notes.filter((note) => regex.test(note.title) && note.listPrice.amount >= this.filterBy.price)
    },
  },
  unmounted() {},
}
