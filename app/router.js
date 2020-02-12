const log = require('./middlewares/log')
const multer = require('./middlewares/multer')
const upload = multer({
  storage: multer.memoryStorage()
})

const page = require('./routes/page')
const auth = require('./routes/auth')

const koaRouter = require('koa-router')
const router = koaRouter({})
router.use(log)
router.get('/', page.home)
router.get('/sign-in', page.signIn)
router.get('/sign-out', auth.signOut)
router.post('/auth', auth.basic)
router.get('/auth/state', auth.state)
exports = module.exports = router
