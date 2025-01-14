import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'

import { search as zhSearch } from './zh'

export const shared = defineConfig({
  title: 'Aide',

  rewrites: {
    'en/:rest*': ':rest*'
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    lineNumbers: false
  },

  sitemap: {
    hostname: 'https://aide.nicepkg.cn',
    transformItems(items) {
      return items.filter(item => !item.url.includes('migration'))
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo-mini.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo-mini.png' }],
    ['meta', { name: 'theme-color', content: '#8c6bef' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    [
      'meta',
      {
        property: 'og:title',
        content: 'Aide | Mastering Any Code In VSCode'
      }
    ],
    ['meta', { property: 'og:site_name', content: 'Aide' }],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://aide.nicepkg.cn/og-cover.png'
      }
    ],
    ['meta', { property: 'og:url', content: 'https://aide.nicepkg.cn/' }]
  ],

  themeConfig: {
    logo: { src: '/logo-mini.svg', width: 24, height: 24 },

    socialLinks: [{ icon: 'github', link: 'https://github.com/nicepkg/aide' }],

    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: 'xxx',
    //     apiKey: 'xxx',
    //     indexName: 'aide',
    //     locales: {
    //       ...zhSearch
    //     }
    //   }
    // }

    search: {
      provider: 'local'
    }
  },

  vite: {
    plugins: [
      Unocss({
        configFile: '../../uno.config.ts'
      })
    ]
  }
})
