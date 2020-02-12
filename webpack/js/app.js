import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
NProgress.start()

async function main () {
  const vueInstance = (await import('../vue/router-view')).default
  vueInstance.$on('mounted', function () {
    NProgress.done()
  })
  vueInstance.$mount('#app')
}
main()
