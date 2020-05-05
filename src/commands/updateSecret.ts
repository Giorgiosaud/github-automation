/* eslint-disable @typescript-eslint/camelcase */
import getGithubToken from "./getGithubToken";
import fetch from 'node-fetch'

export default async(encrypted_value: string,key_id: string,repo: string,secretName: string): Promise<boolean>=>{
  const GITHUB_TOKEN=await getGithubToken();
  const config={
    method:'PUT',
    headers:{
      Authorization:`Bearer ${GITHUB_TOKEN}`
    },
    body:JSON.stringify({encrypted_value,key_id})
  }
  const url=`https://api.github.com/repos/${repo}/actions/secrets/${secretName}`;
  await fetch(url,config)
  return true
}