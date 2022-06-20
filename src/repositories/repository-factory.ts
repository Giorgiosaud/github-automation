import {octokitRepository, octokitRepositoryInterface} from './octokit-repository'

export default {
  get(repository:'octocat'):octokitRepositoryInterface|null {
    const repositories = {
      octocat: octokitRepository,
    }
    return  repositories[repository]
  },
}
