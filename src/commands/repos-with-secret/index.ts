import {Command, Args} from '@oclif/core'
import {info} from '../../helpers/logger'
import ls from '../../ls/ls'
import getGithubToken from '../../helpers/get-github-token'

export default class ReposWithSecret extends Command {
  static description = 'List Org Repositories if have access'

  static examples = [
    `
    $ github-automation repos-with-secret OWNER
    `,
  ]

  static usage='repos-with-secret OWNER'

  static strict = false

  static args = {
    organization: Args.string(),
    page: Args.integer({default: 1}),
  }

  async run(): Promise<void> {
    const {args: {page, organization}} = await this.parse(ReposWithSecret)
    if (organization) {
      const token = await getGithubToken(organization)
      await ls({token, owner: organization, page})
    }

    info('listing repos')
  }
}
