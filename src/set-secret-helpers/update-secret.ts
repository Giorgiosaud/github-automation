/* eslint-disable camelcase */
import axios from 'axios'
import getGithubToken from '../helpers/get-github-token'

interface UpdateSecrets{
  encryptedValue: string;
  keyId: string;
  name: string;
  repo: string;
  rcPath: string;
}
export default async ({encryptedValue, keyId, name, repo,  rcPath}: UpdateSecrets): Promise<boolean> => {
  try {
    const organization = repo.split('/')[0]
    const GITHUB_TOKEN = await getGithubToken(rcPath, organization)
    const config = {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    }
    const url = `https://api.github.com/repos/${repo}/actions/secrets/${name}`
    await axios.put(url, {encrypted_value: encryptedValue, key_id: keyId}, config)
    return true
  } catch (error) {
    throw new TypeError('error en put a github ' + error)
  }
}
