export default {
  props: ["note"],
  template: `
      <img :src="noteImgUrl" alt="">
      <p>Title: {{note.title}}</p>
      <p :class='priceColor' >Price: {{note.listPrice.amount}}{{sign}}</p>
  `,
  data() {
    return {}
  },
  methods: {},
  computed: {
    noteImgUrl() {
      return `${this.note.thumbnail}`
    },
    sign() {
      switch (this.note.listPrice.currencyCode) {
        case "USD":
          return "$"
        case "EUR":
          return "€"
        case "ILS":
          return "₪"
      }
    },
    priceColor() {
      if (this.note.listPrice.amount > 150) return "color-red"
      if (this.note.listPrice.amount < 20) return "color-green"
    },
  },
}

