// ref https://vuex.vuejs.org/en/api.html
const ApiClient = require('./http-api-client/api')
const api = new ApiClient('/')
const store = {
  state: {}
}
const defaultState = {
  auth: null
}
Object.assign(store.state, defaultState)

store.mutations = {}

const actions = store.actions = {}
actions.getAuthState = async function ({ state, commit, rootGetters }, payload) {
  let auth = state.auth
  if (auth) {
    if (Date.now() > auth.expire) {
      return
    }
    return auth
  }
  const res = await api.getAuthState().exec()
  if (res.status !== 200) {
    Object.assign(state, defaultState)
    return
  }
  Object.assign(state, defaultState)
  state.auth = auth = res.data
  setInterval(function () {
    if (Date.now() > auth.expire) {
      window.location.reload()
    }
  }, 1000)
  return auth
}

actions.signOut = function (context, payload) {
  const { state, commit, rootGetters } = context
  payload = Object.assign({}, payload)
  return api.signOut().exec()
}

store.getters = {
  api: function () {
    return api
  },
  isAdmin: function (state) {
    const { auth } = state
    if (auth.role !== 'admin') {
      return false
    }
    return true
  }
}

exports = module.exports = store
