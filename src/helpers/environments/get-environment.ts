import {Octokit} from 'octokit'

const getEnvironment = async (token:string, organization:string, repository:string) => {
  const octokit = new Octokit({
    auth: token,
  })
  const req = await octokit.request('GET /repos/{owner}/{repo}/environments', {
    owner: organization,
    repo: repository,
  })
  return req.data.environments
}

export default getEnvironment
