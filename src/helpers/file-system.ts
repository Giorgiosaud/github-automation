import * as dotenv from 'dotenv'
import {readFileSync} from 'node:fs'

export const  buildEnvContent = (values: any): string => {
  let content = ''
  for (const key of Object.keys(values)) {
    content += `${key}=${values[key]}\n`
  }

  return content
}

export const readEnv = (path: string):any => {
  let newObject: any = {}
  const file = readFileSync(path)
  const ret = dotenv.parse(Buffer.from(file))
  newObject = Object.assign({}, ret)
  return newObject
}
