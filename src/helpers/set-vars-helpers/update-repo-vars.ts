
import repositoryFactory from '../../repositories/repository-factory'
const octokitRepository = repositoryFactory.get('octokit')

export const updateRepoVars = async ({owner, repo, name, value, environment_name}: { owner: string; repo: string; name: string; value: string;environment_name?: string }):Promise<boolean> => {
  try {
    if (!environment_name) {
      try {
        await octokitRepository.getGlobalVariable({owner, repo, name})
        await octokitRepository.patchGlobalVariable({owner, repo, name, value})
      } catch {
        octokitRepository.setGlobalVariable({owner, repo, name, value})
      }

      return true
    }

    try {
      await octokitRepository.getEnvironmentVariable({owner, repo, name, environment_name})
      await octokitRepository.patchEnvironmentVariable({owner, repo, name, environment_name, value})
    } catch {
      await octokitRepository.setEnvironmentVariable({owner, repo, name, environment_name, value})
    }

    return true
  } catch {
    return false
  }
}

