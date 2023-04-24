import {Octokit} from 'octokit'

const createEnvironment = async (token:string, organization:string, repository:string, environment:string) => {
  const octokit = new Octokit({
    auth: token,
  })
  const response = await octokit.request('PUT /repos/{owner}/{repo}/environments/{environment_name}', {
    owner: organization,
    repo: repository,

    environment_name: environment,
    // wait_timer: 30,
    // reviewers: [
    //   {
    //     type: 'User',
    //     id: 1,
    //   },
    //   {
    //     type: 'Team',
    //     id: 1,
    //   },
    // ],
    // deployment_branch_policy: {
    //   protected_branches: false,
    //   custom_branch_policies: true,
    // },
  })

  return response
}

export default createEnvironment
