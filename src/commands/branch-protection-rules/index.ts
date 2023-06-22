import {Command, Flags} from '@oclif/core'
import octokitRepository from '../../repositories/octokit-repository'

export default class BranchProtectionRules extends Command {
  static description = 'Set PRotected Branches and rules'

  static hidden=true

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation branch-protection-rules -r NAME1 NAME2 ... NAMEn -o ORG --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN --secret-value SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
    $ github-automation branch-protection-rules -r NAME1 NAME2 ... NAMEn -o ORG -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
    `,
  ]

  static usage='branch-protection-rules -r REPOS -n NAMES -x VALUES'

  static strict = false

  static flags = {
    likes: Flags.string({
      char: 'l',
      description: 'Likes required in pr',
      required: true,
      default: '2',
    }),
    repositories: Flags.string({
      char: 'r',
      description: 'Can be multiples repositories names',
      required: true,
      multiple: true,
    }),
    organization: Flags.string({
      char: 'o',
      description: 'A single string containing the organization name',
      required: true,
    }),
    branches: Flags.string({
      char: 'b',
      description: 'Can be multiples repositories branches',
      required: true,
      multiple: true,
    }),
    help: Flags.help({char: 'h'}),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(BranchProtectionRules)
    const okRepoNames = flags.repositories.every((repo: string) => {
      return /^(([a-z]|[A-Z]|\d)+-?)*\w$/.test(repo)
    })
    if (!okRepoNames) {
      throw new Error('The repository string must only contain numbers leters and dash')
    }

    const branchesToProtectPromises = []
    for (const repo of flags.repositories) {
      for (const branch of flags.branches) {
        branchesToProtectPromises.push(octokitRepository.protectBranch({owner: flags.organization, repo, branch, countReviewers: Number(flags.likes)}))
      }
    }

    await Promise.all(branchesToProtectPromises)
  }
}
