const bunyan = require('bunyan')

module.exports = exports = bunyan.createLogger({
  name: 'app',
  level: 'trace',
  serializers: bunyan.stdSerializers
})
