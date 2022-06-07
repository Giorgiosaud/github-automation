import getGithubToken from '../get-github-token'
import axios from 'axios'

export default async (repo: string, secretName: string, rcPath: string):Promise<boolean> => {
  const organization = repo.split('/')[0]
  const GITHUB_TOKEN = await getGithubToken(rcPath, organization)
  const config = {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  }
  const url = `https://api.github.com/repos/${repo}/actions/secrets/${secretName}`
  try {
    await axios.delete(url, config)
    return true
  } catch {
    return false
  }
}
