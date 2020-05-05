import {Command, flags} from '@oclif/command'
import * as figlet from 'figlet'
import {info} from '../helpers/logger'
import updateSecret from '../set-secret-helpers/update-secret'
import encryptSecret from '../set-secret-helpers/encrypt-secret'

export default class SetSecret extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ git-automations hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'repository', required: true},
    {name: 'secret-name', required: true},
    {name: 'secret-value', required: true},
  ]

  async run() {
    const {args} = this.parse(SetSecret)

    this.log(figlet.textSync(`Setting Secret ${args['secret-name']}`, {
      font: '4Max',
      horizontalLayout: 'default',
      verticalLayout: 'default',
    }))
    const {encrypted_value, key_id} = await encryptSecret(args.repository, args['secret-value'])
    await updateSecret(encrypted_value, key_id, args.repository, args['secret-name'])
    this.log(info(`Updated secret ${args['secret-name']} with value ${args['secret-value']} in ${args.repository}`,))
    return true
  }
}
