export default {
  props: ['note'],
  template: `
  <section>
    <label>
      <div v-for="item in note.info">
        {{item}}
      </div>
    </label>
  </section>
  `,

  data() {
    return {}
  },
  methods: {},
  computed: {},
}
