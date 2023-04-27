import {getPublicEnvKey} from './get-public-env-key'
import {getPublicKey} from './get-public-key'
import * as tweetnacl from 'tweetnacl-ts'
interface EncryptSecretsArgs{
  token:string;
  value: string;
  org: string;
  repo: string;
  name:string;
  environment?:string;
}
const encryptSecrets = async ({token, value, org, repo, name, environment}:EncryptSecretsArgs): Promise<{encryptedValue: string;keyId: string; name: string; value:string; org:string; repo: string}> => {
  const {key, key_id: keyId} = environment ? await getPublicEnvKey(token, org, repo, environment) : await getPublicKey(token, org, repo)
  const messageBytes = Buffer.from(value)
  const keyBytes = Buffer.from(key, 'base64')
  const encryptedBytes = tweetnacl.sealedbox(messageBytes, keyBytes)
  const encryptedValue = Buffer.from(encryptedBytes).toString('base64')
  return {encryptedValue, keyId, name, value, org, repo}
}

export default encryptSecrets
