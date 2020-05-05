/* eslint-disable @typescript-eslint/camelcase */
import {SetSecretArguments,SetSecretOptions} from '../intefaces/setSecret';
import { ERROR,INFO } from '../helpers/logger';
import encryptSecret from './encryptSecret';
import updateSecret from './updateSecret';

export default async(args: SetSecretArguments,{secretName,secretValue}: SetSecretOptions): Promise<boolean>=>{
  
  try{
    if(args.repositories && secretValue && secretName){
      args.repositories.forEach(async repo=>{
        
        const {encrypted_value,key_id}=await encryptSecret(repo,secretValue)
        await updateSecret(encrypted_value,key_id,repo,secretName)
        INFO(`Updated secret ${secretName} with value ${secretValue} in ${repo}`,)
        return true
      })
    }
    return false
  }catch(e){
    ERROR(e)
    throw e
  }
  return false
}