import * as sodium from '@devtomio/sodium'
import getGithubToken from '../helpers/get-github-token'
import {writeFile} from 'fs-extra'
import path from 'node:path'
import {homedir} from 'node:os'
import axios from 'axios'

const encryptSecrets = async (repo: string, value: string, rcPath: string): Promise<{encryptedValue: string;keyId: string}> => {

  const organization = repo.split('/')[0]

  const GITHUB_TOKEN = await getGithubToken(rcPath, organization)
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  }
  try {
    const url = `https://api.github.com/repos/${repo}/actions/secrets/public-key`
    const response = await axios(url, config)

    const {key, key_id: keyId} = response.data
    const messageBytes = Buffer.from(value)

    const keyBytes = Buffer.from(key, 'base64')
    console.log(messageBytes,keyBytes)
    console.log(sodium.crypto_box_seal)
    const encryptedBytes = sodium.crypto_box_seal(messageBytes, keyBytes)

    const encryptedValue = Buffer.from(encryptedBytes).toString('base64')

    return {encryptedValue, keyId}
  } catch (error) {
    console.log(error)
    await writeFile(path.resolve(homedir(), rcPath), '')
    return encryptSecrets(repo, value, rcPath)
  }
}

export default encryptSecrets
