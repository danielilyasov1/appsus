import { keepService } from '../services/keep-service.js'

export default {
  template: `
    <section>
      <div  v-if="shouldShow" class='editable'>
        <button class="add-pin-btn" :style="newNote.isPinned ? pinStyle : null" @click="tooglePinned"><i class="fa-solid fa-thumbtack"></i></button>
        <div class="image-container">
          <img ref="uploadedImg" class="add-pin-img" :src="previewImage"  />
          <button v-if="isImage" @click="removeImg" class="remove-img-btn"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div contenteditable @click="deleteTitle($event)" @blur="onEditTitle" class="keep-title">Title</div>
        <div ref="textbox" contenteditable class="keep-text" @blur="onEditText">Take a note...</div>
        <input class="file-upload-button" type="file" accept="image/*" @change="uploadImage">
        <button class="close-btn" @click="createNewNote">close</button>
      </div>
      <input @click="showTextBox" v-if="!shouldShow" contenteditable='true' class='editable-iput' placeholder='Take a note...'/>
    </section>
`,
  /* <button class="add-pin-image" @click="uploadImage($event)"><i class="fa-solid fa-image"></i></button> */
  /* <input v-model='noteName' type='search' placeholder='search note from google...' > */
  /* <button @click='searchNote'>search</button> */
  data() {
    return {
      shouldShow: false,
      deletedTitle: false,
      previewImage: undefined,
      isImage: false,
      newNote: {
        type: '',
        info: { src: '', title: '', txt: '' },
        isPinned: false,
        style: '',
      },
      pinStyle: { background: '#00000050', borderRadius: '50%', transform: 'scale(1.1)', transformOrigin: 'center' },
    }
  },
  created() {},
  methods: {
    resetAdder() {
      ;(this.shouldShow = false),
        (this.deletedTitle = false),
        (this.previewImage = undefined),
        (this.isImage = false),
        (this.newNote = {
          type: '',
          info: { src: '', title: '', txt: '' },
          isPinned: false,
          style: '',
        })
    },
    onEditTitle(event) {
      this.newNote.info.title = event.target.innerText
    },
    onEditText(event) {
      this.newNote.info.txt = event.target.innerText
    },
    tooglePinned() {
      this.newNote.isPinned = !this.newNote.isPinned
    },
    createNewNote() {
      if (this.newNote.type !== 'note-img') this.newNote.type = 'note-txt'
      keepService.addDuplicatedKeep(this.newNote)
      this.resetAdder()
    },
    removeImg() {
      this.$refs.uploadedImg.src = ''
      this.isImage = false
    },

    uploadImage(e) {
      const [image] = e.target.files
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.previewImage = e.target.result
        this.isImage = true
        this.newNote.type = 'note-img'
        this.newNote.info.src = e.target.result
      }
    },
    showTextBox() {
      this.shouldShow = true
      this.$nextTick(() => {
        this.$refs.textbox.focus()
        this.$refs.textbox.innerText = ''
      })
    },
    deleteTitle(e) {
      if (!this.deletedTitle) e.target.innerText = ''
    },
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
