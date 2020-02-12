const consolidate = require('consolidate')
const path = require('path')
const basedir = path.resolve(__dirname, './templates')
exports = module.exports = async function (ctx, templateName, state) {
  const filepath = path.resolve(basedir, templateName, './page.pug')
  const locals = Object.assign({}, ctx.state, state)
  return consolidate.pug(filepath, locals).then(html => {
    ctx.status = 200
    ctx.body = html
  })
}
