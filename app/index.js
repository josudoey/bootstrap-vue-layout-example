const path = require('path')
const Koa = require('koa')
const staticCache = require('koa-static-cache')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
app.keys = ['APP-KEYS']
app.proxy = true

app.use(bodyParser({
  jsonLimit: '1mb',
  formLimit: '56kb'
}))
const sessionMiddleware = session({
  key: 'app:sess',
  maxAge: 1000 * 60 * 60,
  prefix: ''
}, app)
app.use(sessionMiddleware)

const router = require('./router')
app.use(router.routes())

const buildStaticPath = path.resolve(__dirname, '../build/public')
const buildStaticCache = staticCache(buildStaticPath, {
  maxAge: 1000 * 60 * 60,
  dynamic: true
})
app.use(buildStaticCache)

module.exports = app
