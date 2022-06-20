/* eslint-disable unicorn/no-array-reduce */
import {Command, Flags} from '@oclif/core'
import addUserPermissions from '../../collaborators/add-user-permissions'
import deleteUserPermissions from '../../collaborators/delete-user-permissions'
import {info} from '../../helpers/logger'

export default class Collaborators extends Command {
  static description = 'Manage Repo collaborators'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
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
    repositories: Flags.string({
      char: 'r',
      description: 'Can be multiples repositories with shape OWNER/REPO separated by space',
      required: true,
      multiple: true,
    }),
    'github-users': Flags.string({
      char: 'u',
      description: 'Can be multiples users',
      required: true,
      multiple: true,
    }),
    permissions: Flags.enum({
      char: 'p',
      options: ['pull', 'push', 'admin', 'maintain', 'triage'],
      description: 'Select Permission to add',
      default: 'push',
    }),
    delete: Flags.boolean({
      char: 'd',
      description: 'delete user permission',
    }),
    help: Flags.help({char: 'h'}),
  }

  async run(): Promise<void> {
    try {
      const {flags} = await this.parse(Collaborators)
      const okRepoNames = flags.repositories.every((repo: string) => {
        return /^([\w-])+\/([\w-])+$/.test(repo)
      })
      if (!okRepoNames) {
        throw new Error('The repository string must be of type OWNER/NAME')
      }

      const rcPath = '.github-automation.rc'
      if (flags.delete) {
        return await flags.repositories.reduce(async (promise, repo) => {
          await promise
          await flags['github-users'].reduce(async (promiseI, name) => {
            await promiseI
            await deleteUserPermissions(repo, name, rcPath)
            this.log(info(`Removed user ${name} from repo: ${repo}`))
          }, Promise.resolve())
        }, Promise.resolve())
      }

      return await flags.repositories.reduce(async (promise, repo) => {
        await promise
        await flags['github-users'].reduce(async (promiseI, name) => {
          await promiseI
          await addUserPermissions(repo, name, flags.permissions, rcPath)
          this.log(info(`Add user ${name} to repo: ${repo} with: ${flags.permissions}`))
        }, Promise.resolve())
      }, Promise.resolve())
    } catch (error) {
      if (typeof error  === 'string' || error instanceof Error) {
        this.error(error)
      }
    }
  }
}
