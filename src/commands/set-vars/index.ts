import {Command} from '@oclif/core'
import {info} from '../../helpers/logger'
import {validateEqualLengths, validateRepoNames} from '../../helpers/validations'
import updateVars from '../../helpers/set-vars-helpers/update-vars'
import secretVarsFlags from '../../helpers/set-vars-helpers/secret-vars-flags'

export default class SetVars extends Command {
  static description = 'Set Variables for a list of repositories'

  static examples = [
    `
    $ github-automation set-vars -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN --secret-value SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
    $ github-automation set-vars -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
    `,
  ]

  static usage='set-vars -r REPOS -n NAMES -x VALUES'

  static strict = true

  static flags = secretVarsFlags

  async run(): Promise<void> {
    const {flags} = await this.parse(SetVars)
    validateEqualLengths(flags['secret-name'], flags['secret-value'])
    validateRepoNames(flags.repositories)

    // const token = await getGithubToken(flags.organization)

    const varsToSet = []
    for (const repo of flags.repositories) {
      for (const [index, secret] of flags['secret-value'].entries()) {
        varsToSet.push(updateVars({value: secret, owner: flags.organization, repo, name: flags['secret-name'][index], environment_name: flags.environment}))
      }
    }

    await Promise.all(varsToSet)
    for (const repo of flags.repositories) {
      for (const [index, secret] of flags['secret-value'].entries()) {
        this.log(info(`Updated var ${flags['secret-name'][index]} with value ${secret} in org: ${flags.organization} in repo: ${repo}`))
      }
    }
  }
}
