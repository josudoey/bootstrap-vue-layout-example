const page404 = function (resolve) {
  resolve({
    template: '<layout><h1>page not found</h1></layout>',
    data: function () {
      return {}
    }
  })
}

const page501 = function (resolve) { /* eslint-disable-line */
  resolve({
    template: '<layout><h1>page not implment</h1></layout>',
    data: function () {
      return {}
    }
  })
}

// webpack code-splitting
// ref https://webpack.js.org/guides/code-splitting/
exports = module.exports = {
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [{
    name: 'index',
    path: '/',
    redirect: { name: 'example-table' }
  }, {
    name: 'example-table',
    path: '/example/table',
    component: function (resolve) {
      require(['./view/example-table'], resolve)
    }
  }, {
    name: 'example-modal',
    path: '/example/modal',
    component: function (resolve) {
      require(['./view/example-modal'], resolve)
    }
  }, {
    name: 'page404',
    path: '/:any*',
    component: page404
  }]
}
