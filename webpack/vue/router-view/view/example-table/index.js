import Base from '../base'
export default {
  template: require('./template.pug'),
  components: Object.assign({}, Base.components),
  filters: Object.assign({}, Base.filters),
  computed: Object.assign({}, Base.computed),
  data: function () {
    const query = this.$route.query
    return {
      q: query.q || '',
      skip: query.skip || 0,
      total: 0,
      limit: query.limit || 25,
      items: [{ status: 'TEST' }],
      currentPage: 1
    }
  },
  created: function () {
    this.search()
  },
  mounted: function () { },
  watch: {
    $route: function (val) {
      this.search()
    }
  },
  methods: {
    search: async function () {
    },
    changeRoute: function () {
      const route = {
        name: this.$route.name,
        query: Object.assign({}, this.$route.query),
        params: this.$route.params
      }
      route.query.skip = this.skip
      route.query.q = this.q
      route.query.limit = this.limit
      this.$router.push(route).catch(function (e) {})
    },
    changePage: function (page) {
      this.skip = this.limit * (page - 1)
      this.changeRoute()
    }
  }
}
