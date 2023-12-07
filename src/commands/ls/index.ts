import {Args, Command, Flags, ux} from '@oclif/core'

import repositoryFactory from '../../repositories/repository-factory'

export default class Ls extends Command {
  static args = {
    owner: Args.string({required: true}),
  }

  static description = 'List Org Repositories if have access'

  static examples = [
    `
    $ github-automation ls OWNER
    `,
  ]

  static flags = {
    page: Flags.integer({
      char: 'p',
      default: 1,
      description: 'page number',
    }),
  }

  static strict = false

  static usage = 'list-org-repositories OWNER'

  async run(): Promise<void> {
    const {args: {owner}, flags: {page}} = await this.parse(Ls)
    const octoFactory = repositoryFactory.get('octokit')
    const repositories = await octoFactory.listRepositories({org: owner, page})

    ux.styledObject({
      page: repositories.headers.link,
      repositories: repositories.data.map(repo => repo.name),
    })
  }
}
