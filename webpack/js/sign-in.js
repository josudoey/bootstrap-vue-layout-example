import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
NProgress.start()

async function main () {
  const vueInstance = (await import('../vue/sign-in')).default
  vueInstance.$on('mounted', function () {
    NProgress.done()
  })
  vueInstance.$mount('#app')
}
main()
