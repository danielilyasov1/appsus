export default {
  props: ['note'],
  template: `
  <img  alt="">
  <p>Id: {{note.id}}</p>
  <p> type: {{note.type}}</p>
  <p> infoTxt: {{note.info}}</p>
  `,

  data() {
    return {}
  },
  methods: {},
  computed: {},
}
