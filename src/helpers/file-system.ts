import * as dotenv from 'dotenv'
import {readFile} from 'fs-extra'

type ENV_TYPE = any

export const  buildEnvContent = (values: ENV_TYPE): string => {
  let content = ''
  for (const key of Object.keys(values)) {
    content += `${key}=${values[key]}\n`
  }

  return content
}

export const readEnv = async (path: string): Promise<any> => {
  let newObject: any = {}
  const file = await readFile(path)
  const ret = dotenv.parse(Buffer.from(file))
  newObject = Object.assign({}, ret)
  return newObject
}
