import getGithubToken from '../helpers/get-github-token'

const getRepos = async (organization: string, token: string, page = 1, repoInitialization: string[]  = []): Promise<string[]> => {
  const repos: string[] = repoInitialization
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const url = `https://api.github.com/orgs/${organization}/repos?type=member&page=${page}`
  const response = await fetch(url, config)

  const data: [{full_name: string}] = await response.json()
  if (data.length > 0) {
    data.map(repo => {
      return repos.push(repo.full_name)
    })
    return getRepos(organization, token, ++page, repos)
  }

  return repos
}

export default async (organization: string, filter = ''):Promise<string[]> => {
  const GITHUB_TOKEN = await getGithubToken(organization)

  let repositories: string[] = await getRepos(organization, GITHUB_TOKEN)
  if (filter !== '') {
    const regex = new RegExp(filter, 'g')
    repositories = repositories.filter(repo => repo.match(regex))
  }

  return repositories
}

