import { keepService } from '../services/keep-service.js'

export default {
  template: `
 <!-- <h2>hi</h2>

 <button @click='clickBack'>Back</button> -->
    <section>
        <input v-model='noteName' type='search' placeholder='search note from google...' >
       <button @click='searchNote'>search</button>
       <ul><li v-for="note in notes"><button @click='addNote(note)'>➕</button>{{note.title}}</li></ul>
    </section>

`,
  data() {
    return {
      noteName: '',
      notes: null,
    }
  },
  created() {},
  methods: {
    clickBack() {
      this.$router.back()
    },
    valueSearch() {
      this.$emit('search', this.noteName)
    },
    searchNote() {
      keepService.getNoteFromApi(this.noteName).then((notes) => {
        this.notes = notes
        console.log(notes)
      })
    },
    addNote(note) {
      keepService.addNote(note)
    },
  },
  computed: {},
  unmounted() {},
}
