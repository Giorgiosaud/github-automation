import {Command} from '@oclif/core'
import getGithubToken from '../../helpers/get-github-token'
import {info} from '../../helpers/logger'
import {validateRepoNames} from '../../helpers/validations'
import removeSecret from '../../helpers/rm-secret-helpers/rm-secrets'
import RmSecretFlags from '../../helpers/rm-secret-helpers/rm-secret-flags'

export default class RmSecret extends Command {
  static description = 'remove a secret from a repository or environment'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation rm-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN 
    $ github-automation rm-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN 
    `,
  ]

  static usage='rm-secret -r REPOS -n NAMES -e ENVIRONMENT_NAME'

  static strict = false

  static flags = RmSecretFlags
  async run(): Promise<void> {
    const {flags} = await this.parse(RmSecret)
    validateRepoNames(flags.repositories)

    const token = await getGithubToken(flags.organization)

    const varsToSet = []
    for (const repo of flags.repositories) {
      for (const [, name] of flags['secret-name'].entries()) {
        varsToSet.push(removeSecret({token, owner: flags.organization, repo, name, environment_name: flags.environment}))
      }
    }

    await Promise.all(varsToSet)
    for (const repo of flags.repositories) {
      for (const [, name] of flags['secret-name'].entries()) {
        this.log(info(`Removed secret ${name} in org: ${flags.organization} in repo: ${repo}`))
      }
    }
  }
}
