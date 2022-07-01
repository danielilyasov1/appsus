export default {
  props: ['note'],
  template: `
  <div class="note" v-bind:style="note.style">
    <div class="keep-title">{{note.info.title}}</div>
    <img :src="note.info.src" alt="not rendering">
  </div>
  `,
  data() {
    return {}
  },
  mounted() {
    console.log(this.note.style)
  },
  methods: {},
  computed: {},
}
