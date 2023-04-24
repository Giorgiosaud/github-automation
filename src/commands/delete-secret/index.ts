
import {Command, Flags} from '@oclif/core'
import removeSecret from '../../helpers/delete-secrets'
import getGithubToken from '../../helpers/get-github-token'
import {info} from '../../helpers/logger'
import {validateRepoNames} from '../../helpers/validations'

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
    organization: Flags.string({
      char: 'o',
      description: 'a single sting with the name of org',
      required: true,
    }),
    repositories: Flags.string({
      char: 'r',
      description: 'Can be multiples repositories with shape REPO separated by space',
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

  async run(): Promise<void> {
    try {
      const {flags} = await this.parse(DeleteSecret)

      validateRepoNames(flags.repositories)

      const organization = flags.organization
      const token = await getGithubToken(organization)
      const secretsToRemove = []

      for (const repo of flags.repositories) {
        for (const name of flags['secret-name']) {
          secretsToRemove.push(removeSecret({repo, organization, name, token}))
        }
      }

      await Promise.all(secretsToRemove)
      for (const repo of flags.repositories) {
        for (const name of flags['secret-name']) {
          this.log(info(`Removed secret ${name} from repo: ${repo} in ${organization}`))
        }
      }
    } catch (error) {
      if (typeof error  === 'string' || error instanceof Error) {
        this.error(error)
      }
    }
  }
}
