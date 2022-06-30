import { keepService } from '../services/keep-service.js'
import { eventBus } from '../services/eventBus-service.js'

export default {
  template: `
        <section v-if="noteToEdit" class="note-edit app-main">
            <h4>{{pageTitle}}</h4>
            <form @submit.prevent="save">
                <input type="text" v-model="noteToEdit.title" placeholder="Title">
                <input type="number" v-model.number="noteToEdit.price" placeholder="Price">
                <button>Save</button>
            </form>
        </section>
    `,
  data() {
    return {
      noteToEdit: null,
    }
  },
  created() {
    const id = this.$route.params.noteId
    if (id) {
      keepService.get(id).then((note) => (this.noteToEdit = note))
    } else {
      this.noteToEdit = keepService.getEmptyNote()
    }
  },
  methods: {
    save() {
      if (!this.noteToEdit.title) return
      keepService.save(this.noteToEdit).then((note) => {
        this.$router.push('/keep')
        eventBus.emit('show-msg', { txt: 'Saved successfully', type: 'success' })
      })
    },
  },
  computed: {
    pageTitle() {
      const id = this.$route.params.noteId
      return (id = 'Add keep')
    },
  },
}
