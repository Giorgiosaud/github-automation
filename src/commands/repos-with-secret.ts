import {Command} from '@oclif/command'
import {info} from '../helpers/logger'
import listRepos from '../list-org-repositories.ts/list-repos'

export default class ReposWithSecret extends Command {
  static description = 'List Org Repositories if have access'

  static examples = [
    `
    $ github-automation repos-with-secret OWNER
    `,
  ]

  static usage='repos-with-secret OWNER'

  static strict = false

  static flags = {
  }

  static args = [
    {name: 'organization'},
  ]

  async run() {
    try {
      const {args} = this.parse(ReposWithSecret)
      const rcPath = '.github-automation.rc'
      const orgRepos = await listRepos(args.organization, rcPath)
      info('listing repos')
      return orgRepos
    } catch (error) {
      this.error(error.message || error)
    }
  }
}
