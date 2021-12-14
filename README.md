hola
====



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/hola.svg)](https://npmjs.org/package/hola)
[![Downloads/week](https://img.shields.io/npm/dw/hola.svg)](https://npmjs.org/package/hola)
[![License](https://img.shields.io/npm/l/hola.svg)](https://github.com/Giorgiosaud/hola/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g github-automation
$ github-automation COMMAND
running command...
$ github-automation (-v|--version|version)
github-automation/2.0.0 darwin-x64 node-v14.18.1
$ github-automation --help [COMMAND]
USAGE
  $ github-automation COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`github-automation 
  collaborators -r GITHUBREPOS… -u GITHUBUSERS… -p [pull,push,admin,maintain,triage]
  collaborators -r GITHUBREPOS… -u GITHUBUSERS… --delete
  `](#github-automation---collaborators--r-githubrepos--u-githubusers--p-pullpushadminmaintaintriage--collaborators--r-githubrepos--u-githubusers---delete--)
* [`github-automation delete-secret -r REPOS -n NAMES`](#github-automation-delete-secret--r-repos--n-names)
* [`github-automation help [COMMAND]`](#github-automation-help-command)
* [`github-automation list-org-repositories OWNER`](#github-automation-list-org-repositories-owner)
* [`github-automation repos-with-secret OWNER`](#github-automation-repos-with-secret-owner)
* [`github-automation set-secret -r REPOS -n NAMES -x VALUES`](#github-automation-set-secret--r-repos--n-names--x-values)

## `github-automation 
  collaborators -r GITHUBREPOS… -u GITHUBUSERS… -p [pull,push,admin,maintain,triage]
  collaborators -r GITHUBREPOS… -u GITHUBUSERS… --delete
  `

Manage Repo collaborators

```
USAGE
  $ github-automation 
    collaborators -r GITHUBREPOS… -u GITHUBUSERS… -p [pull,push,admin,maintain,triage]
    collaborators -r GITHUBREPOS… -u GITHUBUSERS… --delete

OPTIONS
  -d, --delete                                         delete user permission
  -h, --help                                           show CLI help
  -p, --permissions=(pull|push|admin|maintain|triage)  [default: push] Select Permission to add

  -r, --repositories=repositories                      (required) Can be multiples repositories with shape OWNER/REPO
                                                       separated by space

  -u, --github-users=github-users                      (required) Can be multiples users

EXAMPLE

      you must have a personal github token to set the first time that uses this tool
      $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn --secret-name 
  SECRET_NAME1 SECRET_NAME2 ... SECRET_NAME_N
      $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn -n SECRET_NAME1 
  SECRET_NAME2 ... SECRET_NAME_N
```

_See code: [src/commands/collaborators.ts](https://github.com/Giorgiosaud/github-automation/blob/v2.0.0/src/commands/collaborators.ts)_

## `github-automation delete-secret -r REPOS -n NAMES`

Delete Secret from repo

```
USAGE
  $ github-automation delete-secret -r REPOS -n NAMES

OPTIONS
  -h, --help                       show CLI help
  -n, --secret-name=secret-name    (required) Can be multiples secret names separated by space
  -r, --repositories=repositories  (required) Can be multiples repositories with shape OWNER/REPO separated by space

EXAMPLE

      $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn --secret-name 
  SECRET_NAME1 SECRET_NAME2 ... SECRET_NAME_N
      $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn -n SECRET_NAME1 
  SECRET_NAME2 ... SECRET_NAME_N
```

_See code: [src/commands/delete-secret.ts](https://github.com/Giorgiosaud/github-automation/blob/v2.0.0/src/commands/delete-secret.ts)_

## `github-automation help [COMMAND]`

display help for github-automation

```
USAGE
  $ github-automation help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.17/src/commands/help.ts)_

## `github-automation list-org-repositories OWNER`

List Org Repositories if have access

```
USAGE
  $ github-automation list-org-repositories OWNER

OPTIONS
  -f, --filter=filter  filter by name contains

EXAMPLE

      $ github-automation list-org-repositories OWNER
```

_See code: [src/commands/list-org-repositories.ts](https://github.com/Giorgiosaud/github-automation/blob/v2.0.0/src/commands/list-org-repositories.ts)_

## `github-automation repos-with-secret OWNER`

List Org Repositories if have access

```
USAGE
  $ github-automation repos-with-secret OWNER

EXAMPLE

      $ github-automation repos-with-secret OWNER
```

_See code: [src/commands/repos-with-secret.ts](https://github.com/Giorgiosaud/github-automation/blob/v2.0.0/src/commands/repos-with-secret.ts)_

## `github-automation set-secret -r REPOS -n NAMES -x VALUES`

describe the command here

```
USAGE
  $ github-automation set-secret -r REPOS -n NAMES -x VALUES

OPTIONS
  -h, --help                       show CLI help
  -n, --secret-name=secret-name    (required) Can be multiples secret names separated by space
  -r, --repositories=repositories  (required) Can be multiples repositories with shape OWNER/REPO separated by space
  -x, --secret-value=secret-value  (required) Can be multiples secret values separated by space

EXAMPLE

      you must have a personal github token to set the first time that uses this tool
      $ github-automation set-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --secret-name SECRET_NAME1 SECRET_NAME2 
  ... SECRET_NAMEN --secret-value SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
      $ github-automation set-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn -n SECRET_NAME1 SECRET_NAME2 ... 
  SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
```

_See code: [src/commands/set-secret.ts](https://github.com/Giorgiosaud/github-automation/blob/v2.0.0/src/commands/set-secret.ts)_
<!-- commandsstop -->
