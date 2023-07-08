import { defineConfig } from "vitepress";

/**
 * 站点配置
 * @see https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  lang: "zh-CN",
  title: "绝弹博客",
  description: "一位前端开发者的博客",
  /**
   * 主题配置
   * @see https://vitepress.dev/reference/default-theme-config
   */
  themeConfig: {
    logo: "/juetan.jpg",
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索",
          },
          modal: {
            noResultsText: "没有找到结果",
            resetButtonTitle: "重置搜索",
            footer: {
              selectText: "选择",
              navigateText: "移动",
              closeText: "关闭",
            },
          },
        },
      },
    },
    outline: {
      label: "本篇目录",
    },
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "前端开发",
        link: "/front-end/",
      },
      {
        text: "后端开发",
        items: [
          {
            text: "测试1",
            link: "/test1",
          },
          {
            text: "测试2",
            link: "/test2",
          },
        ],
      },
      {
        text: '日常记录',
        link: '/'
      },
      {
        text: "开发工具",
        link: "/dev-tools",
      },
    ],
    sidebar: {
      "/front-end/": [
        {
          text: "基础知识",
          items: [
            {
              text: "HTML中的标签有多少个?",
              link: "/front-end/a",
            },
            {
              text: "Runtime API示例",
              link: "/front-end/b",
            },
          ],
        },
        {
          text: '工具类库',
          items: [
            {
              text: 'Lodash在日常开发中有用的函数'
            }
          ]
        },
        {
          text: 'vue',
          items: [
            {
              text: '如何将.vue文件编译成js文件?'
            }
          ]
        },
        {
          text: '浏览器',
          items: [
            {
              text: '浏览器Console面板中有用的调试技巧',
            },
            {
              text: '如何利用EJS模板引擎辅助生成代码?',
              link: '/front-end/ejs-generate-code'
            },
            {
              text: '项目中的字典常量应该如何维护?'
            },
            {
              text: '从new xx()和new xx的区别聊聊JS中操作符的优先级问题',
              link: '/front-end/js-operator-priority'
            },
            {
              text: 'TailwindCSS中一些有意思的用法和实现'
            },
            {
              text: '函数柯里化是什么如何实现它?'
            },
            {
              text: '写一个VITE插件: 根据配置加载不同后缀的文件'
            }
          ]
        }
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/juetan",
      },
    ],
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    footer: {
      message: "© 2023 JueTan",
      copyright: "绝弹博客 版权所有",
    },
  },

  markdown: {
    theme: "github-dark-dimmed",
    lineNumbers: true,
  },
});
