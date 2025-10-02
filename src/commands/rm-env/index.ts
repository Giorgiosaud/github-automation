import {Command, Flags} from '@oclif/core'
import {validateRepoNames} from '../../helpers/validations.js'
import {info} from '../../helpers/logger.js'
import repositoryFactory from '../../repositories/repository-factory.js'
import { Endpoints } from '@octokit/types'
export default class RmEnv extends Command {
  static description = 'Remove environments if exist'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation rm-env --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    $ github-automation rm-env -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    `,
  ]

  static usage='remove-environment -r REPOS -n NAMES -x VALUES'

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
    environments: Flags.string({
      char: 'e',
      description: 'If is set the env should be activated in the specified environment and create it if not exist',
      required: true,
      multiple: true,
    }),

    help: Flags.help({char: 'h'}),
  }

  async run(): Promise<void> {
    const {flags: {organization, repositories, environments}} = await this.parse(RmEnv)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      info(`Listing  environments ${environments} in ${repo}`)
      const {data: {environments: existentEnvironments}} = await octoFactory.getEnvironments({organization, repository: repo}) as Endpoints['GET /repos/{owner}/{repo}/environments']['response']
      const envsToRemove = existentEnvironments?.filter(env => environments.includes(env.name)).map(env => env.name) || []
      info(`Environments to remove ${envsToRemove} in ${repo} inside ${organization}`)
      for (const env of envsToRemove) {
        info(`Remocing environment ${env} in ${repo} inside ${organization}`)
        await octoFactory.removeEnvironment({owner: organization, repo, environment_name: env})
        info(`Environment ${env} removed in ${repo} inside ${organization}`)
      }
    }
  }
}
