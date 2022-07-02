import { keepService } from '../../services/keep-service.js'
export default {
  props: ['note'],
  template: `
  <div class="note" v-bind:style="note.style">
    <div contenteditable @blur="onEditTitle" class="keep-title">{{note.info.label}}</div>
    <ul>
      <li v-for="(todo,i) in note.info.todos"  class="keep-text">
      <input type="checkbox" id="note.id"  :checked="isCheacked(todo.doneAt)">
       <div contenteditable @blur="onEditText($event,i)">{{todo.txt}}</div>
        <span>{{doneAt(todo.doneAt)}}</span>
      </li>
    </ul>
  </div>
    `,
  // v-bind:id="note.id"
  data() {
    return {}
  },
  methods: {
    isCheacked(time) {
      if (typeof time === typeof 0) return true
    },
    doneAt(time) {
      if (typeof time !== typeof 0) return
      const date = new Date(time)
      return date.toLocaleString()
    },
    onEditTitle(event) {
      console.log(this.note.info.label)
      console.log(event.target.innerText)
      this.note.info.label = event.target.innerText
      keepService.save(this.note)
    },
    onEditText(event, i) {
      this.note.info.todos[i].txt = event.target.innerText
      keepService.save(this.note)
    },
  },
  computed: {},
}
