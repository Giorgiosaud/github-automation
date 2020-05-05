import {Command, flags} from '@oclif/command'
import {info, warning} from '../helpers/logger'
import removeSecret from '../delete-secret/remove-secret'

export default class DeleteSecret extends Command {
  static description = 'Delete Secret from repo'

  static examples = [
    `
    $ git-automations delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAME_N
    $ git-automations delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAME_N
    `,
  ]

  static usage='set-secret -r REPOS -n NAMES'

  static strict = false

  static flags = {
    repositories: flags.string({
      char: 'r',
      description: 'Can be multiples repositories with shape OWNER/REPO separated by space',
      required: true,
      multiple: true,
    }),
    'secret-name': flags.string({
      char: 'n',
      description: 'Can be multiples secret names separated by space',
      required: true,
      multiple: true,
    }),
    help: flags.help({char: 'h'}),
  }

  static args = [
  ]

  async run() {
    try {
      const {flags} = this.parse(DeleteSecret)
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
      this.error(error.message || error)
    }
  }
}
