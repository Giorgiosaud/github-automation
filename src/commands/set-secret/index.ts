/* eslint-disable unicorn/no-array-reduce */
import {Command, Flags} from '@oclif/core'
import {info} from '../../helpers/logger'
import encryptSecret from '../../set-secret-helpers/encrypt-secret'
import updateSecret from '../../set-secret-helpers/update-secret'

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
    repositories: Flags.string({
      char: 'r',
      description: 'Can be multiples repositories with shape OWNER/REPO separated by space',
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
        return /^([\w-])+\/([\w-])+$/.test(repo)
      })
      if (!okRepoNames) {
        throw new Error('The repository string must be of type OWNER/NAME')
      }

      const rcPath = '.github-automation.rc'
      await flags.repositories.reduce(async (promise, repo) => {
        await promise
        await flags['secret-name'].reduce(async (promise, name, index: number) => {
          await promise
          const {encryptedValue, keyId} = await encryptSecret(repo, flags['secret-value'][index], rcPath)
          await updateSecret({encryptedValue, keyId, name, repo, rcPath})
          this.log(info(`Updated secret ${name} with value ${flags['secret-value'][index]} in ${repo}`))
        }, Promise.resolve())
      }, Promise.resolve())
    } catch (error) {
      if (typeof error  === 'string' || error instanceof Error) {
        this.error(error)
      }
    }
  }
}
