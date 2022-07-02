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
              <div class="actions-keep">
                <button @click="remove(note.id)"><i class="fa-solid fa-trash-can"></i></button>
                <button @click="duplicate(note)"><i class="fa-solid fa-clone"></i></button>
                <button @click="tooglePinned(note)"><i class="fa-solid fa-thumbtack"></i></button>
                <button @click='clickBack'><i class="fa-solid fa-angles-left"></i></button>
                <button @click='nextNote'><i class="fa-solid fa-angles-right"></i></button>
              </div>
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
    nextNote() {
      this.$router.push(`/keep/${this.nextnoteId}`)
    },
    tooglePinned(note) {
      note.isPinned = !note.isPinned
      keepService.save(note)
      this.$router.push('/keep/')
    },
    remove(noteId) {
      keepService.remove(noteId)
      this.$router.push('/keep/')
    },
    duplicate(note) {
      keepService.addDuplicatedKeep(note)
      this.$router.push('/keep/')
    },
    clickBack() {
      this.$router.back()
    },
  },
  computed: {},
  watch: {
    '$route.params.keepId': {
      handler() {
        const id = this.$route.params.keepId
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
