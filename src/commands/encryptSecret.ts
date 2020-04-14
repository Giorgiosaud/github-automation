import tweetsodium from 'tweetsodium'
import fetch from 'node-fetch'
import getGithubToken from '../helpers/getGithubToken';

export default async(repo:string,value:string):Promise<{encrypted_value:string,key_id:string}>=>{
  const GITHUB_TOKEN=await getGithubToken();
  const config={
    method:'GET',
    headers:{
      Authorization:`Bearer ${GITHUB_TOKEN}`
    }
  }
  const url=`https://api.github.com/repos/${repo}/actions/secrets/public-key`
  const response=await fetch(url,config)
  const {key,key_id}=await response.json()
  const messageBytes = Buffer.from(value);
  const keyBytes = Buffer.from(key, 'base64');
  const encryptedBytes = tweetsodium.seal(messageBytes, keyBytes);
  const encrypted_value = Buffer.from(encryptedBytes).toString('base64');
  return {encrypted_value,key_id}
}