export default {
  props: ['note'],
  template: `
  <div class="note" v-bind:style="note.style">
    <div>{{note.info.title}}</div>
    <div v-bind:style="{fontSize: 14 +'px'}">{{note.info.txt}}</div>
  </div>
  `,

  data() {
    return {}
  },
  methods: {},
  computed: {},
}
