github automation CLI interface
=================


oclif github-automation CLI:


[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Giorgiosaud_github-automation&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Giorgiosaud_github-automation)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Giorgiosaud_github-automation&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Giorgiosaud_github-automation)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Giorgiosaud_github-automation&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Giorgiosaud_github-automation)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Giorgiosaud_github-automation&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Giorgiosaud_github-automation)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Giorgiosaud_github-automation&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Giorgiosaud_github-automation)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Giorgiosaud_github-automation&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Giorgiosaud_github-automation)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Giorgiosaud_github-automation&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Giorgiosaud_github-automation)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Giorgiosaud_github-automation&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Giorgiosaud_github-automation)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Giorgiosaud_github-automation&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Giorgiosaud_github-automation)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Giorgiosaud_github-automation&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Giorgiosaud_github-automation)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Giorgiosaud_github-automation&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Giorgiosaud_github-automation)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
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
github-automation/5.1.11 linux-x64 node-v18.17.0
$ github-automation --help [COMMAND]
USAGE
  $ github-automation COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`github-automation help [COMMANDS]`](#github-automation-help-commands)
* [`github-automation list-org-repositories OWNER`](#github-automation-list-org-repositories-owner)
* [`github-automation mk-env -r REPOS -n NAMES -x VALUES`](#github-automation-mk-env--r-repos--n-names--x-values)
* [`github-automation mk-repo -o ORG -r REPOS`](#github-automation-mk-repo--o-org--r-repos)
* [`github-automation create-environment -r REPOS -n NAMES -x VALUES`](#github-automation-create-environment--r-repos--n-names--x-values)
* [`github-automation plugins`](#github-automation-plugins)
* [`github-automation plugins:install PLUGIN...`](#github-automation-pluginsinstall-plugin)
* [`github-automation plugins:inspect PLUGIN...`](#github-automation-pluginsinspect-plugin)
* [`github-automation plugins:install PLUGIN...`](#github-automation-pluginsinstall-plugin-1)
* [`github-automation plugins:link PLUGIN`](#github-automation-pluginslink-plugin)
* [`github-automation plugins:uninstall PLUGIN...`](#github-automation-pluginsuninstall-plugin)
* [`github-automation plugins:uninstall PLUGIN...`](#github-automation-pluginsuninstall-plugin-1)
* [`github-automation plugins:uninstall PLUGIN...`](#github-automation-pluginsuninstall-plugin-2)
* [`github-automation plugins update`](#github-automation-plugins-update)
* [`github-automation replace-in-files -r REPOS -n NAMES -x VALUES`](#github-automation-replace-in-files--r-repos--n-names--x-values)
* [`github-automation create-environment -r REPOS -n NAMES -x VALUES`](#github-automation-create-environment--r-repos--n-names--x-values-1)
* [`github-automation set-secret -r REPOS -n NAMES -x VALUES`](#github-automation-set-secret--r-repos--n-names--x-values)
* [`github-automation branch-protection-rules -r REPOS -n NAMES -x VALUES`](#github-automation-branch-protection-rules--r-repos--n-names--x-values)
* [`github-automation set-secret -e ENVIRONMENT -o OWNER  -r REPOS -s NAMES->VALUES`](#github-automation-set-secret--e-environment--o-owner---r-repos--s-names-values)
* [`github-automation set-vars -e ENV -r REPOS -o OWNER -v NAMES->VALUES`](#github-automation-set-vars--e-env--r-repos--o-owner--v-names-values)

## `github-automation help [COMMANDS]`

Display help for github-automation.

```
USAGE
  $ github-automation help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for github-automation.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.12/src/commands/help.ts)_

## `github-automation list-org-repositories OWNER`

List Org Repositories if have access

```
USAGE
  $ github-automation list-org-repositories OWNER

FLAGS
  -p, --page=<value>  [default: 1] page number

DESCRIPTION
  List Org Repositories if have access

EXAMPLES
      $ github-automation ls OWNER
```

_See code: [dist/commands/ls/index.ts](https://github.com/Giorgiosaud/github-automation/blob/v5.1.10/dist/commands/ls/index.ts)_

## `github-automation mk-env -r REPOS -n NAMES -x VALUES`

Create environments if not exist

```
USAGE
  $ github-automation mk-env -r REPOS -n NAMES -x VALUES

FLAGS
  -e, --environments=<value>...  (required) If is set the env should be activated in the specified environment and
                                 create it if not exist
  -h, --help                     Show CLI help.
  -o, --organization=<value>     (required) A single string containing the organization name
  -r, --repositories=<value>...  (required) Can be multiples repositories names

DESCRIPTION
  Create environments if not exist

EXAMPLES
      you must have a personal github token to set the first time that uses this tool
      $ github-automation mk-env --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
      $ github-automation mk-env -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
```

_See code: [dist/commands/mk-env/index.ts](https://github.com/Giorgiosaud/github-automation/blob/v5.1.10/dist/commands/mk-env/index.ts)_

## `github-automation mk-repo -o ORG -r REPOS`

Create repos

```
USAGE
  $ github-automation mk-repo -o ORG -r REPOS

FLAGS
  -h, --help                     Show CLI help.
  -o, --organization=<value>     (required) A single string containing the organization name
  -r, --repositories=<value>...  (required) Can be multiples repositories names

DESCRIPTION
  Create repos

EXAMPLES
      you must have a personal github token to set the first time that uses this tool
      $ github-automation mk-repo --organization OWNER --repositories NAME1 NAME2 ... NAMEn  
      $ github-automation mk-repo -o Owner -r NAME1 NAME2 ... NAMEn
```

_See code: [dist/commands/mk-repo/index.ts](https://github.com/Giorgiosaud/github-automation/blob/v5.1.10/dist/commands/mk-repo/index.ts)_

## `github-automation create-environment -r REPOS -n NAMES -x VALUES`

Remove environments if exist

```
USAGE
  $ github-automation create-environment -r REPOS -n NAMES -x VALUES

FLAGS
  -b, --branchNaming=<value>     (required) branchfrom:branchto
  -h, --help                     Show CLI help.
  -o, --organization=<value>     (required) A single string containing the organization name
  -r, --repositories=<value>...  (required) Can be multiples repositories names

DESCRIPTION
  Remove environments if exist

EXAMPLES
      you must have a personal github token to set the first time that uses this tool
      $ github-automation rm-env --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
      $ github-automation rm-env -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
```

_See code: [dist/commands/mv-branch/index.ts](https://github.com/Giorgiosaud/github-automation/blob/v5.1.10/dist/commands/mv-branch/index.ts)_

## `github-automation plugins`

List installed plugins.

```
USAGE
  $ github-automation plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ github-automation plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.1.6/src/commands/plugins/index.ts)_

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

GLOBAL FLAGS
  --json  Format output as json.

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

## `github-automation replace-in-files -r REPOS -n NAMES -x VALUES`

Create environments if not exist

```
USAGE
  $ github-automation replace-in-files -r REPOS -n NAMES -x VALUES

FLAGS
  -b, --branch=<value>           [default: main] Branch
  -e, --email=<value>            [default: jsaud@modyo.com] Commiter Email
  -f, --from=<value>             (required) string to replace
  -h, --help                     Show CLI help.
  -m, --message=<value>          [default: Replace in file] Commit Message
  -n, --name=<value>             [default: Jorge Saud] Commiter Name
  -o, --organization=<value>     (required) A single string containing the organization name
  -p, --paths=<value>...         (required) paths of files
  -r, --repositories=<value>...  (required) Can be multiples repositories names
  -t, --to=<value>               (required) string to replace

DESCRIPTION
  Create environments if not exist

EXAMPLES
      you must have a personal github token to set the first time that uses this tool
      $ github-automation replace-in-files --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
      $ github-automation replace-in-files -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
```

_See code: [dist/commands/replace-in-files/index.ts](https://github.com/Giorgiosaud/github-automation/blob/v5.1.10/dist/commands/replace-in-files/index.ts)_

## `github-automation create-environment -r REPOS -n NAMES -x VALUES`

Remove environments if exist

```
USAGE
  $ github-automation create-environment -r REPOS -n NAMES -x VALUES

FLAGS
  -e, --environments=<value>...  (required) If is set the env should be activated in the specified environment and
                                 create it if not exist
  -h, --help                     Show CLI help.
  -o, --organization=<value>     (required) A single string containing the organization name
  -r, --repositories=<value>...  (required) Can be multiples repositories names

DESCRIPTION
  Remove environments if exist

EXAMPLES
      you must have a personal github token to set the first time that uses this tool
      $ github-automation rm-env --organization OWNER --repositories OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
      $ github-automation rm-env -o Owner -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --environments ENVIRONMENTA ENVIRONMENTB
```

_See code: [dist/commands/rm-env/index.ts](https://github.com/Giorgiosaud/github-automation/blob/v5.1.10/dist/commands/rm-env/index.ts)_

## `github-automation set-secret -r REPOS -n NAMES -x VALUES`

Rempve Secrets

```
USAGE
  $ github-automation set-secret -r REPOS -n NAMES -x VALUES

FLAGS
  -e, --environment=<value>      If is set the env should be activated in the specified environment and create it if not
                                 exist
  -h, --help                     Show CLI help.
  -o, --organization=<value>     (required) A single string containing the organization name
  -r, --repositories=<value>...  (required) Can be multiples repositories names
  -s, --secrets=<value>...       (required) Can be multiples secret names separated by space

DESCRIPTION
  Rempve Secrets

EXAMPLES
      you must have a personal github token to set the first time that uses this tool
      $ github-automation set-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --secrets SECRET_NAME1:SECRET_VALUE_1 SECRET_NAME2:SECRET_VALUE_2 ... SECRET_NAMEN:SECRET_VALUE_N
      $ github-automation set-secret -r OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn -s SECRET_NAME1:SECRET_VALUE_1 SECRET_NAME2 ... SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2:SECRET_VALUE_2 ... SECRETVALUEN:SECRET_VALUE_N
```

_See code: [dist/commands/rm-secrets/index.ts](https://github.com/Giorgiosaud/github-automation/blob/v5.1.10/dist/commands/rm-secrets/index.ts)_

## `github-automation branch-protection-rules -r REPOS -n NAMES -x VALUES`

Set Protected Branches and rules

```
USAGE
  $ github-automation branch-protection-rules -r REPOS -n NAMES -x VALUES

FLAGS
  -b, --branches=<value>...      (required) Can be multiples repositories branches
  -h, --help                     Show CLI help.
  -l, --likes=<value>            (required) [default: 2] Likes required in pr
  -o, --organization=<value>     (required) A single string containing the organization name
  -r, --repositories=<value>...  (required) Can be multiples repositories names

DESCRIPTION
  Set Protected Branches and rules

EXAMPLES
      you must have a personal github token to set the first time that uses this tool
      $ github-automation branch-protection-rules -r NAME1 NAME2 ... NAMEn -o ORG --secret-name SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN --secret-value SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
      $ github-automation branch-protection-rules -r NAME1 NAME2 ... NAMEn -o ORG -n SECRET_NAME1 SECRET_NAME2 ... SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
```

_See code: [dist/commands/set-protection-rules/index.ts](https://github.com/Giorgiosaud/github-automation/blob/v5.1.10/dist/commands/set-protection-rules/index.ts)_

## `github-automation set-secret -e ENVIRONMENT -o OWNER  -r REPOS -s NAMES->VALUES`

Set Secrets in repo from org

```
USAGE
  $ github-automation set-secret -e ENVIRONMENT -o OWNER  -r REPOS -s NAMES->VALUES

FLAGS
  -e, --environment=<value>      If is set the env should be activated in the specified environment and create it if not
                                 exist
  -f, --forced                   If is set the env should be activated in the specified environment and create it if not
                                 exist
  -h, --help                     Show CLI help.
  -o, --organization=<value>     (required) A single string containing the organization name
  -r, --repositories=<value>...  (required) Can be multiples repositories names
  -s, --secrets=<value>...       (required) Can be multiples variable names separated by -> ej: name->variable

DESCRIPTION
  Set Secrets in repo from org

EXAMPLES
      you must have a personal github token to set the first time that uses this tool
      $ github-automation set-secret --owner OWNER --repositories NAME1 NAME2 ... NAMEN --secrets NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
      $ github-automation set-secret --environment ENVIRONMENT --owner OWNER --repositories NAME1 NAME2 ... NAMEN --secrets NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
      $ github-automation set-secret -o OWNER -r NAME1 NAME2 ... NAMEN -s NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
      $ github-automation set-secret -e ENVIRONMENT -o OWNER -r NAME1 NAME2 ... NAMEN -s NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
```

_See code: [dist/commands/set-secrets/index.ts](https://github.com/Giorgiosaud/github-automation/blob/v5.1.10/dist/commands/set-secrets/index.ts)_

## `github-automation set-vars -e ENV -r REPOS -o OWNER -v NAMES->VALUES`

Set Variables in repo from org

```
USAGE
  $ github-automation set-vars -e ENV -r REPOS -o OWNER -v NAMES->VALUES

FLAGS
  -e, --environment=<value>      If is set the env should be activated in the specified environment and create it if not
                                 exist
  -f, --forced                   If is set the env should be activated in the specified environment and create it if not
                                 exist
  -h, --help                     Show CLI help.
  -o, --organization=<value>     (required) A single string containing the organization name
  -r, --repositories=<value>...  (required) Can be multiples repositories names
  -v, --variables=<value>...     (required) Can be multiples variable names separated by -> ej: name->variable

DESCRIPTION
  Set Variables in repo from org

EXAMPLES
      you must have a personal github token to set the first time that uses this tool
      $ github-automation set-vars --owner OWNER --repositories NAME1 NAME2 ... NAMEN --variables NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
      $ github-automation set-vars --environment ENVIRONMENT --owner OWNER --repositories NAME1 NAME2 ... NAMEN --variables NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
      $ github-automation set-vars -o OWNER -r NAME1 NAME2 ... NAMEN -v NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
      $ github-automation set-vars -e ENVIRONMENT -o OWNER -r NAME1 NAME2 ... NAMEN -v NAME_1->SECRET_1 NAME_2->SECRET_2 ... NAME_N->SECRET_N
```

_See code: [dist/commands/set-vars/index.ts](https://github.com/Giorgiosaud/github-automation/blob/v5.1.10/dist/commands/set-vars/index.ts)_
<!-- commandsstop -->
