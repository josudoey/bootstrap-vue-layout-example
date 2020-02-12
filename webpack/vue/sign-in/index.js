import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
const component = {
  template: require('./template.pug'),
  data: function () {
    return {
      user: '',
      password: '',
      disabled: false
    }
  },
  created: function () {
  },
  mounted: function () {
    this.$emit('mounted')
  },
  methods: {
    signIn: async function () {
      this.disabled = true
      const res = await axios({
        maxRedirects: 0,
        url: '/auth',
        method: 'post',
        data: {
          user: this.user,
          password: this.password
        }
      })
      this.disabled = false
      if (res.status !== 200) {
        window.alert('sign in failed...')
        return
      }
      window.location.reload()
    }
  }

}

export default new Vue(component)
