/* eslint-disable no-await-in-loop */
import {Command, Flags} from '@oclif/core'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'
import {info} from '../../helpers/logger'
export default class ReplaceInFile extends Command {
  static description = 'Create environments if not exist'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation mk-env --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    $ github-automation mk-env -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    `,
  ]

  static usage='mk-env -r REPOS -n NAMES -x VALUES'

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
    path: Flags.string({
      char: 'p',
      description: 'path of file',
      required: true,
    }),
    from: Flags.string({
      char: 'f',
      description: 'string to replace',
      required: true,
    }),
    to: Flags.string({
      char: 't',
      description: 'string to replace',
      required: true,
    }),

    help: Flags.help({char: 'h'}),
  }

  async run(): Promise<void> {
    const {flags: {organization, repositories, path, from, to}} = await this.parse(ReplaceInFile)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      console.log(info(`Read File ${path} in ${repo}`))
      const response = await octoFactory.readFile({owner: organization, repo, path})
      const data = atob(response.data.content)
      console.log(data)
      const infonew = btoa(data.replace(from, to))
      await octoFactory.writeFile({owner: organization, repo, path, content: infonew})
    }
  }
}
