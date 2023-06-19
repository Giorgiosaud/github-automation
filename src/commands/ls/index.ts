import {Command, Flags, ux, Args} from '@oclif/core'
import repositoryFactory from '../../repositories/repository-factory'

export default class ListOrgRepositories extends Command {
  static description = 'List Org Repositories if have access'

  static examples = [
    `
    $ github-automation ls OWNER
    `,
  ]

  static usage='list-org-repositories OWNER'

  static strict = false

  static flags = {
    page: Flags.integer({
      char: 'p',
      description: 'page number',
      default: 1,
    }),
  }

  static args = {
    owner: Args.string({required: true}),
  }

  async run(): Promise<void> {
    const {args: {owner}, flags: {page}} = await this.parse(ListOrgRepositories)
    const octoFactory = repositoryFactory.get('octokit')
    const repositories = await octoFactory.listRepositories({org: owner, page})
    ux.styledObject({
      repositories: repositories.data.map(repo => repo.name),
      page: repositories.headers.link,
    })
  }
}
