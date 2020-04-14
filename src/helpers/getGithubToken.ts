import { readEnv } from "./filesystem";
import path from "path";
import { homedir } from "os";

export default async():Promise<string>=>{
  try{
    const {GITHUB_TOKEN}=await readEnv(path.resolve(homedir(),'.githubtoken'))
    if(!GITHUB_TOKEN){
      throw new Error('please create a .githubtoken file in your user folder and add GITHUB_TOKEN=**** value')
    }
    return GITHUB_TOKEN;
  }catch(e){
    throw e
  }
}