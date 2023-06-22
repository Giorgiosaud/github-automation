/* eslint-disable no-await-in-loop */
import {Command, Flags} from '@oclif/core'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'
import {info} from 'node:console'
export default class MvBranch extends Command {
  static description = 'Remove environments if exist'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation rm-env --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    $ github-automation rm-env -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
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
    branchNaming: Flags.string({
      char: 'b',
      description: 'branchfrom:branchto',
      required: true,
    }),

    help: Flags.help({char: 'h'}),
  }

  async run(): Promise<void> {
    const {flags: {organization, repositories, branchNaming}} = await this.parse(MvBranch)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      const [branch, new_name] = branchNaming.split(':')
      try {
        console.log(info(`checking if ${branch} exist in ${repo} inside ${organization}`))
        await octoFactory.getBranch({owner: organization, repo, branch})
        console.log(info(`Renaming branch ${branch} to ${new_name} in ${repo} inside ${organization}`))
        await octoFactory.renameBranch({owner: organization, repo, branch, new_name})
      } catch {
        throw new Error(`Branch ${branch} does not exist in ${repo} inside ${organization}`)
      }
    }
  }
}
