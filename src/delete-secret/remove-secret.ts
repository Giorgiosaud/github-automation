import getGithubToken from '../helpers/get-github-token'

export default async (repo: string, secretName: string, rcPath: string) => {
  const organization = repo.split('/')[0]
  const GITHUB_TOKEN = await getGithubToken(rcPath, organization)
  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  }
  const url = `https://api.github.com/repos/${repo}/actions/secrets/${secretName}`
  await fetch(url, config)
}
