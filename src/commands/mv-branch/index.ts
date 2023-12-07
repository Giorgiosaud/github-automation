
import {Command, Flags} from '@oclif/core'

import {preProcessed, processed} from '../../helpers/logger'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'
export default class MvBranch extends Command {
  static description = 'Remove environments if exist'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation rm-env --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    $ github-automation rm-env -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
    `,
  ]

  static flags = {
    branchNaming: Flags.string({
      char: 'b',
      description: 'branchfrom:branchto',
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

  static usage='create-environment -r REPOS -n NAMES -x VALUES'

  async run(): Promise<void> {
    const {flags: {branchNaming, organization, repositories}} = await this.parse(MvBranch)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')
    for (const repo of repositories) {
      const [branch, new_name] = branchNaming.split(':')
      try {
        console.log(preProcessed(`checking if ${branch} exist in ${repo} inside ${organization}`))
        await octoFactory.getBranch({branch, owner: organization, repo})
        console.log(preProcessed(`Renaming branch ${branch} to ${new_name} in ${repo} inside ${organization}`))
        await octoFactory.renameBranch({branch, new_name, owner: organization, repo})
        console.log(processed(`Branch ${branch} renamed to ${new_name} in ${repo} inside ${organization}`))
      } catch {
        throw new Error(`Branch ${branch} does not exist in ${repo} inside ${organization}`)
      }
    }
  }
}
