oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

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
$ github-automation (--version)
github-automation/3.1.1 darwin-x64 node-v16.15.1
$ github-automation --help [COMMAND]
USAGE
  $ github-automation COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`github-automation branch-protection-rules -r REPOS -n NAMES -x VALUES`](#github-automation-branch-protection-rules--r-repos--n-names--x-values)
* [`github-automation 
  collaborators -r GITHUBREPOS… -u GITHUBUSERS… -p [pull,push,admin,maintain,triage]
  collaborators -r GITHUBREPOS… -u GITHUBUSERS… --delete
  `](#github-automation---collaborators--r-githubrepos--u-githubusers--p-pullpushadminmaintaintriage--collaborators--r-githubrepos--u-githubusers---delete--)
* [`github-automation delete-secret -r REPOS -n NAMES`](#github-automation-delete-secret--r-repos--n-names)
* [`github-automation help [COMMAND]`](#github-automation-help-command)
* [`github-automation list-org-repositories OWNER`](#github-automation-list-org-repositories-owner)
* [`github-automation plugins`](#github-automation-plugins)
* [`github-automation plugins:install PLUGIN...`](#github-automation-pluginsinstall-plugin)
* [`github-automation plugins:inspect PLUGIN...`](#github-automation-pluginsinspect-plugin)
* [`github-automation plugins:install PLUGIN...`](#github-automation-pluginsinstall-plugin-1)
* [`github-automation plugins:link PLUGIN`](#github-automation-pluginslink-plugin)
* [`github-automation plugins:uninstall PLUGIN...`](#github-automation-pluginsuninstall-plugin)
* [`github-automation plugins:uninstall PLUGIN...`](#github-automation-pluginsuninstall-plugin-1)
* [`github-automation plugins:uninstall PLUGIN...`](#github-automation-pluginsuninstall-plugin-2)
* [`github-automation plugins update`](#github-automation-plugins-update)
* [`github-automation repos-with-secret OWNER`](#github-automation-repos-with-secret-owner)
* [`github-automation set-secret -r REPOS -n NAMES -x VALUES`](#github-automation-set-secret--r-repos--n-names--x-values)

## `github-automation branch-protection-rules -r REPOS -n NAMES -x VALUES`

describe the command here

```
USAGE
  $ github-automation branch-protection-rules -r REPOS -n NAMES -x VALUES

FLAGS
  -b, --branches=<value>...      (required) Can be multiples repositories branches
  -h, --help                     Show CLI help.
  -o, --organization=<value>     (required) A single string containing the organization name
  -r, --repositories=<value>...  (required) Can be multiples repositories names

DESCRIPTION
  describe the command here

EXAMPLES
      you must have a personal github token to set the first time that uses this tool
      $ github-automation branch-protection-rules -r NAME1 NAME2 ... NAMEn -o ORG --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN --secret-value SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
      $ github-automation branch-protection-rules -r NAME1 NAME2 ... NAMEn -o ORG -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
```

_See code: [dist/commands/branch-protection-rules/index.ts](https://github.com/Giorgiosaud/hello-world/blob/v3.1.1/dist/commands/branch-protection-rules/index.ts)_

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

FLAGS
  -d, --delete                                         delete user permission
  -h, --help                                           Show CLI help.
  -p, --permissions=(pull|push|admin|maintain|triage)  [default: push] Select Permission to add
  -r, --repositories=<value>...                        (required) Can be multiples repositories with shape OWNER/REPO
                                                       separated by space
  -u, --github-users=<value>...                        (required) Can be multiples users

DESCRIPTION
  Manage Repo collaborators

EXAMPLES
      you must have a personal github token to set the first time that uses this tool
      $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAME_N
      $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAME_N
```

_See code: [dist/commands/collaborators/index.ts](https://github.com/Giorgiosaud/hello-world/blob/v3.1.1/dist/commands/collaborators/index.ts)_

## `github-automation delete-secret -r REPOS -n NAMES`

Delete Secret from repo

```
USAGE
  $ github-automation delete-secret -r REPOS -n NAMES

FLAGS
  -n, --secret-name=<value>...   (required) Can be multiples secret names separated by space
  -r, --repositories=<value>...  (required) Can be multiples repositories with shape OWNER/REPO separated by space

DESCRIPTION
  Delete Secret from repo

EXAMPLES
      $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAME_N
      $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAME_N
```

_See code: [dist/commands/delete-secret/index.ts](https://github.com/Giorgiosaud/hello-world/blob/v3.1.1/dist/commands/delete-secret/index.ts)_

## `github-automation help [COMMAND]`

Display help for github-automation.

```
USAGE
  $ github-automation help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for github-automation.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `github-automation list-org-repositories OWNER`

List Org Repositories if have access

```
USAGE
  $ github-automation list-org-repositories OWNER

FLAGS
  -f, --filter=<value>  filter by name contains

DESCRIPTION
  List Org Repositories if have access

EXAMPLES
      $ github-automation list-org-repositories OWNER
```

_See code: [dist/commands/list-org-repositories/index.ts](https://github.com/Giorgiosaud/hello-world/blob/v3.1.1/dist/commands/list-org-repositories/index.ts)_

## `github-automation plugins`

List installed plugins.

```
USAGE
  $ github-automation plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ github-automation plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/index.ts)_

## `github-automation plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ github-automation plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ github-automation plugins add

EXAMPLES
  $ github-automation plugins:install myplugin 

  $ github-automation plugins:install https://github.com/someuser/someplugin

  $ github-automation plugins:install someuser/someplugin
```

## `github-automation plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ github-automation plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ github-automation plugins:inspect myplugin
```

## `github-automation plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ github-automation plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ github-automation plugins add

EXAMPLES
  $ github-automation plugins:install myplugin 

  $ github-automation plugins:install https://github.com/someuser/someplugin

  $ github-automation plugins:install someuser/someplugin
```

## `github-automation plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ github-automation plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ github-automation plugins:link myplugin
```

## `github-automation plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ github-automation plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ github-automation plugins unlink
  $ github-automation plugins remove
```

## `github-automation plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ github-automation plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ github-automation plugins unlink
  $ github-automation plugins remove
```

## `github-automation plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ github-automation plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ github-automation plugins unlink
  $ github-automation plugins remove
```

## `github-automation plugins update`

Update installed plugins.

```
USAGE
  $ github-automation plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `github-automation repos-with-secret OWNER`

List Org Repositories if have access

```
USAGE
  $ github-automation repos-with-secret OWNER

DESCRIPTION
  List Org Repositories if have access

EXAMPLES
      $ github-automation repos-with-secret OWNER
```

_See code: [dist/commands/repos-with-secret/index.ts](https://github.com/Giorgiosaud/hello-world/blob/v3.1.1/dist/commands/repos-with-secret/index.ts)_

## `github-automation set-secret -r REPOS -n NAMES -x VALUES`

describe the command here

```
USAGE
  $ github-automation set-secret -r REPOS -n NAMES -x VALUES

FLAGS
  -h, --help                     Show CLI help.
  -n, --secret-name=<value>...   (required) Can be multiples secret names separated by space
  -o, --organization=<value>     (required) A single string containing the organization name
  -r, --repositories=<value>...  (required) Can be multiples repositories names
  -x, --secret-value=<value>...  (required) Can be multiples secret values separated by space

DESCRIPTION
  describe the command here

EXAMPLES
      you must have a personal github token to set the first time that uses this tool
      $ github-automation set-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN --secret-value SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
      $ github-automation set-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
```

_See code: [dist/commands/set-secret/index.ts](https://github.com/Giorgiosaud/hello-world/blob/v3.1.1/dist/commands/set-secret/index.ts)_
<!-- commandsstop -->
