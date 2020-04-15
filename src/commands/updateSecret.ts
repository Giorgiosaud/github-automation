import getGithubToken from "./getGithubToken";
import fetch from 'node-fetch'

export default async(encrypted_value:string,key_id:string,repo:string,secretName:string):Promise<any>=>{
  const GITHUB_TOKEN=await getGithubToken();
  const config={
    method:'PUT',
    headers:{
      Authorization:`Bearer ${GITHUB_TOKEN}`
    },
    body:JSON.stringify({encrypted_value,key_id})
  }
  try{
    const url=`https://api.github.com/repos/${repo}/actions/secrets/${secretName}`;
    const response=await fetch(url,config)
  }catch(e){
    throw e
  }
}