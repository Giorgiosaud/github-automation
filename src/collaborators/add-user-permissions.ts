import getGithubToken from '../helpers/get-github-token'
import fetch from 'node-fetch'

export default async (repo: string, user: string, permission: string, rcPath: string): Promise<boolean> => {
  const GITHUB_TOKEN = await getGithubToken(rcPath, repo)
  const config = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({permission}),
  }
  const url = `https://api.github.com/repos/${repo}/collaborators/${user}`
  await fetch(url, config)
  return true
}
