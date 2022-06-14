import axios from 'axios'
import getGithubToken from '../helpers/get-github-token'
import {writeFile} from 'fs-extra'
import * as  path from 'node:path'
import {homedir} from 'node:os'
import libsodium from 'libsodium-wrappers'

const encryptSecrets = async (token:string, value: string, org: string, repo: string, name:string): Promise<{encryptedValue: string;keyId: string; name: string; value:string; org:string; repo: string}> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const url = `https://api.github.com/repos/${org}/${repo}/actions/secrets/public-key`

    // eslint-disable-next-line camelcase
    const response:{data:{key:string; key_id:string}} = await axios.get(url, config)
    const {key, key_id: keyId} = response.data

    const messageBytes = Buffer.from(value)
    const keyBytes = Buffer.from(key, 'base64')
    await libsodium.ready
    const encryptedBytes = libsodium.crypto_box_seal(messageBytes, keyBytes)
    const encryptedValue = Buffer.from(encryptedBytes).toString('base64')
    return {encryptedValue, keyId, name, value, org, repo}
  } catch (error) {
    console.error(error)
    return encryptSecrets(token, value, org, repo, name)
  }
}

export default encryptSecrets
