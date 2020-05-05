import * as  path from 'path'
import {homedir} from 'os'
import {readEnv, buildEnvContent} from './file-system'
import {writeFile, existsSync} from 'fs-extra'
import fetch from 'node-fetch'
import cli from 'cli-ux'

export default async (rcPath: string, repo: string): Promise<string> => {
  const testTokenUrl = `https://api.github.com/repos/${repo}`
  const rcRealPath = path.resolve(homedir(), rcPath)
  const SETTINGS_FILE_EXIST = await existsSync(rcRealPath)
  if (!SETTINGS_FILE_EXIST) {
    await writeFile(rcRealPath, '')
  }
  const SETTINGS = await readEnv(path.resolve(homedir(), rcPath))
  if (!SETTINGS.GITHUB_TOKEN) {
    const token = await cli.prompt('Please add your repository token')
    const response = await fetch(testTokenUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error('Invalid Modyo Token')
    }
    const newEnv = buildEnvContent({GITHUB_TOKEN: token})
    await writeFile(path.resolve(homedir(), rcPath), newEnv)
    return token
  }
  return SETTINGS.GITHUB_TOKEN
}
