/* eslint-disable no-await-in-loop */
import {Command} from '@oclif/core'
import {info} from '../../helpers/logger'
import {validateRepoNames, validateSecrets} from '../../helpers/validations'
import secretVarsFlags from '../../helpers/set-vars-helpers/secret-vars-flags'
import repositoryFactory from '../../repositories/repository-factory'
import encryptSecret from '../../set-secret-helpers/encrypt-secret'

export default class SetSecret extends Command {
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
    const {flags: {organization, repositories, secrets, environment}} = await this.parse(SetSecret)
    validateSecrets(secrets)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      this.log(info(`Updating secrets in org: ${organization} in repo: ${repo}`))
      for (const secret of secrets) {
        const [name, value] = secret.split(':')
        this.log(info(`Generating Key for secret ${name} with value ${value} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
        const {data: publicKey} = await octoFactory.getPublicKey({owner: organization, repo, environment})
        this.log(info(`Encrypting secret ${name} with value ${value} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
        const encryptedValue = await encryptSecret({value, publicKey})
        this.log(info(`Updating secret ${name} with value ${value} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
        await octoFactory.updateSecret({owner: organization, repo, secret_name: name, encrypted_value: encryptedValue, key_id: publicKey.key_id, environment})
        this.log(info(`Updated secret ${name} with value ${value} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
      }
    }
  }
}