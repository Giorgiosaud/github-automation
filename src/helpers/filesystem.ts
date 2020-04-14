import dotenv from 'dotenv'
import fs from 'fs-extra'
import {ERROR} from './logger'
import chalk from 'chalk'

export const readFile = async (path:string):Promise<any> => {
  try{
  return await fs.readFile(path, { encoding: 'utf8' })
  }catch(e){
    throw e
  }
}

export const readEnv = async (path:string):Promise<any> => {
  let ret = {}
  try {
    ret = dotenv.parse(Buffer.from(await readFile(path)))
  } catch (e) {
    ret = {}
  }
  return ret
}