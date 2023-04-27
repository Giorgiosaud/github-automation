import {Octokit} from 'octokit'

const createEnvironment = async (token:string, organization:string, repository:string, environment:string):Promise<unknown> => {
  const octokit = new Octokit({
    auth: token,
  })
  const response = octokit.request<string>('PUT /repos/{owner}/{repo}/environments/{environment_name}', {
    owner: organization,
    repo: repository,
    environment_name: environment,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  return response
}

export default createEnvironment
