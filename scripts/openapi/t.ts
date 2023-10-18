import parser from '@apidevtools/swagger-parser'
import apiJson from './openapi.json'
import fs from 'fs'

const run = async () => {
  const api = await parser.validate(apiJson as any)
  console.log(api);
  fs.writeFileSync('./openapi1.json', JSON.stringify(api, null, 2))
}

run()