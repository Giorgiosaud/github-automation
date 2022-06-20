import * as dotenv from 'dotenv'
import {readFileSync} from 'node:fs'

type ENV_VARS = any

export const  buildEnvContent = (values: ENV_VARS): string => {
  let content = ''
  for (const key of Object.keys(values)) {
    content += `${key}=${values[key]}\n`
  }

  return content
}

export const readEnv = (path: string):any => {
  try {
    let newObject: any = {}
    const file = readFileSync(path)
    const ret = dotenv.parse(Buffer.from(file))
    newObject = Object.assign({}, ret)
    return newObject
  } catch (error) {
    console.log(error)
  }
}
