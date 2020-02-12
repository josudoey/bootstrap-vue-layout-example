import Base from '../base'
export default {
  template: require('./template.pug'),
  data: function () {
    return {
    }
  },
  components: Object.assign({}, Base.components),
  filters: Object.assign({}, Base.filters),
  computed: Object.assign({}, Base.computed),
  created: function () {
  },
  mounted: function () { },
  watch: {
    $route: function (val) {
    }
  },
  methods: {

  }
}
