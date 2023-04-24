import {Octokit} from 'octokit'

const getEnvironment = async (token:string, organization:string, repository:string) => {
  const octokit = new Octokit({
    auth: token,
  })
  const req = await octokit.request('GET /repos/{owner}/{repo}/environments', {
    owner: organization,
    repo: repository,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  return req.data.environments
}

export default getEnvironment
