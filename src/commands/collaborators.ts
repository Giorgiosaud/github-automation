import {Command, flags} from '@oclif/command'
import {info} from '../helpers/logger'
import removeSecret from '../delete-secret/remove-secret'
import deleteUserPermissions from '../collaborators/delete-user-permissions'
import addUserPermissions from '../collaborators/add-user-permissions'

export default class Collaborators extends Command {
  static description = 'Manage Repo collaborators'

  static examples = [
    `
    $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAME_N
    $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAME_N
    `,
  ]

  static usage=`
  collaborators -r GITHUBREPOS… -u GITHUBUSERS… -p [pull,push,admin,maintain,triage]
  collaborators -r GITHUBREPOS… -u GITHUBUSERS… --delete
  `

  static strict = false

  static flags = {
    repositories: flags.string({
      char: 'r',
      description: 'Can be multiples repositories with shape OWNER/REPO separated by space',
      required: true,
      multiple: true,
    }),
    'github-users': flags.string({
      char: 'u',
      description: 'Can be multiples users',
      required: true,
      multiple: true,
    }),
    permissions: flags.enum({
      char: 'p',
      options: ['pull', 'push', 'admin', 'maintain', 'triage'],
      description: 'Select Permission to add',
      default: 'push',
    }),
    delete: flags.boolean({
      char: 'd',
      description: 'delete user permission',
    }),
    help: flags.help({char: 'h'}),
  }

  static args = [
  ]

  async run() {
    try {
      const {flags} = this.parse(Collaborators)
      const okRepoNames = flags.repositories.every((repo: string) => {
        return /.+\/.+/.test(repo)
      })
      if (!okRepoNames) {
        throw new Error('The repository string must be of type OWNER/NAME')
      }
      const rcPath = '.github-automation.rc'
      if (flags.delete) {
        return await flags.repositories.reduce(async (promise, repo) => {
          await promise
          await flags['github-users'].reduce(async (promise, name) => {
            await promise
            await deleteUserPermissions(repo, name, rcPath)
            this.log(info(`Removed user ${name} from repo: ${repo}`))
          }, Promise.resolve())
        }, Promise.resolve())
      }
      return await flags.repositories.reduce(async (promise, repo) => {
        await promise
        await flags['github-users'].reduce(async (promise, name) => {
          await promise
          await addUserPermissions(repo, name, flags.permissions, rcPath)
          this.log(info(`Add user ${name} to repo: ${repo} with: ${flags.permissions}`))
        }, Promise.resolve())
      }, Promise.resolve())
    } catch (error) {
      this.error(error.message || error)
    }
  }
}
