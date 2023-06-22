/* eslint-disable no-await-in-loop */
import {Command} from '@oclif/core'
import {info} from '../../helpers/logger'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'
import RmSecretFlags from '../../helpers/rm-secret-helpers/rm-secret-flags'

export default class RmSecret extends Command {
  static description = 'describe the command here'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation set-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --secrets SECRET_NAME1:SECRET_VALUE_1 SECRET_NAME2:SECRET_VALUE_2 ... SECRET_NAMEN:SECRET_VALUE_N
    $ github-automation set-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn -s SECRET_NAME1:SECRET_VALUE_1 SECRET_NAME2 ... SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2:SECRET_VALUE_2 ... SECRETVALUEN:SECRET_VALUE_N
    `,
  ]

  static usage='set-secret -r REPOS -n NAMES -x VALUES'

  static strict = false

  static flags = RmSecretFlags

  async run(): Promise<void> {
    const {flags: {organization, repositories, secrets, environment}} = await this.parse(RmSecret)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      this.log(info(`Removing secrets in org: ${organization} in repo: ${repo}`))
      for (const secret of secrets) {
        this.log(info(`Removing secret ${secret} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
        await octoFactory.removeSecret({owner: organization, repo, secret_name: secret, environment})
        this.log(info(`Updated secret ${secret}  in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
      }
    }
  }
}
