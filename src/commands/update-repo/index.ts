import {Command, Flags} from '@oclif/core'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'
import {UpdateReposBody} from '../../repositories/octokit-repository'
export default class MkRepo extends Command {
  static description = 'Update repos'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation mk-repo --organization OWNER --repositories NAME1 NAME2 ... NAMEn  
    $ github-automation mk-repo -o Owner -r NAME1 NAME2 ... NAMEn 
    `,
  ]

  static usage='mk-repo -o ORG -r REPOS'

  static strict = false

  static flags = {
    organization: Flags.string({
      char: 'o',
      description: 'A single string containing the organization name',
      required: true,
    }),
    template: Flags.string({
      char: 't',
      description: 'a template name',
      required: false,
    }),
    updateMetadata: Flags.string({
      char: 'u',
      description: 'update metadata',
      required: true,
    }),
    help: Flags.help({char: 'h'}),
  }

  async run(): Promise<void> {
    const {flags: {organization, repositories, updateMetadata}} = await this.parse(MkRepo)
    const data:  UpdateReposBody = JSON.parse(updateMetadata)

    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      console.log('updating repo', repo)
      await octoFactory.updateRepo({organization, repo, data})
      console.log('Repo updated with info', repo)
    }
  }
}
