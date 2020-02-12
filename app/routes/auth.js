const Url = require('url')
const Joi = require('@hapi/joi')

const Log = require('../logger')
exports = module.exports = {}
exports.state = async function (ctx) {
  const auth = ctx.session.auth
  if (!auth) {
    ctx.status = 401
    return
  }
  ctx.status = 200
  ctx.body = Object.assign({
    expire: ctx.session._expire
  }, auth)
}

const getAllowReferer = function (ctx) {
  try {
    const referer = new Url.URL(ctx.get('referer'))
    // TODO
    // const allowOrigin = []
    // if (allowOrigin.indexOf(referer.origin) >= 0) {
    //   return referer
    // }
    return referer
  } catch (err) {}
}

const basicBodySchema = Joi.object({
  user: Joi.string().required(),
  password: Joi.string().required()
})

exports.basic = async function (ctx) {
  const { error, value } = basicBodySchema.validate(ctx.request.body)
  if (error) {
    ctx.status = 401
    ctx.body = {
      message: error.details[0].message
    }
    return
  }

  ctx.session.auth = {
    email: value.user,
    name: value.user,
    role: 'admin'
  }

  ctx.redirect('/')
}

exports.signOut = async function (ctx) {
  ctx.session = null
  ctx.status = 200
  const referer = getAllowReferer(ctx)
  if (referer) {
    ctx.redirect(referer)
    return
  }
  ctx.redirect('/')
}
