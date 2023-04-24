import {Command, Flags} from '@oclif/core'
import getGithubToken from '../../helpers/get-github-token'
import {validateRepoNames} from '../../helpers/validations'
import getEnvironment from '../../helpers/environments/get-environment'
import createEnvironment from '../../helpers/environments/create-environment'
export default class CreateEnvironment extends Command {
  static description = 'describe the command here'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation create-environment --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environment ENVIRONMENTA ENVIRONMENTB
    $ github-automation create-environment -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environment ENVIRONMENTA ENVIRONMENTB
    `,
  ]

  static usage='create-environment -r REPOS -n NAMES -x VALUES'

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

    help: Flags.help({char: 'h'}),
  }

  async run(): Promise<void> {
    try {
      const {flags} = await this.parse(CreateEnvironment)
      const token = await getGithubToken(flags.organization)
      validateRepoNames(flags.repositories)
      const getEnvironmentsOfrepos = flags.repositories.map(repo =>  getEnvironment(token, flags.organization, repo))

      const reposEnvs = await Promise.all(getEnvironmentsOfrepos)
      const repoEnvsToCreate:string[] = []
      for (const [index, envs] of reposEnvs.entries()) {
        const findHasEnv = envs?.find(env => env.name === flags.environment)
        if (!findHasEnv) {
          repoEnvsToCreate.push(flags.repositories[index])
        }
      }

      const actionToCreate = repoEnvsToCreate.map(repo => {
        return createEnvironment(token, flags.organization, repo, flags.environment)
      })
      console.log(actionToCreate)

      await Promise.all(actionToCreate)
    } catch (error) {
      if (typeof error  === 'string' || error instanceof Error) {
        this.error(error)
      }
    }
  }
}
