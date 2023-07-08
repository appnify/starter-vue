import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import { EnhanceAppContext } from 'vitepress'

/**
 * 自定义主题
 * @see https://vitepress.dev/guide/custom-theme
 */
export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    // ...
  }
}
