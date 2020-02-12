
const HttpApiClient = require('./base')
class Client extends HttpApiClient {
  get getAuthState () {
    return HttpApiClient.get('/auth/state')
  }
}

exports = module.exports = Client
