import { keepService } from '../../services/keep-service.js'
export default {
  props: ['note'],
  template: `
  <div class="note" v-bind:style="note.style">
  <div class="writing-container">
    <div contenteditable class="keep-title" @blur="onEditTitle">{{note.info.title}}</div>
    <div contenteditable class="keep-text" @blur="onEditText">{{note.info.txt}}</div>
  </div>
  </div>
  `,

  data() {
    return {}
  },
  methods: {
    onEditTitle(event) {
      this.note.info.title = event.target.innerText
      keepService.save(this.note)
    },
    onEditText(event) {
      this.note.info.txt = event.target.innerText
      keepService.save(this.note)
    },
  },
  computed: {},
}
