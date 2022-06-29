import keepPreview from './keep-preview.cmp.js'

export default {
  props: ['notes'],
  template: `
 <section v-if="notes" class="note-list">
        <ul>
            <li v-for="(note,idx) in notes" :key="note.id" class="note-preview-container">
                <note-preview :note="note"/>
                <div class="actions">
                    <button @click="remove(note.id)">X</button>
                    <router-link :to="'/note/'+note.id" class='details'>Details</router-link>
                    <!-- <router-link :to="'/note/edit/'+note.id">Edit</router-link> -->
                </div>
            </li>
        </ul>
    </section>
`,
  components: {
    keepPreview,
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
