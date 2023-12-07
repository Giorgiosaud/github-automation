import {Octokit} from 'octokit'

import getGithubToken from '../../helpers/get-github-token'
type OctokitClient = {
  org: string;
}
export default async ({org}:OctokitClient):Promise<Octokit> => {
  const auth = await getGithubToken(org)
  return new Octokit({
    auth,
  })
}
