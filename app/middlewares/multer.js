const Multer = require('multer')
module.exports = koaMulter
koaMulter.diskStorage = Multer.diskStorage
koaMulter.memoryStorage = Multer.memoryStorage
function koaMulter (options) {
  const multer = Multer(options)
  wrap(multer, 'any')
  wrap(multer, 'array')
  wrap(multer, 'fields')
  wrap(multer, 'none')
  wrap(multer, 'single')
  return multer
}

function wrap (multer, name) {
  const fn = multer[name]
  multer[name] = function () {
    const middleware = fn.apply(this, arguments)
    return async function (ctx, next) {
      const err = await new Promise((resolve, reject) => {
        const { req, res } = ctx
        middleware(req, res, (err) => {
          err ? resolve(err) : resolve()
        })
      })

      if (err) {
        ctx.status = 400
        ctx.body = {
          message: `${(err.field ? "'" + err.field + "' " : '')}${err.message}`
        }
        return
      }
      return next()
    }
  }
}
