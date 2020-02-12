
let webpackStats = { hash: '' }
try {
  webpackStats = require('../build/stats')
} catch (err) {
  console.error('webpack stats can\'t load')
}

exports = module.exports = {
  stats: webpackStats
}
