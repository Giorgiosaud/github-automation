import getGithubToken from '../helpers/get-github-token'

export default async (repo: string, user: string): Promise<boolean> => {
  const organization = repo.split('/')[0]
  const GITHUB_TOKEN = await getGithubToken(organization)
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
