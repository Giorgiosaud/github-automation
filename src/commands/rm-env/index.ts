import {Command, Flags} from '@oclif/core'

import {info} from '../../helpers/logger'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'
export default class RmEnv extends Command {
  static description = 'Remove environments if exist'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation rm-env --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    $ github-automation rm-env -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    `,
  ]

  static flags = {
    environments: Flags.string({
      char: 'e',
      description: 'If is set the env should be activated in the specified environment and create it if not exist',
      multiple: true,
      required: true,
    }),
    help: Flags.help({char: 'h'}),
    organization: Flags.string({
      char: 'o',
      description: 'A single string containing the organization name',
      required: true,
    }),

    repositories: Flags.string({
      char: 'r',
      description: 'Can be multiples repositories names',
      multiple: true,
      required: true,
    }),
  }

  static strict = false

  static usage='remove-environment -r REPOS -n NAMES -x VALUES'

  async run(): Promise<void> {
    const {flags: {environments, organization, repositories}} = await this.parse(RmEnv)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      console.log(info(`Listing  environments ${environments} in ${repo}`))
      const {data: {environments: existentEnvironments}} = await octoFactory.getEnvironments({organization, repository: repo})
      const envsToRemove = existentEnvironments?.filter(env => environments.includes(env.name)).map(env => env.name) || []
      console.log(info(`Environments to remove ${envsToRemove} in ${repo} inside ${organization}`))
      for (const env of envsToRemove) {
        console.log(info(`Remocing environment ${env} in ${repo} inside ${organization}`))
        await octoFactory.removeEnvironment({environment_name: env, owner: organization, repo})
        console.log(info(`Environment ${env} removed in ${repo} inside ${organization}`))
      }
    }
  }
}
