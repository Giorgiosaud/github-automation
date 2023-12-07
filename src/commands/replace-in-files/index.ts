import {Command, Flags} from '@oclif/core'

import {info, preProcessed, processed} from '../../helpers/logger'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'
export default class ReplaceInFiles extends Command {
  static description = 'Create environments if not exist'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation replace-in-files --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    $ github-automation replace-in-files -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    `,
  ]

  static flags = {
    branch: Flags.string({
      char: 'b',
      default: 'main',
      description: 'Branch',
    }),
    email: Flags.string({
      char: 'e',
      default: 'jsaud@modyo.com',
      description: 'Commiter Email',
    }),
    from: Flags.string({
      char: 'f',
      description: 'string to replace',
      required: true,
    }),
    help: Flags.help({char: 'h'}),
    message: Flags.string({
      char: 'm',
      default: 'Replace in file',
      description: 'Commit Message',
    }),
    name: Flags.string({
      char: 'n',
      default: 'Jorge Saud',
      description: 'Commiter Name',
    }),
    organization: Flags.string({
      char: 'o',
      description: 'A single string containing the organization name',
      required: true,
    }),
    paths: Flags.string({
      char: 'p',
      description: 'paths of files',
      multiple: true,
      required: true,
    }),
    repositories: Flags.string({
      char: 'r',
      description: 'Can be multiples repositories names',
      multiple: true,
      required: true,
    }),

    to: Flags.string({
      char: 't',
      description: 'string to replace',
      required: true,
    }),
  }

  static strict = false

  static usage='replace-in-files -r REPOS -n NAMES -x VALUES'

  async run(): Promise<void> {
    const {flags: {branch, email, from, message, name, organization, paths, repositories, to}} = await this.parse(ReplaceInFiles)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      console.log(info(`Replace in files in ${repo}`))
      for (const path of paths) {
        console.log(preProcessed(`Read File ${path} in ${repo}`))
        const response = await octoFactory.readFile({owner: organization, path, repo}) as {
          data: {
            content: string
            sha: string
          }
        }
        const data = atob(response.data.content) as string
        const sha = response.data.sha as string
        const infonew = data.replaceAll(new RegExp(from, 'g'), to)
        const infonewbase64 = btoa(infonew)
        await octoFactory.writeFile({branch, content: infonewbase64, email, message, name, owner: organization, path, repo,  sha})
        console.log(processed(`File in ${path}
        from:
        ${data}
        to:
        ${infonew}
        in: ${repo}`))
      }
    }
  }
}
