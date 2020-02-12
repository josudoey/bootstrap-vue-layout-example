module.exports = function (prog) {
  prog
    .command('server')
    .option('-p, --port <port>', 'web service listen port default:[8000]', 8000)
    .description('start http service.')
    .action(async function (opts) {
      const http = require('http')
      const Log = require('../app/logger')
      const app = require('../app')

      const server = http.createServer(app.callback()).listen(opts.port)

      app.on('error', function (err) {
        Log.error(err)
      })

      server.on('listening', async function () {
        const address = server.address()
        const port = address.port
        Log.info(`service listen on ${port}`)
        app.emit('listening', server)
      })

      server.on('error', function (err) {
        Log.error(err)
        process.exit(1)
      })

      process.removeAllListeners('uncaughtException')
      process.on('uncaughtException', function (err) {
        Log.error(err.stack)
      })

      process.removeAllListeners('unhandledRejection')
      process.on('unhandledRejection', function (err) {
        Log.error(err.stack)
      })
    })

  prog
    .command('dev')
    .option('-p, --port <port>', 'web service listen port default:[8000]', 8000)
    .description('start dev http service.')
    .action(async function (opts) {
      const configWebpack = require('../webpack/config.dev')
      const webpack = require('webpack')
      const compiler = webpack(configWebpack)
      const WebpackDevServer = require('webpack-dev-server')
      const path = require('path')
      const configWebpackDevServer = {
        contentBase: path.resolve('./build/public'),
        publicPath: configWebpack.output.publicPath,
        hot: false,
        inline: false,
        quiet: false,
        noInfo: false,
        stats: {
          colors: true
        },
        watchOptions: {
          aggregateTimeout: 300,
          poll: 5000
        }
      }
      compiler.devtool = 'source-map'

      const http = require('http')
      const Log = require('../app/logger')
      const app = require('../app')

      const server = http.createServer(app.callback()).listen(0)

      app.on('error', function (err) {
        Log.error(err)
      })

      server.on('listening', async function () {
        const address = server.address()
        const port = address.port
        Log.info(`service listen on ${address}:${port}`)
        app.emit('listening', server)
        configWebpackDevServer.proxy = [{
          context: ['**', '!/b/*'],
          target: `http://localhost:${port}`
        }]
        const webpackServer = new WebpackDevServer(compiler, configWebpackDevServer)
        webpackServer.listen(opts.port, '127.0.0.1', function () {
          // const app = server.listeningApp
          const httpListen = `127.0.0.1:${opts.port}`
          Log.info('[webpack-dev-server]', 'Http Listen in ' + httpListen)
        })
      })

      server.on('error', function (err) {
        Log.error(err)
        process.exit(1)
      })

      process.removeAllListeners('uncaughtException')
      process.on('uncaughtException', function (err) {
        Log.error(err.stack)
      })

      process.removeAllListeners('unhandledRejection')
      process.on('unhandledRejection', function (err) {
        Log.error(err.stack)
      })
    })
}
