/* eslint-disable camelcase */
import getGithubToken from '../helpers/get-github-token'
import fetch from 'node-fetch'
interface UpdateSecrets{
  encryptedValue: string;
  keyId: string;
  name: string;
  repo: string;
  rcPath: string;
}
export default async ({encryptedValue, keyId, name, repo,  rcPath}: UpdateSecrets): Promise<boolean> => {
  const organization = repo.split('/')[0]
  const GITHUB_TOKEN = await getGithubToken(rcPath, organization)
  const config = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({encrypted_value: encryptedValue, key_id: keyId}),
  }
  const url = `https://api.github.com/repos/${repo}/actions/secrets/${name}`
  await fetch(url, config)
  return true
}
