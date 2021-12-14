/* eslint-disable unicorn/import-style */
/* eslint-disable unicorn/prefer-node-protocol */
import * as  path from 'path'
import {homedir} from 'os'
import {readEnv, buildEnvContent} from './file-system'
import {writeFile, existsSync} from 'fs-extra'
import fetch from 'node-fetch'
import * as cli from 'cli-ux'

export default async (rcPath: string, organization?: string): Promise<string> => {
  const testTokenUrl = `https://api.github.com/orgs/${organization}/repos?type=member`
  const rcRealPath = path.resolve(homedir(), rcPath)

  const SETTINGS_FILE_EXIST = await existsSync(rcRealPath)

  if (!SETTINGS_FILE_EXIST) {
    await writeFile(rcRealPath, '')
  }

  const SETTINGS = await readEnv(path.resolve(homedir(), rcPath))
  if (!SETTINGS.GITHUB_TOKEN) {
    const token = await cli.ux.prompt('Please add your repository token')
    const response = await fetch(testTokenUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    if (data.length === 0) {
      throw new Error('Invalid Modyo Token')
    }

    const newEnv = buildEnvContent({GITHUB_TOKEN: token})
    await writeFile(path.resolve(homedir(), rcPath), newEnv)
    return token
  }

  return SETTINGS.GITHUB_TOKEN
}
