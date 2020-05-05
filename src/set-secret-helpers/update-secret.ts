import getGithubToken from '../helpers/get-github-token'
import fetch from 'node-fetch'
interface UpdateSecrets{
  encrypted_value: string;
  key_id: string;
  name: string;
  repo: string;
  rcPath: string;
}
export default async ({encrypted_value, key_id, name, repo,  rcPath}: UpdateSecrets): Promise<boolean> => {
  const GITHUB_TOKEN = await getGithubToken(rcPath, repo)
  const config = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({encrypted_value, key_id}),
  }
  const url = `https://api.github.com/repos/${repo}/actions/secrets/${name}`
  await fetch(url, config)
  return true
}
