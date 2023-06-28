import {Command} from '@oclif/core'
import {normal, preProcessed, processed} from '../../helpers/logger'
import {validateRepoNames, validateSecrets} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'
import VarsFlags from '../../helpers/flags/vars-flags'

export default class SetVars extends Command {
  static description = 'Set Variables in repo from org'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation set-vars --owner OWNER --repositories NAME1 NAME2 ... NAMEN --variables NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
    $ github-automation set-vars --environment ENVIRONMENT --owner OWNER --repositories NAME1 NAME2 ... NAMEN --variables NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N

    $ github-automation set-vars -o OWNER -r NAME1 NAME2 ... NAMEN -v NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
    $ github-automation set-vars -e ENVIRONMENT -o OWNER -r NAME1 NAME2 ... NAMEN -v NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
    `,
  ]

  static usage='set-vars -e ENV -r REPOS -o OWNER -v NAMES->VALUES'

  static strict = false

  static flags = VarsFlags

  async run(): Promise<void> {
    const {flags: {organization, repositories, variables, environment, forced}} = await this.parse(SetVars)
    validateSecrets(variables)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      console.log(normal(`Updating secrets in org: ${organization} in repo: ${repo}`))
      for (const variable of variables) {
        const [name, value] = variable.split('->')
        console.log(preProcessed(`Updating variables ${name} with value ${value} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
        await octoFactory.updateVariables({owner: organization, repo, name, value, environment, forced})
        console.log(processed(`Updated variable ${name} with value ${value} in org: ${organization} in repo: ${repo} ${environment ? `in environment: ${environment}` : ''}`))
      }
    }
  }
}
