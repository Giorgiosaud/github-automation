import {Command, flags} from '@oclif/command'
import {info} from '../helpers/logger'
import listRepos from '../list-org-repositories.ts/list-repos'
import cli from 'cli-ux'

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
    filter: flags.string({
      char: 'f',
      description: 'filter by name contains',
      default: '',
    }),
  }

  static args = [
    {name: 'organization'},
  ]

  async run() {
    try {
      const {args, flags} = this.parse(ListOrgRepositories)
      const rcPath = '.github-automation.rc'
      const repositories = await listRepos(args.organization, rcPath, flags.filter)

      cli.styledObject({
        repositories,
      })
      cli.log(info(`se consiguieron ${repositories.length} repos`))
      return repositories
    } catch (error) {
      if (typeof error  === 'string' || error instanceof Error) {
        this.error(error)
      }
    }
  }
}
