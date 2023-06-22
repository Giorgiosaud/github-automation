/* eslint-disable no-await-in-loop */
import {Command} from '@oclif/core'
import {info} from '../../helpers/logger'
import {validateRepoNames, validateSecrets} from '../../helpers/validations'
import secretVarsFlags from '../../helpers/set-vars-helpers/secret-vars-flags'
import repositoryFactory from '../../repositories/repository-factory'

export default class SetVars extends Command {
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

  static flags = secretVarsFlags

  async run(): Promise<void> {
    const {flags: {organization, repositories, secrets, environment}} = await this.parse(SetVars)
    validateSecrets(secrets)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      this.log(info(`Updating secrets in org: ${organization} in repo: ${repo}`))
      for (const secret of secrets) {
        const [name, value] = secret.split(':')
        this.log(info(`Updating variables ${name} with value ${value} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
        await octoFactory.updateVariables({owner: organization, repo, name, value, environment})
        this.log(info(`Updated variable ${name} with value ${value} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
      }
    }
  }
}
