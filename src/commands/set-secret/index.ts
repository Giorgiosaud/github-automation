import {Command} from '@oclif/core'
import getGithubToken from '../../helpers/get-github-token'
import {info} from '../../helpers/logger'
import updateSecret from '../../set-secret-helpers/update-secret'
import encryptSecrets from '../../set-secret-helpers/encrypt-secret'
import {validateEqualLengths, validateRepoNames} from '../../helpers/validations'
import secretVarsFlags from '../../helpers/set-vars-helpers/secret-vars-flags'

export default class SetSecret extends Command {
  static description = 'describe the command here'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation set-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN --secret-value SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
    $ github-automation set-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
    `,
  ]

  static usage='set-secret -r REPOS -n NAMES -x VALUES'

  static strict = false

  static flags = secretVarsFlags

  async run(): Promise<void> {
    const {flags} = await this.parse(SetSecret)
    validateEqualLengths(flags['secret-name'], flags['secret-value'])
    validateRepoNames(flags.repositories)

    const token = await getGithubToken(flags.organization)
    const secretsToEncrypt = []
    for (const repo of flags.repositories) {
      for (const [index, secret] of flags['secret-value'].entries()) {
        secretsToEncrypt.push(encryptSecrets({token, value: secret, org: flags.organization, repo, name: flags['secret-name'][index], environment: flags.environment}))
      }
    }

    const promisesEncrypted = await Promise.all(secretsToEncrypt)
    const updateSecretsPromises = flags.environment ? promisesEncrypted.map(encriptedData => updateSecret({...encriptedData, env: flags.environment}, token)) : promisesEncrypted.map(encriptedData => updateSecret(encriptedData, token))
    try {
      await Promise.all(updateSecretsPromises)
      for (const repo of flags.repositories) {
        for (const [index, secret] of flags['secret-value'].entries()) {
          this.log(info(`Updated secret ${flags['secret-name'][index]} with value ${secret} in org: ${flags.organization} in repo: ${repo}`))
        }
      }
    } catch (error) {
      if (typeof error  === 'string' || error instanceof Error) {
        this.error(error)
      }
    }
  }
}
