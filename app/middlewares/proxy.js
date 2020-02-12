const Proxy = require('http-proxy-middleware')
module.exports = koaProxy
function koaProxy (context, opts) {
  opts.onProxyReq = function (proxyReq, req, res) {
    proxyReq.setHeader('cookie', '')
    if (req.headers['X-Forwarded-For']) {
      proxyReq.setHeader('X-Forwarded-For', req.headers['X-Forwarded-For'])
    }
  }
  const middleware = Proxy(context, opts)
  return (ctx, next) => {
    return new Promise((resolve, reject) => {
      const { req, res } = ctx
      middleware(req, res, (err) => {
        err ? reject(err) : resolve(next())
      })
    })
  }
}
