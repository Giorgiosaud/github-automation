import {Command, Flags} from '@oclif/core'
import octokitRepository from '../../repositories/octokit-repository'

export default class Userdel extends Command {
  static description = 'Add user to repos'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation userdel -o OWNER -r REPO_NAME1 REPO_NAME2 ... REPO_NAMEn -u githubuser1 githubuser2 ... githubusern -p read
    $ github-automation userdel -o OWNER -r REPO_NAME1 REPO_NAME2 ... REPO_NAMEn -u githubuser1 githubuser2 ... githubusern -p read
    `,
  ]

  static hidden: boolean=true

  static usage=`
  userdel -o OWNER -r GITHUBREPOS… -u GITHUBUSERS… -p [pull,push,admin,maintain,triage]
  `

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
    githubUsers: Flags.string({
      char: 'u',
      description: 'Can be multiples users',
      required: true,
      multiple: true,
    }),
    help: Flags.help({char: 'h'}),
  }

  async run(): Promise<void> {
    const {flags: {repositories, organization, githubUsers}} = await this.parse(Userdel)
    const okRepoNames = repositories.every((repo: string) => {
      return /^([\w-])+$/.test(repo)
    })
    if (!okRepoNames) {
      throw new Error('The repository string must be of type OWNER/NAME')
    }

    const usersToAdd = []
    for (const repo of repositories) {
      for (const username of githubUsers) {
        usersToAdd.push(octokitRepository.removeCollaborator({owner: organization, repo, username}))
      }
    }

    await Promise.all(usersToAdd)
  }
}