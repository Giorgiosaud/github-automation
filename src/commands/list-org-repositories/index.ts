import {Command, Flags, CliUx} from '@oclif/core'
import {info} from '../../helpers/logger'
import listRepos from '../../list-org-repositories.ts/list-repos'

export default class ListOrgRepositories extends Command {
  static description = 'List Org Repositories if have access'

  static examples = [
    `
    $ github-automation list-org-repositories OWNER
    `,
  ]

  static usage='list-org-repositories OWNER'

  static strict = false

  static flags = {
    filter: Flags.string({
      char: 'f',
      description: 'filter by name contains',
      default: '',
    }),
  }

  static args = [
    {name: 'organization'},
  ]

  async run(): Promise<void> {
    try {
      const {args, flags} = await this.parse(ListOrgRepositories)
      const rcPath = '.github-automation.rc'
      const repositories = await listRepos(args.organization, rcPath, flags.filter)

      CliUx.ux.styledObject({
        repositories,
      })
      CliUx.ux.log(info(`se consiguieron ${repositories.length} repos`))
    } catch (error) {
      if (typeof error  === 'string' || error instanceof Error) {
        this.error(error)
      }
    }
  }
}
