import axios from 'axios'
interface UpdateSecrets{
  encryptedValue: string;
  keyId: string;
  name: string;
  repo: string;
  org: string;
}
export default async ({encryptedValue, keyId, name, repo,  org}: UpdateSecrets, token:string): Promise<boolean> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const url = `https://api.github.com/repos/${org}/${repo}/actions/secrets/${name}`
  // eslint-disable-next-line camelcase
  return axios.put(url, {encrypted_value: encryptedValue, key_id: keyId}, config)
}
