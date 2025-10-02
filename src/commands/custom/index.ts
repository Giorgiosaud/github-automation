import {Command, Flags} from '@oclif/core'
import SetVars from '../set-vars/index.js'

export default class Custom extends Command {
  static description = 'Custom command'

  static examples = [
    `
    $ github-automation custom XXXXX
    `,
  ]

  static usage='custom XXXXXX'

  static hidden = true;
  
  static flags = {
    repos: Flags.string({
      char: 'r',
      description: 'repositories names',
      multiple: true,
      required: true,
    }),
    owner: Flags.string({
      char: 'o',
      required: true,
      description: 'owner',
    }),
  }

  async run(): Promise<void> {
    const {flags: {repos, owner}} = await this.parse(Custom)
    for (const repo of repos) {
      SetVars.run(['-o', owner, '-r', repo, '-s', `WIDGET_NAME:${repo.replace('cfg-co', 'cfg')}`])
    }
  }
}
