import {Command} from '@oclif/core'
import {info} from '../../helpers/logger'
import listRepos from '../../list-org-repositories.ts/list-repos'

export default class ReposWithSecret extends Command {
  static description = 'List Org Repositories if have access'

  static examples = [
    `
    $ github-automation repos-with-secret OWNER
    `,
  ]

  static usage='repos-with-secret OWNER'

  static strict = false

  static flags = {}

  static args = [
    {name: 'organization'},
  ]

  async run(): Promise<void> {
    try {
      const {args} = await this.parse(ReposWithSecret)
      const rcPath = '.github-automation.rc'
      await listRepos(args.organization, rcPath)
      info('listing repos')
    } catch (error) {
      if (typeof error  === 'string' || error instanceof Error) {
        this.error(error)
      }
    }
  }
}
