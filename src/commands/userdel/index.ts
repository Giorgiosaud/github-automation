import {Command, Flags} from '@oclif/core'

import {normal, preProcessed, processed} from '../../helpers/logger'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'

export default class Userdel extends Command {
  static description = 'Add user to repos'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation userdel -o OWNER -r REPO_NAME1 REPO_NAME2 ... REPO_NAMEn -u githubuser1 githubuser2 ... githubusern -p read
    $ github-automation userdel -o OWNER -r REPO_NAME1 REPO_NAME2 ... REPO_NAMEn -u githubuser1 githubuser2 ... githubusern -p read
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
  userdel -o OWNER -r GITHUBREPOS… -u GITHUBUSERS… -p [pull,push,admin,maintain,triage]
  `

  async run(): Promise<void> {
    const {flags: {githubUsers, organization, repositories}} = await this.parse(Userdel)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')

    for (const repo of repositories) {
      console.log(normal(`Updating users in ${repo}`))
      for (const username of githubUsers) {
        console.log(preProcessed(`Removing user ${username} to ${repo} inside ${organization}`))
        await octoFactory.removeCollaborator({owner: organization, repo, username})
        console.log(processed(`User ${username} removed from ${repo} inside ${organization}`))
      }
    }
  }
}
