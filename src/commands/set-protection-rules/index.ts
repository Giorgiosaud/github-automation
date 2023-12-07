import {Command, Flags} from '@oclif/core'

import {normal, preProcessed, processed} from '../../helpers/logger'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'

export default class SetPRotectionRules extends Command {
  static description = 'Set Protected Branches and rules'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation branch-protection-rules -r NAME1 NAME2 ... NAMEn -o ORG --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN --secret-value SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
    $ github-automation branch-protection-rules -r NAME1 NAME2 ... NAMEn -o ORG -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
    `,
  ]

  static flags = {
    branches: Flags.string({
      char: 'b',
      description: 'Can be multiples repositories branches',
      multiple: true,
      required: true,
    }),
    help: Flags.help({char: 'h'}),
    likes: Flags.string({
      char: 'l',
      default: '2',
      description: 'Likes required in pr',
      required: true,
    }),
    organization: Flags.string({
      char: 'o',
      description: 'A single string containing the organization name',
      required: true,
    }),
    passingChecks: Flags.string({
      char: 'c',
      description: 'Can be multiples checks to pass to the pr',
      multiple: true,
      required: false,
    }),
    repositories: Flags.string({
      char: 'r',
      description: 'Can be multiples repositories names',
      multiple: true,
      required: true,
    }),
  }

  static strict = false

  static usage='branch-protection-rules -r REPOS -n NAMES -x VALUES'

  async run(): Promise<void> {
    const {flags: {branches, likes, organization, passingChecks, repositories}} = await this.parse(SetPRotectionRules)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      console.log(normal(`Working in ${repo}`))
      for (const branch of branches) {
        console.log(preProcessed(`Protecting branch ${branch} in ${repo}`))
        await octoFactory.protectBranch({branch, countReviewers: Number(likes), owner: organization, passingChecks, repo})
        console.log(processed(`Branch ${branch} protected in ${repo}`))
      }
    }
  }
}
