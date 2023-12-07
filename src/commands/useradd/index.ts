import {Command, Flags} from '@oclif/core'

import {normal, preProcessed, processed} from '../../helpers/logger'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'

export default class Useradd extends Command {
  static description = 'Add user to repos'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation useradd -o OWNER -r REPO_NAME1 REPO_NAME2 ... REPO_NAMEn -u githubuser1 githubuser2 ... githubusern -p read
    $ github-automation useradd -o OWNER -r REPO_NAME1 REPO_NAME2 ... REPO_NAMEn -u githubuser1 githubuser2 ... githubusern -p read
    `,
  ]

  static flags = {
    githubUsers: Flags.string({
      char: 'u',
      description: 'Can be multiples users',
      multiple: true,
      required: true,
    }),
    help: Flags.help({char: 'h'}),
    organization: Flags.string({
      char: 'o',
      description: 'A single string containing the organization name',
      required: true,
    }),
    permission: Flags.string({
      char: 'p',
      default: 'push',
      description: 'Select Permission to add',
      options: ['pull', 'push', 'admin', 'maintain', 'triage'],
    }),
    repositories: Flags.string({
      char: 'r',
      description: 'Can be multiples repositories names',
      multiple: true,
      required: true,
    }),
  }

  static hidden: boolean=true

  static strict = false
  static usage=`
  useradd -o OWNER -r GITHUBREPOS… -u GITHUBUSERS… -p [pull,push,admin,maintain,triage]
  `

  async run(): Promise<void> {
    const {flags: {githubUsers, organization, permission, repositories}} = await this.parse(Useradd)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')

    for (const repo of repositories) {
      console.log(normal(`Updating users in ${repo}`))
      for (const username of githubUsers) {
        console.log(preProcessed(`Adding user ${username} to ${repo} inside ${organization} as ${permission}}`))
        await octoFactory.addCollaborator({owner: organization, permission, repo, username})
        console.log(processed(`User ${username} added to ${repo} inside ${organization} as ${permission}}`))
      }
    }
  }
}
