import {setSecretArguments,setSecretOptions} from '../intefaces/setSecret';
import { ERROR,INFO } from '../helpers/logger';
import encryptSecret from './encryptSecret';
import updateSecret from './updateSecret';

export default async(args:setSecretArguments,{secretName,secretValue}:setSecretOptions):Promise<any>=>{
  
  try{
    args.repositories.forEach(async repo=>{
      const {encrypted_value,key_id}=await encryptSecret(repo,secretValue)
      await updateSecret(encrypted_value,key_id,repo,secretName)
      INFO(`Updated secret ${secretName} with value ${secretValue} in ${repo}`,)
    })
  }catch(e){
    ERROR(e)
    throw e
  }
}