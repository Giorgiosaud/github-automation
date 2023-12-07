import {Command, Flags} from '@oclif/core'

import {normal, preProcessed, processed} from '../../helpers/logger'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'
export default class MkEnv extends Command {
  static description = 'Create environments if not exist'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation mk-env --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    $ github-automation mk-env -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
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

  static usage='mk-env -r REPOS -n NAMES -x VALUES'

  async run(): Promise<void> {
    const {flags: {environments, organization, repositories}} = await this.parse(MkEnv)
    console.log(environments, organization, repositories)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    console.log('asdasdasd')
    for (const repo of repositories) {
      console.log(normal(`Listing  environments ${environments} in ${repo}`))
      const {data: {environments: existentEnvironments}} = await octoFactory.getEnvironments({organization, repository: repo})
      const envsToCreate = environments.filter(environment => environment !== existentEnvironments?.find(env => env.name === environment)?.name)
      console.log(preProcessed(`Environments to create ${envsToCreate} in ${repo} inside ${organization}`))
      for (const env of envsToCreate) {
        console.log(preProcessed(`Creating environment ${env} in ${repo} inside ${organization}`))
        await octoFactory.defineEnvironment({environment_name: env, owner: organization, repo})
        console.log(processed(`Environment ${env} created in ${repo} inside ${organization}`))
      }
    }
  }
}
