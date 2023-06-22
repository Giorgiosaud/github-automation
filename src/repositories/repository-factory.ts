import octokitRepository from './octokit-repository'
export default {
  get(repositoryName: 'octokit' = 'octokit'):typeof octokitRepository {
    const repositories = {
      octokit: octokitRepository,
    }
    return repositories[repositoryName]
  },
}
