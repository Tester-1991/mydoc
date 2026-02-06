// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'StoneTest测试',
  tagline: '专注于自动化测试、测试开发、AI测试',
  favicon: 'img/favicon.ico',

  url: 'https://your-domain.com',
  // baseUrl  需要改成你的仓库名，如果你启用了GitHub Pages，请改成你的仓库名,默认是/
  baseUrl: 'mydoc',
  // 对于死链接，默认是warn，可以改成其他的选项，比如ignore,throw
  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"], // 支持中英文
        indexBlog: true, // 是否索引博客
        indexDocs: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false, // 禁用博客
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'StoneTest',
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg',
        },
        items: [
          
          {
            to: '/docs/python/python基础/1',
            label: '📘文档',
            position: 'left',
          },
          // 类型3：下拉菜单
          {
            type: 'dropdown',
            label: '更多',
            position: 'left',
            items: [
              {
                label: 'github',
                to: 'https://github.com/Tester-1991',
              },
              {
                label: '文档',
                to: '/docs/python/python基础/1',
              },
//              {
//                label: 'AIChatOS',
//                href: 'https://cht18.aichatosclx.com/',
//              },

            ],
          },
          //右边链接
          // 类型6：搜索框
          {
            type: 'search',
            position: 'right',
          },

          // 类型7：语言切换
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/wxhzhwxhzh',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: '学习资源',
            items: [
              {
                label: 'Python 基础',
                to: '/docs/python/python基础/1',
              },
              {
                label: '自动化测试',
                to: '/docs/python/python基础/1',
              },
              {
                label: '接口测试',
                to: '/docs/python/python基础/1',
              },
            ],
          },
          {
            title: '关注我',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Tester-1991',
              },
              {
                label: 'CSDN',
                href: 'https://blog.csdn.net/qq_22693733',
              },
            ],
          },
          {
            title: '关于',
            items: [
              {
                label: '关于博主',
                to: '/',
              },
              {
                label: '联系方式',
                to: '/',
              },
            ],
          },
        ],
        copyright: `<div style="text-align: center; padding: 1rem 0;">
          <div style="margin-bottom: 0.5rem; font-size: 0.9rem;">
            <strong>StoneTest 软件测试教程</strong> · 博主：石岩
          </div>
          <div style="font-size: 0.85rem; color: #888;">
            Copyright © ${new Date().getFullYear()} 石岩 (StoneTest) | 用心分享，共同成长
          </div>
        </div>`,
      },

      prism: {
        theme: themes.github,
        darkTheme: themes.nightOwl,
      },
      // -----------插件----------
      plugins: [
        '@docusaurus/plugin-search',
        // 其他插件...
      ],

      // ---------- 公告栏 ----------
//      announcementBar: {
//        id: 'support_us',
//        content:
//          '⭐️ 如果你喜欢这个网站，请在 <a target="_blank" rel="noopener noreferrer" href="https://github.com/wxhzhwxhzh">GitHub</a> 给我们一个 Star！',
//        backgroundColor: '#fafbfc',
//        textColor: '#091E42',
//        isCloseable: true,
//      },
    }),
};

module.exports = config;