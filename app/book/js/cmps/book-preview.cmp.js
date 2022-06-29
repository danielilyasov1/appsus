export default {
  props: ["book"],
  template: `
      <img :src="bookImgUrl" alt="">
      <p>Title: {{book.title}}</p>
      <p :class='priceColor' >Price: {{book.listPrice.amount}}{{sign}}</p>
  `,
  data() {
    return {}
  },
  methods: {},
  computed: {
    bookImgUrl() {
      return `${this.book.thumbnail}`
    },
    sign() {
      switch (this.book.listPrice.currencyCode) {
        case "USD":
          return "$"
        case "EUR":
          return "€"
        case "ILS":
          return "₪"
      }
    },
    priceColor() {
      if (this.book.listPrice.amount > 150) return "color-red"
      if (this.book.listPrice.amount < 20) return "color-green"
    },
  },
}

