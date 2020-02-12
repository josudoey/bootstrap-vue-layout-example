const axios = require('axios')
const urlTemplate = require('url-template')

const Axios = Symbol('Axios')
const Method = Symbol('Method')
const Data = Symbol('Data')
const Headers = Symbol('Headers')
const Config = Symbol('Config')
const Url = Symbol('Url')
class AxiosChain {
  constructor (axios, method, url) {
    this[Axios] = axios
    this[Method] = method
    this[Url] = url
    this[Headers] = undefined
    this[Data] = undefined
    this[Config] = undefined
  }

  headers (headers) {
    this[Headers] = headers
    return this
  }

  data (data) {
    this[Data] = data
    return this
  }

  config (config) {
    this[Config] = config
    return this
  }

  exec () {
    const axios = this[Axios]
    const method = this[Method]
    const url = this[Url]
    const data = this[Data]
    const config = this[Config]
    const axiosConfig = Object.assign({}, config)
    axiosConfig.headers = Object.assign({}, axiosConfig.headers, this[Headers])
    Object.assign(
      axiosConfig,
      {
        method: method,
        url: url,
        data: data
      }
    )
    return axios(axiosConfig)
  }

  then (onFulfilled, onRejected) {
    return this.exec().then(onFulfilled).catch(onRejected)
  }
}

class HttpApiClient {
  constructor (baseURL) {
    this.axios = axios.create({
      baseURL: baseURL,
      headers: {
        common: {}
      },
      validateStatus: function () {
        return true
      }
    })
  }
}

const method = function (methodName) {
  return function (uriTemplate) {
    if (!uriTemplate) {
      throw new Error('uriTemplate is require')
    }

    const template = urlTemplate.parse(uriTemplate)
    return function (uriExpand) {
      const url = template.expand(uriExpand)
      return new AxiosChain(this.axios, methodName, url)
    }
  }
}

HttpApiClient.get = method('get')
HttpApiClient.post = method('post')
HttpApiClient.put = method('put')
HttpApiClient.delete = method('delete')

exports = module.exports = HttpApiClient
