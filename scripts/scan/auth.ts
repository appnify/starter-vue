import path from 'path'
import fs from 'fs'
import url from 'url'

const MatchExts = ['.vue', '.js', '.jsx', '.ts', '.tsx']
const MatchStore = /(?<=userStore\.auths\.)((\d|_|\w)+)/g
const root = process.cwd()
const savePath = path.join(root, 'src/config/auths.ts')

const generateFileContent = async (data: Record<string, boolean>) => {
  // if (fs.existsSync(savePath)) {
  //   const imported = await import(url.pathToFileURL(savePath))
  //   const auths = imported.auths ?? {}
  //   Object.assign(data, auths)
  // }
  const content = `export const auths = ${JSON.stringify(data, null, 2)}
  export type Auths = typeof auths;
  export type AuthKey = keyof Auths;
  `
  fs.writeFileSync(savePath, content, { encoding: 'utf-8' })
}

export const scanAuths = async () => {
  const dir = path.join(root, 'src')
  const data = {}
  const processDir = (dir: string) => {
    const fileNames = fs.readdirSync(dir)
    for (const fileName of fileNames) {
      const filePath = path.join(dir, fileName)
      const stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        processDir(filePath)
        continue
      }
      if (!stat.isFile()) {
        continue
      }
      const ext = path.extname(filePath)
      if (!MatchExts.includes(ext)) {
        continue
      }
      console.log(`扫描文件：${filePath}`)
      const file = fs.readFileSync(filePath, 'utf-8')
      const matchs = [...file.matchAll(MatchStore)]
      for (const match of matchs) {
        const key = match[0]
        data[key] = false
      }
      if (ext === '.vue') {
        console.log('vue')
        const matched = file.match(/auth\s*:\s*('|")([\s\S]+?)('|")/)
        const key = matched?.[2]
        if (key) {
          data[key] = false
        }
      }
    }
  }
  processDir(dir)
  console.log(data)
  await generateFileContent(data)
}

scanAuths()
