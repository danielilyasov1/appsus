export default {
  props: ['note'],
  template: `
  <div class="note" v-bind:style="note.style">
    <div class="keep-title">{{note.info.label}}</div>
    <ul>
      <li v-for="todo in note.info.todos"  class="keep-text">
        {{todo.txt}}
        <span>{{doneAt(todo.doneAt)}}</span>
      </li>
    </ul>
  </div>
    `,

  data() {
    return {}
  },
  methods: {
    doneAt(time) {
      console.log()
      if (typeof time !== typeof 0) return
      const date = new Date(time)
      return date.toLocaleString()
    },
  },
  computed: {},
}
