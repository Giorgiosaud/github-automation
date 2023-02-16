import {Command, Flags, ux, Args} from '@oclif/core'
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

  static args = {
    organization: Args.string(),
  }

  async run(): Promise<void> {
    try {
      const {args, flags} = await this.parse(ListOrgRepositories)
      const repositories = args.organization ? await listRepos(args.organization, flags.filter) : []

      ux.styledObject({
        repositories,
      })
      ux.log(info(`se consiguieron ${repositories.length} repos`))
    } catch (error) {
      if (typeof error  === 'string' || error instanceof Error) {
        this.error(error)
      }
    }
  }
}
