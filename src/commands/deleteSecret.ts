import { ERROR,INFO } from '../helpers/logger';
import getGithubToken from '../helpers/getGithubToken';
import { deleteSecretArguments, deleteSecretOptions } from '../intefaces/deleteSecret';
import fetch from 'node-fetch'

export default async(args:deleteSecretArguments,{secretName}:deleteSecretOptions):Promise<any>=>{
  
  try{
    const GITHUB_TOKEN=await getGithubToken();
    const config={
      method:'DELETE',
      headers:{
        Authorization:`Bearer ${GITHUB_TOKEN}`
      },
    }
    try{
      args.repositories.forEach(async repo=>{
        const url=`https://api.github.com/repos/${repo}/actions/secrets/${secretName}`;
        await fetch(url,config)
        INFO(`Secret: ${secretName} deleted from ${repo}`)
      })
    }catch(e){
      throw e
    }
  }catch(e){
    ERROR(e)
    throw e
  }
}