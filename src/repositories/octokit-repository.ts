import {octokit} from './clients/octokit'
import {OctokitResponse} from '@octokit/types'
export interface octokitRepositoryInterface{
  getRepo:()=>Promise<OctokitResponse<any, number>>
}
export const octokitRepository:octokitRepositoryInterface = {
  getRepo() {
    return octokit.request('GET asd')
  },
}
