export default {
  props: ['note'],
  template: `
  <div  v-bind:style="note.style">
  <div class="keep-title">{{note.info.title}}</div>
          <iframe :src="note.info.src" width="250"></iframe>
  </div>
  `,

  data() {
    return {}
  },
  methods: {},
  computed: {},
}
