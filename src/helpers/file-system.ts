import * as jsyaml from 'js-yaml'
import {readFileSync, writeFileSync} from 'node:fs'

type ENV_VARS = unknown

export const  buildEnvContent = (path:string, values: ENV_VARS): void => {
  const yamlStr = jsyaml.dump(values)
  writeFileSync(path.replace('.rc', '.yml'), yamlStr, 'utf8')
}

export const readEnv = <T>(path: string):T => {
  const file = readFileSync(path, 'utf8')
  if (path.includes('.rc')) {
    return file as T
  }

  return jsyaml.loadAll(file) as T
}
