import getGithubToken from '../helpers/get-github-token'
import fetch from 'node-fetch'

export default async (repo: string, user: string, rcPath: string): Promise<boolean> => {
  const GITHUB_TOKEN = await getGithubToken(rcPath, repo)
  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  }
  const url = `https://api.github.com/repos/${repo}/collaborators/${user}`
  await fetch(url, config)
  return true
}
