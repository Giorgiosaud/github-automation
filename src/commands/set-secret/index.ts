/* eslint-disable unicorn/no-array-reduce */
import {Command, Flags} from '@oclif/core'
import getGithubToken from '../../helpers/get-github-token'
import {info} from '../../helpers/logger'
import updateSecret from '../../set-secret-helpers/update-secret'
import encryptSecrets from '../../set-secret-helpers/encrypt-secret'
import {rcPath} from '../../helpers/config'
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

    'secret-name': Flags.string({
      char: 'n',
      description: 'Can be multiples secret names separated by space',
      required: true,
      multiple: true,
    }),
    'secret-value': Flags.string({
      required: true,
      description: 'Can be multiples secret values separated by space',
      char: 'x',
      multiple: true,
    }),

    help: Flags.help({char: 'h'}),
  }

  static args = [
  ]

  async run(): Promise<void> {
    try {
      const {flags} = await this.parse(SetSecret)
      if (flags['secret-name'].length !== flags['secret-value'].length) {
        throw new Error('Secrets and values must be the same length')
      }

      const okRepoNames = flags.repositories.every((repo: string) => {
        return /^(([a-z]|[A-Z]|\d)+-?)*\w$/.test(repo)
      })
      if (!okRepoNames) {
        throw new Error('The repository string must only contain numbers leters and dash')
      }

      const token = await getGithubToken(rcPath, flags.organization)
      const secretsToEncrypt = []
      for (const repo of flags.repositories) {
        for (const [index, secret] of flags['secret-value'].entries()) {
          secretsToEncrypt.push(encryptSecrets({token, value: secret, org: flags.organization, repo, name: flags['secret-name'][index]}))
        }
      }

      const promisesEncrypted = await Promise.all(secretsToEncrypt)
      const updateSecretsPromises = promisesEncrypted.map(encriptedData => updateSecret(encriptedData, token))
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
