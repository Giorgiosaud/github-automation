import {readFileSync, writeFileSync} from 'node:fs'
import * as jsyaml from 'js-yaml'

type ENV_VARS = any

export const  buildEnvContent = (path:string, values: ENV_VARS): void => {
  const yamlStr = jsyaml.dump(values)
  writeFileSync(path, yamlStr, 'utf-8')
}

export const readEnv = (path: string):any => {
  const file = readFileSync(path, 'utf-8')
  return jsyaml.loadAll(file)
}
