import {homedir} from 'node:os'
import path from 'node:path'
import {rcPath} from '../../helpers/config'
import {readEnv} from '../../helpers/file-system'
import {Octokit} from '@octokit/core'

const rcRealPath = path.resolve(homedir(), rcPath)
const SETTINGS = readEnv(rcRealPath)

export const octokit:Octokit = new Octokit({
  auth: SETTINGS.GITHUB_TOKEN,
})
export default {
  octokit,
}
