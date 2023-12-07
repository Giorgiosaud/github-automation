import {Command} from '@oclif/core'

import {normal, preProcessed, processed} from '../../helpers/logger'
import RmSecretFlags from '../../helpers/rm-secret-helpers/rm-secret-flags'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'

export default class RmSecret extends Command {
  static description = 'Rempve Secrets'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation set-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --secrets SECRET_NAME1:SECRET_VALUE_1 SECRET_NAME2:SECRET_VALUE_2 ... SECRET_NAMEN:SECRET_VALUE_N
    $ github-automation set-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn -s SECRET_NAME1:SECRET_VALUE_1 SECRET_NAME2 ... SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2:SECRET_VALUE_2 ... SECRETVALUEN:SECRET_VALUE_N
    `,
  ]

  static flags = RmSecretFlags

  static strict = false

  static usage='set-secret -r REPOS -n NAMES -x VALUES'

  async run(): Promise<void> {
    const {flags: {environment, organization, repositories, secrets}} = await this.parse(RmSecret)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      console.log(normal(`Removing secrets in org: ${organization} in repo: ${repo}`))
      for (const secret of secrets) {
        console.log(preProcessed(`Removing secret ${secret} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
        await octoFactory.removeSecret({environment, owner: organization, repo, secret_name: secret})
        console.log(processed(`Updated secret ${secret}  in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
      }
    }
  }
}
