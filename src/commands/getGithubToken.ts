import { readEnv, buildEnvContent, writeFile } from "../helpers/filesystem";
import path from "path";
import inquirer from "inquirer";
import { homedir } from "os";

export default async():Promise<string>=>{
  try{
    const {GITHUB_TOKEN}=await readEnv(path.resolve(homedir(),'.githubtoken'))
    if(!GITHUB_TOKEN){
       const Answers = await inquirer.prompt([
        {
          name:'token',
          type:'input',
          message:'please add your github token to the base settings'
        }
      ])
      const newEnv=buildEnvContent({GITHUB_TOKEN:Answers.token})
      await writeFile(path.resolve(homedir(),'.githubtoken'),newEnv)
      return Answers.token;
    }
    return GITHUB_TOKEN;
  }catch(e){
    throw e
  }
}