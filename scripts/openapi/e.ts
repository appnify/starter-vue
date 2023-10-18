import fs from 'fs'
import doc from './openapi1.json';

interface Param {
  name: string;
  required: boolean;
  description: string;
  example: string;
  schema: {
    type: string;
    [key: string]: any;
  }
}

interface JsonParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example: string;
}

const run = () => {
  const { paths } = doc
  const routes: any[] = []
  for(const [path, obj] of Object.entries(paths)) {
    for(const [method, obj1] of Object.entries(obj)) {
      const { tags, summary, operationId, description, parameters, requestBody, responses } = obj1

      const { content = {} } = requestBody || {}
      const { schema = {} } = content['application/json'] || {}
      const { properties = {}, required: requireds = [] } = schema
      const bodyParams = {}
      for(const [id, obj2 = {}] of Object.entries(properties)) {
        const { type, description, example } = obj2 as any;
        const required = requireds.includes(id)
        const param: JsonParam = {
          ...(obj2 as any),
          name: id,
          type,
          required,
          description,
          example,
        }
        bodyParams[id] = param
      }

      const { content: content1 = {} } = responses['200'] || {}
      const { schema: schema1 = {} } = content1['application/json'] || {}
      let resBody = {}
      if(schema1.type === 'object') {
        resBody = schema1.properties?.data;
      }

      const pathParams = parameters.filter((i: any) => i.in === 'path')
      const queryParams = parameters.filter((i: any) => i.in === 'query')
      const route = {
        method,
        path,
        tag: tags?.[0],
        summary,
        operationId,
        description,
        pathParams,
        queryParams,
        bodyParams,
        resBody,
      }
      routes.push(route)
    }
  }
  fs.writeFileSync('12.json', JSON.stringify(routes, null, 2));
}

run();