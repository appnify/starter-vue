import fs from "fs";
import doc from "./openapi1.json";

interface BaseParam {
  name: string;
  required: boolean;
  description: string;
}

interface NumberParam {
  type: "number";
  min?: number;
  max?: number;
}

interface StringParam {
  type: "string";
  pattern?: string;
}

interface BooleanParam {
  type: "boolean";
}

interface ObjectParam {
  type: "object";
  properties: {
    [key: string]: Param;
  };
}

interface ArrayParam {
  type: "array";
  items: Param;
}

type Param = BaseParam & (NumberParam | StringParam | BooleanParam | ObjectParam | ArrayParam);

interface BodyParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example: string;
}

interface Route {
  method: string;
  path: string;
  tag: string;
  operationId: string;
  description: string;
  pathParams: Param[];
  quryParams: Param[];
  bodyParams: any;
  bodyReturn: any;
}

interface Tag {
  name: string;
  description: string;
}

const run = () => {
  const routes: Route[] = [];
  const tags: Tag[] = doc.tags;

  for (const [path, obj] of Object.entries(doc.paths)) {
    for (const [method, obj1] of Object.entries(obj)) {
      const { tags, operationId, description, parameters, responses } = obj1;
      const tag = tags?.[0];

      const { content = {} } = obj1.requestBody || {};
      const { schema = {} } = content["application/json"] || {};
      const { properties = {}, required: requireds = [] } = schema;
      const bodyParams: any = [];
      for (const [id, obj2 = {}] of Object.entries(properties)) {
        const { type, description } = obj2 as any;
        const required = requireds.includes(id);
        const param: Param = {
          name: id,
          type,
          required,
          description,
        };
        bodyParams.push(param);
      }

      const { content: content1 = {} } = responses["200"] || responses["201"] || {};
      const { schema: schema1 = {} } = content1["application/json"] || {};
      let bodyReturn = {};
      if (schema1.type === "object") {
        bodyReturn = schema1.properties?.data;
      }

      const pathParams: Param[] = [];
      const quryParams: Param[] = [];

      for (const param of parameters) {
        const { name, schema, description, required, items, properties } = param;
        const type = schema.type;
        const item: Param = {
          name,
          type,
          description,
          required,
        };
        if (type === "array") {
          (item as unknown as ArrayParam).items = items;
        }
        if (type === "object") {
          (item as unknown as ObjectParam).properties = properties;
        }
        if (param.in === "path") {
          pathParams.push(item);
        }
        if (param.in === "query") {
          quryParams.push(item);
        }
      }

      routes.push({
        method,
        path,
        tag,
        operationId,
        description,
        pathParams,
        quryParams,
        bodyParams,
        bodyReturn,
      });
    }
  }

  const obj = { routes, tags };
  const pat = '../../src/dd.json'
  fs.writeFileSync(pat, JSON.stringify(obj, null, 2));
};

run();
