import * as  path from 'node:path'
import {homedir} from 'node:os'
import {readEnv, buildEnvContent} from './file-system'
import {writeFile, existsSync} from 'fs-extra'
import axios from 'axios'
import {CliUx} from '@oclif/core'
export default async (rcPath: string, organization?: string): Promise<string> => {
  const testTokenUrl = `https://api.github.com/orgs/${organization}/repos?type=member`
  const rcRealPath = path.resolve(homedir(), rcPath)

  const SETTINGS_FILE_EXIST = await existsSync(rcRealPath)

  if (!SETTINGS_FILE_EXIST) {
    await writeFile(rcRealPath, '')
  }

  const SETTINGS = await readEnv(path.resolve(homedir(), rcPath))
  if (!SETTINGS.GITHUB_TOKEN) {
    const token = await CliUx.ux.prompt('Please add your repository token')
    await axios.get(testTokenUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const newEnv = buildEnvContent({GITHUB_TOKEN: token})
    await writeFile(path.resolve(homedir(), rcPath), newEnv)
    return token
  }

  return SETTINGS.GITHUB_TOKEN
}
