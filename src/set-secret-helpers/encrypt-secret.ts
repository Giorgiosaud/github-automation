import * as libsodium from 'libsodium-wrappers'
import {getPublicEnvKey} from './get-public-env-key'
import {getPublicKey} from './get-public-key'
interface encryptSecretsArgs{
  token:string;
  value: string;
  org: string;
  repo: string;
  name:string;
  environment?:string;
}
const encryptSecrets = async ({token, value, org, repo, name, environment}:encryptSecretsArgs): Promise<{encryptedValue: string;keyId: string; name: string; value:string; org:string; repo: string}> => {
  const {key, key_id: keyId} = environment ? await getPublicEnvKey(token, org, repo, environment) : await getPublicKey(token, org, repo)
  const messageBytes = Buffer.from(value)
  const keyBytes = Buffer.from(key, 'base64')
  await libsodium.ready
  const encryptedBytes = libsodium.crypto_box_seal(messageBytes, keyBytes)
  const encryptedValue = Buffer.from(encryptedBytes).toString('base64')
  return {encryptedValue, keyId, name, value, org, repo}
}

export default encryptSecrets
