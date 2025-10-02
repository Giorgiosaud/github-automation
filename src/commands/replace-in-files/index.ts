import {Command, Flags} from '@oclif/core'
import {validateRepoNames} from '../../helpers/validations.js'
import repositoryFactory from '../../repositories/repository-factory.js'
import {info, preProcessed, processed} from '../../helpers/logger.js'
export default class ReplaceInFiles extends Command {
  static description = 'Create environments if not exist'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation replace-in-files --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    $ github-automation replace-in-files -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    `,
  ]

  static usage='replace-in-files -r REPOS -n NAMES -x VALUES'

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
    paths: Flags.string({
      char: 'p',
      description: 'paths of files',
      required: true,
      multiple: true,
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
    name: Flags.string({
      char: 'n',
      description: 'Commiter Name',
      default: 'Jorge Saud',
    }),
    email: Flags.string({
      char: 'e',
      description: 'Commiter Email',
      default: 'jsaud@modyo.com',
    }),
    message: Flags.string({
      char: 'm',
      description: 'Commit Message',
      default: 'Replace in file',
    }),
    branch: Flags.string({
      char: 'b',
      description: 'Branch',
      default: 'main',
    }),

    help: Flags.help({char: 'h'}),
  }

  async run(): Promise<void> {
    const {flags: {organization, repositories, paths, from, to, name, email, message, branch}} = await this.parse(ReplaceInFiles)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      info(`Replace in files in ${repo}`)
      for (const path of paths) {
        preProcessed(`Read File ${path} in ${repo}`)
        const response = await octoFactory.readFile({owner: organization, repo, path}) as {
          data: {
            content: string
            sha: string
          }
        }
        const data = atob(response.data.content) as string
        const sha = response.data.sha as string
        const infonew = data.replaceAll(new RegExp(from, 'g'), to)
        const infonewbase64 = btoa(infonew)
        await octoFactory.writeFile({owner: organization, repo, path, content: infonewbase64, sha, name, email, message,  branch})
        processed(`File in ${path}
        from:
        ${data}
        to:
        ${infonew}
        in: ${repo}`)
      }
    }
  }
}
