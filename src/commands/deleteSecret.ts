import { ERROR,INFO } from '../helpers/logger';
import getGithubToken from './getGithubToken';
import { DeleteSecretArguments, DeleteSecretOptions } from '../intefaces/deleteSecret';
import fetch from 'node-fetch'

export default async(args: DeleteSecretArguments,{secretName}: DeleteSecretOptions): Promise<boolean>=>{
  
  try{
    const GITHUB_TOKEN=await getGithubToken();
    const config={
      method:'DELETE',
      headers:{
        Authorization:`Bearer ${GITHUB_TOKEN}`
      },
    }
    if(args.repositories){
      args.repositories.forEach(async repo=>{
        const url=`https://api.github.com/repos/${repo}/actions/secrets/${secretName}`;
        await fetch(url,config)
        INFO(`Secret: ${secretName} deleted from ${repo}`)
        return true
      })
    }
  }catch(e){
    ERROR(e)
    throw e
  }
  return false
}