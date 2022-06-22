import axios from 'axios'
interface deleteSecretsParams{
  repo: string;
  organization: string;
  name: string;
  token: string;
}
export default async ({repo, name, token, organization}:deleteSecretsParams):Promise<boolean> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const url = `https://api.github.com/repos/${organization}/${repo}/actions/secrets/${name}`
  try {
    await axios.delete(url, config)
    return true
  } catch {
    return false
  }
}
