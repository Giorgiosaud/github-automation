import * as tweetnacl from 'tweetnacl-ts'
interface EncryptSecretsArgs{
  publicKey:{
    key: string;
    key_id: string;
  }
  value: string;
}
const encryptSecrets = async ({publicKey, value}:EncryptSecretsArgs): Promise<string> => {
  const {key} = publicKey
  const messageBytes = Buffer.from(value)
  const keyBytes = Buffer.from(key, 'base64')
  const encryptedBytes = tweetnacl.sealedbox(messageBytes, keyBytes)
  const encryptedValue = Buffer.from(encryptedBytes).toString('base64')
  return encryptedValue
}

export default encryptSecrets
