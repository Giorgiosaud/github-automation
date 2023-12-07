import {Command, Flags} from '@oclif/core'

import {normal, preProcessed, processed} from '../../helpers/logger'
import {validateRepoNames} from '../../helpers/validations'
import repositoryFactory from '../../repositories/repository-factory'

export default class Teamdel extends Command {
  static description = 'Add user to repos'

  static examples = [
    `
    you must have a personal github token to set the first time that uses this tool
    $ github-automation teamdel -o OWNER -r REPO_NAME1 REPO_NAME2 ... REPO_NAMEn -u githubuser1 githubuser2 ... githubusern -p read
    $ github-automation teamdel -o OWNER -r REPO_NAME1 REPO_NAME2 ... REPO_NAMEn -u githubuser1 githubuser2 ... githubusern -p read
    `,
  ]

  static flags = {
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
    teamSlugs: Flags.string({
      char: 't',
      description: 'Can be multiples users',
      multiple: true,
      required: true,
    }),
  }

  static hidden: boolean=true

  static strict = false
  static usage=`
  teamdel -o OWNER -r GITHUBREPOS… -u GITHUBUSERS… -p [pull,push,admin,maintain,triage]
  `

  async run(): Promise<void> {
    const {flags: {organization, permission, repositories, teamSlugs}} = await this.parse(Teamdel)
    validateRepoNames(repositories)
    const octoFactory = repositoryFactory.get('octokit')

    for (const repo of repositories) {
      console.log(normal(`Updating users in ${repo}`))
      for (const team_slug of teamSlugs) {
        console.log(preProcessed(`Adding team ${team_slug} to ${repo} inside ${organization} as ${permission}}`))
        await octoFactory.delTeam({org: organization, owner: organization, repo, team_slug})
        console.log(processed(`User ${team_slug} added to ${repo} inside ${organization} as ${permission}}`))
      }
    }
  }
}
