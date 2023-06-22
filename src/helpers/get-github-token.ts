import {homedir} from 'node:os'
import {readEnv, buildEnvContent} from './file-system'
import {writeFileSync, existsSync} from 'node:fs'
import {resolve} from 'node:path'
import {promptToken} from './prompt-token'
import {rcPath} from './config'

export default async (org: string): Promise<string> => {
  const rcRealPath = resolve(homedir(), rcPath)
  const SETTINGS_FILE_EXIST = existsSync(rcRealPath)
  let SETTINGS
  if (SETTINGS_FILE_EXIST) {
    SETTINGS = readEnv(rcRealPath)
    if (!SETTINGS[0][org]) {
      const token = await promptToken({org})
      console.log('ASK FT', token)

      const data = {
        [org]: {
          GITHUB_TOKEN: token,
        }}
      buildEnvContent(rcRealPath, data)

      SETTINGS = readEnv(rcRealPath)
      console.log(SETTINGS)
    }
  } else {
    writeFileSync(rcRealPath, 'utf8')
    const token = await promptToken({org})
    const data = {
      [org]: {
        GITHUB_TOKEN: token,
      }}
    buildEnvContent(rcRealPath, data)

    SETTINGS = readEnv(rcRealPath)
  }

  console.log(SETTINGS)
  const auth = SETTINGS[0][org].GITHUB_TOKEN
  return auth
}
