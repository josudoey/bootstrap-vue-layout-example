import { mapGetters } from 'vuex'
import moment from 'moment'
import layout from '../layout'
export default {
  components: {
    layout: layout
  },
  computed: {
    ...mapGetters([
      'api'
    ])
  },
  filters: {
    localtime: function (t) {
      return moment(t).format('YYYY-MM-DD HH:mm')
    }
  },
  created: function () { },
  mounted: function () { },
  watch: {},
  methods: {
    copyText: function (text) {
      function selectElementText (element) {
        if (document.selection) {
          const range = document.body.createTextRange()
          range.moveToElementText(element)
          range.select()
        } else if (window.getSelection) {
          const range = document.createRange()
          range.selectNode(element)
          window.getSelection().removeAllRanges()
          window.getSelection().addRange(range)
        }
      }
      const element = document.createElement('div')
      element.textContent = text
      document.body.appendChild(element)
      selectElementText(element)
      document.execCommand('copy')
      element.remove()
    }
  }
}
