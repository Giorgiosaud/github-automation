import {homedir} from 'node:os'
import {readEnv, buildEnvContent} from './file-system'
import {writeFileSync, existsSync} from 'node:fs'
import {resolve} from 'node:path'
import {promptToken} from './prompt-token'
import {rcPath} from './config'
export default async (organization: string, path: string = rcPath): Promise<string> => {
  const rcRealPath = resolve(homedir(), path)
  const SETTINGS_FILE_EXIST = await existsSync(rcRealPath)
  if (!SETTINGS_FILE_EXIST) {
    writeFileSync(rcRealPath, '')
  }

  let SETTINGS = await readEnv(rcRealPath)

  if (typeof SETTINGS[0] === 'string' && SETTINGS[0].includes('=')) {
    console.log('Upgrading token schema in ' + rcRealPath)
    const token = SETTINGS.pop().split('=')[1]

    buildEnvContent(rcRealPath,  {
      [organization]: {
        GITHUB_TOKEN: token,
      }})
    SETTINGS = await readEnv(rcRealPath)
  }

  if (SETTINGS.length === 0) {
    const token = await promptToken({organization})
    buildEnvContent(rcRealPath, {
      [organization]: {
        GITHUB_TOKEN: token,
      }},
    )
    return token
  }

  return SETTINGS[0][organization].GITHUB_TOKEN
}
