import noteImg from './keep-type-cmp/keep-img.cmp.js'
import noteTxt from './keep-type-cmp/keep-text.cmp.js'
import noteTodos from './keep-type-cmp/keep-todo.cmp.js'
import noteVideo from './keep-type-cmp/keep-video.cmp.js'
import noteAudio from './keep-type-cmp/keep-audio.cmp.js'
import noteCanvas from './keep-type-cmp/keep-canvas.cmp.js'
import noteMap from './keep-type-cmp/keep-map.cmp.js'
import { keepService } from '../services/keep-service.js'
// import { ref } from '../../../../lib/vue.js'

export default {
  props: ['notes'],
  template: `
    <section class="note-list">
      <div class="grid">
        <div v-for="(note,idx) in notes" :key="note.id" class="grid-item">
            <component  :is="note.type" :note="note"></component>
            <div class="actions">
              <button @click="remove(note.id)">X</button>
              <button @click="duplicate(note)">duplicate</button>
              <router-link :to="'/keep/'+note.id" class='detailsK'>Details</router-link>
              <!-- <router-link :to="'/keep/edit/'+note.id">Edit</router-link> -->
            </div>
        </div>
      </div>
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
  mounted() {
    this.renderMasonryLayout()
  },
  methods: {
    renderMasonryLayout() {
      setTimeout(() => {
        var pckry = new Packery('.grid', {
          itemSelector: '.grid-item',
          transitionDuration: '0.2s',
          columnWidth: 315,
          rowHeight: 23,
        })
        pckry.getItemElements().forEach(function (itemElem) {
          var draggie = new Draggabilly(itemElem)
          pckry.bindDraggabillyEvents(draggie)
        })
      })
    },
    remove(noteId) {
      this.$emit('removed', noteId)
    },
    select(note) {
      this.$emit('selected', note)
    },
    duplicate(note) {
      keepService.addDuplicatedKeep(note).then((note) => this.$emit('renderDuplicatedNote', note))
      this.renderMasonryLayout()
    },
  },
  computed: {},
}
