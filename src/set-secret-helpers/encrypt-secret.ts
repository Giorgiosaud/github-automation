import axios, {AxiosResponse} from 'axios'
import * as libsodium from 'libsodium-wrappers'
interface encryptSecretsArgs{
  token:string;
  value: string;
  org: string;
  repo: string;
  name:string;
}
const encryptSecrets = async ({token, value, org, repo, name}:encryptSecretsArgs): Promise<{encryptedValue: string;keyId: string; name: string; value:string; org:string; repo: string}> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const url = `https://api.github.com/repos/${org}/${repo}/actions/secrets/public-key`

  const response:AxiosResponse = await axios.get(url, config)
  const {key, key_id: keyId} = response.data
  const messageBytes = Buffer.from(value)
  const keyBytes = Buffer.from(key, 'base64')
  await libsodium.ready
  const encryptedBytes = libsodium.crypto_box_seal(messageBytes, keyBytes)
  const encryptedValue = Buffer.from(encryptedBytes).toString('base64')
  return {encryptedValue, keyId, name, value, org, repo}
}

export default encryptSecrets
