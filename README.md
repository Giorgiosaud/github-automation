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
github-automation/5.1.8 linux-x64 node-v18.16.1
$ github-automation --help [COMMAND]
USAGE
  $ github-automation COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`github-automation help [COMMANDS]`](#github-automation-help-commands)
* [`github-automation plugins`](#github-automation-plugins)
* [`github-automation plugins:install PLUGIN...`](#github-automation-pluginsinstall-plugin)
* [`github-automation plugins:inspect PLUGIN...`](#github-automation-pluginsinspect-plugin)
* [`github-automation plugins:install PLUGIN...`](#github-automation-pluginsinstall-plugin-1)
* [`github-automation plugins:link PLUGIN`](#github-automation-pluginslink-plugin)
* [`github-automation plugins:uninstall PLUGIN...`](#github-automation-pluginsuninstall-plugin)
* [`github-automation plugins:uninstall PLUGIN...`](#github-automation-pluginsuninstall-plugin-1)
* [`github-automation plugins:uninstall PLUGIN...`](#github-automation-pluginsuninstall-plugin-2)
* [`github-automation plugins update`](#github-automation-plugins-update)

## `github-automation help [COMMANDS]`

Display help for github-automation

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
<!-- commandsstop -->
