export default {
  props: ['note'],
  template: `
  <div  v-bind:style="note.style">
  <div>{{note.info.title}}</div>
          <iframe :src="note.info.src"></iframe>
  </div>
  `,

  data() {
    return {}
  },
  methods: {},
  computed: {},
}
