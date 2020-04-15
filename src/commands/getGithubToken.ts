import { readEnv, buildEnvContent, writeFile } from "../helpers/filesystem";
import path from "path";
import inquirer from "inquirer";
import { homedir } from "os";

export default async(): Promise<string>=>{
    const SETTINGS=await readEnv(path.resolve(homedir(),'.githubtoken'))
    if(!SETTINGS.GITHUB_TOKEN){
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
    return SETTINGS.GITHUB_TOKEN;
}