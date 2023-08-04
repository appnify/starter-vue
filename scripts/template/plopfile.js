/**
 * 模板生成器
 * @param {import('plop').NodePlopAPI} plop
 */
export default function (plop) {
  plop.setGenerator('route', {
    description: '创建一个路由',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '请输入路由名称',
        validate: (value) => {
          if (!value) {
            return '请输入路由名称';
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../../src/pages/{{name}}.vue',
        templateFile: 'template-page.hbs',
      },
      {
        type: 'add',
        path: '../../src/pages/{{name}}/index.vue',
        templateFile: 'template-page.hbs',
      },
    ],
  });

  plop.setGenerator('page', {
    description: '创建一个页面',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '请输入页面名称',
        validate: (value) => {
          if (!value) {
            return '请输入页面名称';
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../../src/pages/{{name}}.vue',
        templateFile: 'template-page.hbs',
      },
    ],
  });
}
