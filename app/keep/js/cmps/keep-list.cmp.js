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
    <div  v-if="shouldShowPinnedGridName" class="pinned-grid-name">Pinned</div>
    <div class="grid-pinned" ref="gridPinned">
        <div v-for="(pinnedNote,idx) in pinnedNotes" :key="pinnedNote.id" class="grid-pinned-item">
        <router-link :to="'/keep/'+pinnedNote.id" class='detailsK'> <component  :is="pinnedNote.type" :note="pinnedNote"></component></router-link>
            <div class="actions-keep">
              <button @click="remove(pinnedNote.id)"><i class="fa-solid fa-trash-can"></i></button>
              <button @click="duplicate(pinnedNote)"><i class="fa-solid fa-clone"></i></button>
              <button @click="tooglePinned(pinnedNote)"><i class="fa-solid fa-thumbtack"></i></button>
            </div>
            </div>
      </div>
      <div  v-if="shouldShowGridName" class="grid-name">Others</div>
      <div class="grid" ref="grid">
        <div v-for="(note,idx) in this.unPinnedNotes" :key="note.id" class="grid-item">
        <router-link :to="'/keep/'+note.id" class='detailsK'> <component  :is="note.type" :note="note"></component> </router-link>
            <div class="actions-keep">
              <button @click="remove(note.id)"><i class="fa-solid fa-trash-can"></i></button>
              <button @click="duplicate(note)"><i class="fa-solid fa-clone"></i></button>
              <button @click="tooglePinned(note)"><i class="fa-solid fa-thumbtack"></i></button>
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
    return {
      pinnedNotes: '',
      unPinnedNotes: '',
      shouldShowPinnedGridName: false,
      shouldShowGridName: false,
    }
  },
  created() {},
  mounted() {
    this.renderPackeryLayout()
  },
  methods: {
    renderPackeryLayout() {
      setTimeout(() => {
        const _pinnedNotes = this.notes.filter((note) => note.isPinned === true)
        this.pinnedNotes = _pinnedNotes
        const _notes = this.notes.filter((note) => note.isPinned === false)
        this.unPinnedNotes = _notes
        this.renderPackeryUnpinnedNotes()
        this.renderPackeryPinnedNotes()
        this.isPinnedGridLayoutEmpty()
        this.isGridLayoutEmpty()
      })
    },
    isPinnedGridLayoutEmpty() {
      setTimeout(() => {
        this.$refs.gridPinned.childElementCount === 0 ? (this.shouldShowPinnedGridName = false) : (this.shouldShowPinnedGridName = true)
      })
    },
    isGridLayoutEmpty() {
      setTimeout(() => {
        this.$refs.grid.childElementCount === 0 ? (this.shouldShowGridName = false) : (this.shouldShowGridName = true)
        if (this.pinnedNotes[0] === undefined) this.shouldShowGridName = false
      })
    },
    renderPackeryPinnedNotes() {
      setTimeout(() => {
        var pckry = new Packery('.grid-pinned', {
          itemSelector: '.grid-pinned-item',
          transitionDuration: '0.2s',
          columnWidth: 315,
          rowHeight: 53,
        })
        pckry.getItemElements().forEach(function (itemElem) {
          var draggie = new Draggabilly(itemElem)
          pckry.bindDraggabillyEvents(draggie)
        })
      })
    },
    renderPackeryUnpinnedNotes() {
      setTimeout(() => {
        var pckry = new Packery('.grid', {
          itemSelector: '.grid-item',
          transitionDuration: '0.2s',
          columnWidth: 315,
          rowHeight: 53,
        })
        pckry.getItemElements().forEach(function (itemElem) {
          var draggie = new Draggabilly(itemElem)
          pckry.bindDraggabillyEvents(draggie)
        })
      })
    },
    tooglePinned(note) {
      note.isPinned = !note.isPinned
      keepService.save(note).then(() => this.renderPackeryLayout())
      // this.$emit('renderDuplicatedNote', note)
    },
    remove(noteId) {
      this.$emit('removed', noteId)
      this.renderPackeryLayout()
    },
    select(note) {
      this.$emit('selected', note)
    },
    duplicate(note) {
      keepService.addDuplicatedKeep(note).then((note) => this.$emit('renderDuplicatedNote', note))
      this.renderPackeryLayout()
    },
  },
  computed: {},
}
