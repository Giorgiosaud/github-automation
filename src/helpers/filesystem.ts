import dotenv from 'dotenv'
import * as fs from 'fs-extra'

export const readFile = async (path: string): Promise<string> => {
  return await fs.readFile(path, {encoding: 'utf8'})
}
export const writeFile = async (path: string, content: string): Promise<boolean|void> => {
  return await fs.writeFile(path, content, {encoding: 'utf8'})
}

export const  buildEnvContent = (values: any): string => {
  let content = ''
  Object.keys(values).forEach(key => {
    content += `${key}=${values[key]}\n`
  })
  return content
}

export const readEnv = async (path: string): Promise<{GITHUB_TOKEN?: string}> => {
  let ret = {}
  try {
    ret = dotenv.parse(Buffer.from(await readFile(path)))
  } catch (e) {
    ret = {}
  }
  return ret
}
