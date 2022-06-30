export default {
  props: ['notes'],
  template: `
    <section class="filter-notes" >
    Search:
	<input type="text" v-model="filterBy.title"  @input="filter" placeholder='Enter note name..'>
    note type:
    <select v-model="filterBy.type" @input="filter">
      <option value="">Please the note type</option>
      <option value="note-img">Image</option>
      <option value="note-txt">Text</option>
      <option value="note-todos">Todo</option>
      <option value="note-video">Video</option>
      <option value="note-canvas">Canvas</option>
      <option value="note-audio">Audio</option>
      <option value="note-map">Map</option>
    </select>
    </section>
  `,
  data() {
    return {
      filterBy: {
        title: '',
        type: '',
      },
    }
  },
  created() {},
  methods: {
    filter() {
      this.$emit('filtered', this.filterBy)
      // JSON.parse(JSON.stringify(this.filterBy))
    },
  },
  computed: {},
  components: {},
}
