import {Command, Flags} from '@oclif/core'
import getGithubToken from '../../helpers/get-github-token'
import {info} from '../../helpers/logger'
import updateSecret from '../../set-secret-helpers/update-secret'
import encryptSecrets from '../../set-secret-helpers/encrypt-secret'
import {rcPath} from '../../helpers/config'
import protectBranch from '../../branch-protection-rules-helpers/protectBranch'
export default class BranchProtectionRules extends Command {
  static description = 'describe the command here'

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

  static args = [
    // {
    //   name: 'permissions',               // name of arg to show in help and reference with args[name]
    //   required: true,            // make the arg required with `required: true`
    //   description: 'branch permissions body', // help description
    // },
  ]

  async run(): Promise<void> {
    try {
      const {flags} = await this.parse(BranchProtectionRules)
      const okRepoNames = flags.repositories.every((repo: string) => {
        return /^(([a-z]|[A-Z]|\d)+-?)*\w$/.test(repo)
      })
      if (!okRepoNames) {
        throw new Error('The repository string must only contain numbers leters and dash')
      }

      const token = await getGithubToken(rcPath, flags.organization)
      const branchesToProtectPromises = []
      for (const repo of flags.repositories) {
        for (const branch of flags.branches) {
          branchesToProtectPromises.push(protectBranch(token, flags.organization, repo, branch))
        }
      }

      const branchesProtected = await Promise.all(branchesToProtectPromises)
    } catch (error) {
      if (typeof error  === 'string' || error instanceof Error) {
        this.error(error)
      }
    }
  }
}
