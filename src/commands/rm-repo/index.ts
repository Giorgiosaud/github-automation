import {Command, Flags} from '@oclif/core'

import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'
export default class RmRepo extends Command {
  static description = 'Create repos'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation rm-repo --organization OWNER --repositories NAME1 NAME2 ... NAMEn  
    $ github-automation rm-repo -o Owner -r NAME1 NAME2 ... NAMEn 
    `,
  ]

  static flags = {
    help: Flags.help({char: 'h'}),
    organization: Flags.string({
      char: 'o',
      description: 'A single string containing the organization name',
      required: true,
    }),

    repositories: Flags.string({
      char: 'r',
      description: 'Can be multiples repositories names',
      multiple: true,
      required: true,
    }),
  }

  static strict = false

  static usage='rm-repo -o ORG -r REPOS'

  async run(): Promise<void> {
    const {flags: {organization, repositories}} = await this.parse(RmRepo)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      console.log('Creating repo', repo)
      await octoFactory.deleteRepo({organization, repo})
      console.log('Repo created', repo)
    }
  }
}
