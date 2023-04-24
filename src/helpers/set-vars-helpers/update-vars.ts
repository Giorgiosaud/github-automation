import {updateRepoVars} from './update-repo-vars'
interface encryptSecretsArgs{
  token:string;
  value: string;
  owner: string;
  repo: string;
  name:string;
  environment_name:string;
}
const updateVars = async ({token, value, owner, repo, name, environment_name}:encryptSecretsArgs): Promise<boolean> => {
  try {
    await updateRepoVars({token, owner, repo, name, value, environment_name})
    return true
  } catch {
    return false
  }
}

export default updateVars