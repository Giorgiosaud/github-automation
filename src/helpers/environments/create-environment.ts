import {Octokit} from 'octokit'

const createEnvironment = async (token:string, organization:string, repository:string, environment:string):Promise<unknown> => {
  const octokit = new Octokit({
    auth: token,
  })
  const response = octokit.request('PUT /repos/{owner}/{repo}/environments/{environment_name}', {
    owner: organization,
    repo: repository,
    environment_name: environment,
  })

  return response
}

export default createEnvironment
