import noteImg from './keep-type-cmp/keep-img.cmp.js'
import noteTxt from './keep-type-cmp/keep-text.cmp.js'
import noteTodos from './keep-type-cmp/keep-todo.cmp.js'
import noteVideo from './keep-type-cmp/keep-video.cmp.js'
import noteAudio from './keep-type-cmp/keep-audio.cmp.js'
import noteCanvas from './keep-type-cmp/keep-canvas.cmp.js'
import noteMap from './keep-type-cmp/keep-map.cmp.js'

export default {
  props: ['notes'],
  template: `
 <section v-if="notes" class="note-list">
        <ul>
            <li v-for="(note,idx) in notes" :key="note.id" class="note-preview-container">
                <component :is="note.type" :note="note"></component>
                <div class="actions">
                    <button @click="remove(note.id)">X</button>
                    <router-link :to="'/keep/'+note.id" class='details'>Details</router-link>
                    <!-- <router-link :to="'/keep/edit/'+note.id">Edit</router-link> -->
                </div>
            </li>
        </ul>
    </section>
`,
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo,
    noteAudio,
    noteCanvas,
    noteMap,
  },

  data() {
    return {}
  },
  methods: {
    remove(noteId) {
      this.$emit('removed', noteId)
    },
    select(note) {
      this.$emit('selected', note)
    },
  },
  computed: {},
}
