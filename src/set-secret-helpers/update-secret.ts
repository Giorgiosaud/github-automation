import {updateRepoEnvSecrets} from './update-repo-env-secret'
import {updateRepoSecrets} from './update-repo-secret'
interface UpdateSecrets{
  encryptedValue: string;
  keyId: string;
  name: string;
  repo: string;
  org: string;
  env?: string;
}
export default async ({encryptedValue, keyId, name, repo,  org, env}: UpdateSecrets, token:string): Promise<boolean> => {
  if (env)
    return updateRepoEnvSecrets({token, organization: org, repository: repo, name, encryptedValue, keyId, environment: env})
  return updateRepoSecrets({token, organization: org, repository: repo, name, encryptedValue, keyId})
}
