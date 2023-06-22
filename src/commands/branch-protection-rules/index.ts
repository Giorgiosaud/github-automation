import {Command, Flags} from '@oclif/core'
import repositoryFactory from '../../repositories/repository-factory'
import {info} from '../../helpers/logger'
import {validateRepoNames} from '../../helpers/validations'

export default class BranchProtectionRules extends Command {
  static description = 'Set PRotected Branches and rules'

  static hidden=true

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation branch-protection-rules -r NAME1 NAME2 ... NAMEn -o ORG --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN --secret-value SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
    $ github-automation branch-protection-rules -r NAME1 NAME2 ... NAMEn -o ORG -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
    `,
  ]

  static usage='branch-protection-rules -r REPOS -n NAMES -x VALUES'

  static strict = false

  static flags = {
    likes: Flags.string({
      char: 'l',
      description: 'Likes required in pr',
      required: true,
      default: '2',
    }),
    repositories: Flags.string({
      char: 'r',
      description: 'Can be multiples repositories names',
      required: true,
      multiple: true,
    }),
    organization: Flags.string({
      char: 'o',
      description: 'A single string containing the organization name',
      required: true,
    }),
    branches: Flags.string({
      char: 'b',
      description: 'Can be multiples repositories branches',
      required: true,
      multiple: true,
    }),
    help: Flags.help({char: 'h'}),
  }

  async run(): Promise<void> {
    const {flags: {repositories, branches, likes, organization}} = await this.parse(BranchProtectionRules)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      branches.map(async  branch => {
        info(`Protecting branch ${branch} in ${repo}`)
        octoFactory.protectBranch({owner: organization, repo, branch, countReviewers: Number(likes)})
        info(`Branch ${branch} protected in ${repo}`)
      })
    }
  }
}
