import './style.css'
import sidenav from './sidenav'
export default {
  template: require('./template.pug'),
  data: function () {
    return {
      isOpenSidebar: false
    }
  },
  components: {
    sidenav: sidenav
  },
  methods: {
    signOut: function () {
      this.$store.dispatch('signOut').then(function () {
        window.location.reload()
      })
    }
  }
}
