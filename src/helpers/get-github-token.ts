import {existsSync, writeFileSync} from 'node:fs'
import {homedir} from 'node:os'
import {resolve} from 'node:path'

import {rcPath} from './config'
import {buildEnvContent, readEnv} from './file-system'
import {promptToken} from './prompt-token'
type ORG={
  GITHUB_TOKEN:string
}
type Orgs={
  [key:string]:ORG
}

export default async (org: string): Promise<string> => {
  const rcRealPath = resolve(homedir(), rcPath)
  const SETTINGS_FILE_EXIST = existsSync(rcRealPath)
  let SETTINGS
  if (SETTINGS_FILE_EXIST) {
    SETTINGS = readEnv<[Orgs]>(rcRealPath)
    if (!SETTINGS[0][org]) {
      const token = await promptToken({org})

      const data = {
        ...SETTINGS[0],
        [org]: {
          GITHUB_TOKEN: token,
        }}
      buildEnvContent(rcRealPath, data)

      SETTINGS = readEnv<[Orgs]>(rcRealPath)
    }
  } else {
    writeFileSync(rcRealPath, 'utf8')
    const token = await promptToken({org})
    const data = {
      [org]: {
        GITHUB_TOKEN: token,
      }}
    buildEnvContent(rcRealPath, data)

    SETTINGS = readEnv<[Orgs]>(rcRealPath)
  }

  const auth = SETTINGS[0][org].GITHUB_TOKEN
  return auth
}
