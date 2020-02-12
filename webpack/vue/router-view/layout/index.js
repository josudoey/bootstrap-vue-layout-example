require('./style.css')
export default {
  template: require('./template.pug'),
  data: function () {
    return {

    }
  },
  created: async function () {

  },
  watch: {
  },
  methods: {
    signOut: function () {
      this.$store.dispatch('signOut').then(function () {
        window.location.reload()
      })
    }
  }
}
