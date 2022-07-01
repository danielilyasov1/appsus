export default {
  props: ['note'],
  template: `
  <div class="note" v-bind:style="note.style">
    <div class="keep-title">{{note.info.title}}</div>
    <div class="keep-text">{{note.info.txt}}</div>
  </div>
  `,

  data() {
    return {}
  },
  methods: {},
  computed: {},
}
