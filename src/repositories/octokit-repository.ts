import octokitClient from './clients/octokit-client'
export default {
  async tokenIsValid({org, auth}:{org:string, auth:string}):Promise<boolean> {
    const octokit = octokitClient({auth})
    const orgData = await octokit.request('GET /orgs/{org}', {
      org,
    })
    console.log(orgData)
    return Boolean(orgData.data)
  },
}
