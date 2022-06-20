import * as  path from 'node:path'
import {homedir} from 'node:os'
import {readEnv, buildEnvContent} from './file-system'
import axios from 'axios'
import {CliUx} from '@oclif/core'
import {writeFileSync, existsSync} from 'node:fs'
export default async (rcPath: string, organization?: string): Promise<string> => {
  const testTokenUrl = `https://api.github.com/orgs/${organization}/repos?type=member`
  const rcRealPath = path.resolve(homedir(), rcPath)
  const SETTINGS_FILE_EXIST = await existsSync(rcRealPath)
  if (!SETTINGS_FILE_EXIST) {
    writeFileSync(rcRealPath, '')
  }

  const SETTINGS = await readEnv(rcRealPath)
  if (!SETTINGS.GITHUB_TOKEN) {
    const token = await CliUx.ux.prompt('Please add your repository token')
    await axios.get(testTokenUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const newEnv = buildEnvContent({GITHUB_TOKEN: token})
    writeFileSync(path.resolve(rcRealPath), newEnv)
    return token
  }

  return SETTINGS.GITHUB_TOKEN
}
