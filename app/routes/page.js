const webpackStats = require('../webpack-asset').stats
const hash = webpackStats.hash.slice(0, 4)
const render = require('../render')
exports = module.exports = {}
exports.home = async function (ctx) {
  await render(ctx, 'home', {
    hash: hash
  })
}

exports.signIn = async function (ctx) {
  if (ctx.session.auth) {
    ctx.redirect('/')
    return
  }

  await render(ctx, 'sign-in', {})
}
