import {Command, Flags} from '@oclif/core'
import {validateRepoNames} from '../../helpers/validations.js'
import repositoryFactory from '../../repositories/repository-factory.js'
import { info } from '../../helpers/logger.js'
export default class RmRepo extends Command {
  static description = 'Create repos'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation rm-repo --organization OWNER --repositories NAME1 NAME2 ... NAMEn  
    $ github-automation rm-repo -o Owner -r NAME1 NAME2 ... NAMEn 
    `,
  ]

  static usage='rm-repo -o ORG -r REPOS'

  static strict = false

  static flags = {
    organization: Flags.string({
      char: 'o',
      description: 'A single string containing the organization name',
      required: true,
    }),
    repositories: Flags.string({
      char: 'r',
      description: 'Can be multiples repositories names',
      required: true,
      multiple: true,
    }),

    help: Flags.help({char: 'h'}),
  }

  async run(): Promise<void> {
    const {flags: {organization, repositories}} = await this.parse(RmRepo)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      info(`Creating repo ${repo}`)
      await octoFactory.deleteRepo({organization, repo})
      console.info('Repo created', repo)
    }
  }
}
