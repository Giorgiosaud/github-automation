import {Command, Flags, ux, Args} from '@oclif/core'
import repositoryFactory from '../../repositories/repository-factory.js'
import { Endpoints } from '@octokit/types'

export default class Ls extends Command {
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
    const {args: {owner}, flags: {page}} = await this.parse(Ls)
    const octoFactory = repositoryFactory.get('octokit')
    const repositories = await octoFactory.listRepositories({org: owner, page}) as Endpoints['GET /orgs/{org}/repos']['response']
    ux.colorizeJson({
      repositories: repositories.data.map(repo => repo.name),
      page: repositories.headers.link,
    })
  }
}
