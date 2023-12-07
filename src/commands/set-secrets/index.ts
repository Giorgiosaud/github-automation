import {Command} from '@oclif/core'

import {SecretFlags} from '../../helpers/flags/secret-flags'
import {normal, preProcessed, processed} from '../../helpers/logger'
import {validateRepoNames, validateSecrets} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'
import encryptSecret from '../../set-secret-helpers/encrypt-secret'

export default class SetSecret extends Command {
  static description = 'Set Secrets in repo from org'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation set-secret --owner OWNER --repositories NAME1 NAME2 ... NAMEN --secrets NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
    $ github-automation set-secret --environment ENVIRONMENT --owner OWNER --repositories NAME1 NAME2 ... NAMEN --secrets NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N

    $ github-automation set-secret -o OWNER -r NAME1 NAME2 ... NAMEN -s NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
    $ github-automation set-secret -e ENVIRONMENT -o OWNER -r NAME1 NAME2 ... NAMEN -s NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
    `,
  ]

  static flags = SecretFlags

  static strict = false

  static usage='set-secret -e ENVIRONMENT -o OWNER  -r REPOS -s NAMES->VALUES'

  async run(): Promise<void> {
    const {flags: {environment, forced, organization, repositories, secrets}} = await this.parse(SetSecret)
    validateSecrets(secrets)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      console.log(normal(`Updating secrets in org: ${organization} in repo: ${repo}`))
      for (const secret of secrets) {
        const [name, value] = secret.split('->')
        console.log(preProcessed(`Generating Key for secret ${name} with value ${value} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
        const {data: publicKey} = await octoFactory.getPublicKey({environment, forced, owner: organization, repo})
        console.log(preProcessed(`Encrypting secret ${name} with value ${value} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
        const encryptedValue = await encryptSecret({publicKey, value})
        console.log(preProcessed(`Updating secret ${name} with value ${value} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
        await octoFactory.updateSecret({encrypted_value: encryptedValue, environment, key_id: publicKey.key_id, owner: organization, repo, secret_name: name})
        console.log(processed(`Updated secret ${name} with value ${value} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
      }
    }
  }
}
