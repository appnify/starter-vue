import { readFileSync, writeFileSync } from "fs";
import parser from "@apidevtools/swagger-parser";
import ejs from "ejs";

async function run() {
  const apiJson = JSON.parse(readFileSync("./openapi.json", "utf-8"));
  const parsed = await parser.validate(apiJson);
  const list = Object.entries(parsed.paths || {});

  const routes: any = [];
  for (const [path, pathObj] of list) {
    for (const [method, mObj] of Object.entries(pathObj)) {
      const { description, operationId, tags = [] } = mObj as any;
      const items: any[] = [];
      let requestBody = (mObj as any).requestBody?.content?.["application/json"]?.schema;
      if (requestBody) {
        for (const [field, fieldObj] of Object.entries(requestBody.properties)) {
          const { type, description } = fieldObj as any;
          items.push({
            field,
            type,
            label: description,
          });
        }
      }
      routes.push({
        method,
        path,
        title: description,
        id: operationId,
        tags,
        items,
      });
    }
  }

  const template = readFileSync('./from.ejs', 'utf-8');
  const r = ejs.render(template, {
    create: {
      title: '新增用户',
      api: 'api.user.addUser',
      items: [
        {
          field: 'username',
          type: 'input',
          label: '用户名',
        }
      ]
    },
    select: {
      title: '查询用户',
      api: 'api.user.getUsers',
      items: [
        {
          field: 'username',
          type: 'input',
          label: '用户名',
        }
      ],
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
        }
      ]
    },
    modify: {
      title: '修改用户',
      api: 'api.user.setUser',
      items: [
        {
          field: 'username',
          type: 'input',
          label: '用户名',
        }
      ]
    },
    delete: {
      title: '删除用户',
      api: 'api.user.delUser',
    }
  })
  writeFileSync('./to.ts', r);
}

run();
