import getGithubToken from '../helpers/get-github-token'

export default async (repo: string, user: string, permission: string, rcPath: string): Promise<boolean> => {
  const organization = repo.split('/')[0]
  const GITHUB_TOKEN = await getGithubToken(rcPath, organization)
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
