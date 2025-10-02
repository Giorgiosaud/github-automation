import {Command, Flags} from '@oclif/core'
import {validateRepoNames} from '../../helpers/validations.js'
import repositoryFactory from '../../repositories/repository-factory.js'
import { info } from '../../helpers/logger.js'
export default class MkRepo extends Command {
  static description = 'Create repos'

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
    allBranches: Flags.boolean({
      char: 'b',
      description: 'include All Branches',
      default: true,
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
    const {flags: {organization, repositories, template, allBranches}} = await this.parse(MkRepo)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      info('Creating repo', repo)
      if (template) {
        await octoFactory.createRepoFromTemplate({organization, repo, template, allBranches})
        info('Repo created from template', repo)
        continue
      }

      await octoFactory.createRepo({organization, repo})
      info('Repo created', repo)
    }
  }
}
