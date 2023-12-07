import {Command, Flags} from '@oclif/core'

import SetVars from '../set-vars'

export default class Custom extends Command {
  static description = 'Custom command'

  static examples = [
    `
    $ github-automation custom XXXXX
    `,
  ]

  static flags = {
    owner: Flags.string({
      char: 'o',
      description: 'owner',
      required: true,
    }),
    repos: Flags.string({
      char: 'r',
      description: 'repositories names',
      multiple: true,
      required: true,
    }),
  }

  static hidden = true;
  static strict = false
  static usage='custom XXXXXX'

  async run(): Promise<void> {
    const {flags: {owner, repos}} = await this.parse(Custom)
    for (const repo of repos) {
      SetVars.run(['-o', owner, '-r', repo, '-s', `WIDGET_NAME:${repo.replace('cfg-co', 'cfg')}`])
    }
  }
}
