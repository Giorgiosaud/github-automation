import * as dotenv from 'dotenv'
import {readFile} from 'fs-extra'

export const  buildEnvContent = (values: any): string => {
  let content = ''
  for (const key of Object.keys(values)) {
    content += `${key}=${values[key]}\n`
  }

  return content
}

export const readEnv = async (path: string): Promise<any> => {
  let newObject: any = {}
  const ret = dotenv.parse(Buffer.from(await readFile(path)))
  newObject = Object.assign({}, ret)
  return newObject
}
