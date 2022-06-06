import {Command, Flags} from '@oclif/core'
import removeSecret from '../../helpers/delete-secrets'
import {info} from '../../helpers/logger'

export default class DeleteSecret extends Command {
  static description = 'Delete Secret from repo'

  static examples = [
    `
    $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAME_N
    $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAME_N
    `,
  ]

  static usage='delete-secret -r REPOS -n NAMES'

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
  }

  static args = [
  ]

  async run(): Promise<void> {
    try {
      const {flags} = await this.parse(DeleteSecret)
      const okRepoNames = flags.repositories.every((repo: string) => {
        return /.+\/.+/.test(repo)
      })
      if (!okRepoNames) {
        throw new Error('The repository string must be of type OWNER/NAME')
      }

      const rcPath = '.github-automation.rc'
      await flags.repositories.reduce(async (promise, repo) => {
        await promise
        await flags['secret-name'].reduce(async (promise, name) => {
          await promise
          await removeSecret(repo, name, rcPath)
          this.log(info(`Removed secret ${name} from repo: ${repo}`))
        }, Promise.resolve())
      }, Promise.resolve())
    } catch (error) {
      if (typeof error  === 'string' || error instanceof Error) {
        this.error(error)
      }
    }
  }
}
