import {Command, Flags} from '@oclif/core'
import getGithubToken from '../../helpers/get-github-token'
import {info} from '../../helpers/logger'
import {validateEqualLengths, validateRepoNames} from '../../helpers/validations'
import updateVars from '../../helpers/set-vars-helpers/update-vars'

export default class SetVars extends Command {
  static description = 'describe the command here'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation set-vars -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN --secret-value SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
    $ github-automation set-vars -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
    `,
  ]

  static usage='set-vars -r REPOS -n NAMES -x VALUES'

  static strict = false

  static flags = {
    organization: Flags.string({
      char: 'o',
      description: 'A single string containing the organization name',
      required: true,
    }),
    repositories: Flags.string({
      char: 'r',
      description: 'Can be multiples repositories names',
      required: true,
      multiple: true,
    }),
    environment: Flags.string({
      char: 'e',
      description: 'If is set the env should be activated in the specified environment and create it if not exist',
      required: true,
    }),
    'secret-name': Flags.string({
      char: 'n',
      description: 'Can be multiples secret names separated by space',
      required: true,
      multiple: true,
    }),
    'secret-value': Flags.string({
      required: true,
      description: 'Can be multiples secret values separated by space',
      char: 'x',
      multiple: true,
    }),

    help: Flags.help({char: 'h'}),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(SetVars)
    validateEqualLengths(flags['secret-name'], flags['secret-value'])
    validateRepoNames(flags.repositories)

    const token = await getGithubToken(flags.organization)

    const varsToSet = []
    for (const repo of flags.repositories) {
      for (const [index, secret] of flags['secret-value'].entries()) {
        varsToSet.push(updateVars({token, value: secret, owner: flags.organization, repo, name: flags['secret-name'][index], environment_name: flags.environment}))
      }
    }

    try {
      await Promise.all(varsToSet)
      for (const repo of flags.repositories) {
        for (const [index, secret] of flags['secret-value'].entries()) {
          this.log(info(`Updated var ${flags['secret-name'][index]} with value ${secret} in org: ${flags.organization} in repo: ${repo}`))
        }
      }
    } catch (error) {
      if (typeof error  === 'string' || error instanceof Error) {
        this.error(error)
      }
    }
  }
}
