import axios from 'axios'
import getGithubToken from '../helpers/get-github-token'
import {writeFile} from 'fs-extra'
import * as  path from 'node:path'
import {homedir} from 'node:os'
import libsodium from 'libsodium-wrappers'

const encryptSecrets = async (repo: string, value: string, rcPath: string): Promise<{encryptedValue: string;keyId: string}> => {
  const organization = repo.split('/')[0]
  const GITHUB_TOKEN = await getGithubToken(rcPath, organization)
  const config = {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  }
  try {
    const url = `https://api.github.com/repos/${repo}/actions/secrets/public-key`

    // eslint-disable-next-line camelcase
    const response:{data:{key:string; key_id:string}} = await axios.get(url, config)
    const {key, key_id: keyId} = response.data

    const messageBytes = Buffer.from(value)
    const keyBytes = Buffer.from(key, 'base64')
    await libsodium.ready
    const encryptedBytes = libsodium.crypto_box_seal(messageBytes, keyBytes)
    const encryptedValue = Buffer.from(encryptedBytes).toString('base64')
    return {encryptedValue, keyId}
  } catch (error) {
    console.error(error)
    await writeFile(path.resolve(homedir(), rcPath), '')
    return encryptSecrets(repo, value, rcPath)
  }
}

export default encryptSecrets
