import noteImg from './img-keep.cmp.js'
import noteTxt from './text-keep.cmp.js'
import noteTodos from './text-keep.cmp.js'

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
