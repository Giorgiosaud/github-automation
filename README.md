github automation CLI interface.
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
[![Version](https://img.shields.io/npm/v/github-automation.svg)](https://npmjs.org/package/github-automation)
[![Downloads/week](https://img.shields.io/npm/dw/github-automation.svg)](https://npmjs.org/package/github-automation)
[![License](https://img.shields.io/npm/l/github-automation.svg)](https://github.com/giorgiosaud/github-automation/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g base
$ base COMMAND
running command...
$ base (--version)
base/0.0.0 darwin-arm64 node-v24.8.0
$ base --help [COMMAND]
USAGE
  $ base COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`base hello PERSON`](#base-hello-person)
* [`base hello world`](#base-hello-world)
* [`base help [COMMAND]`](#base-help-command)
* [`base plugins`](#base-plugins)
* [`base plugins add PLUGIN`](#base-plugins-add-plugin)
* [`base plugins:inspect PLUGIN...`](#base-pluginsinspect-plugin)
* [`base plugins install PLUGIN`](#base-plugins-install-plugin)
* [`base plugins link PATH`](#base-plugins-link-path)
* [`base plugins remove [PLUGIN]`](#base-plugins-remove-plugin)
* [`base plugins reset`](#base-plugins-reset)
* [`base plugins uninstall [PLUGIN]`](#base-plugins-uninstall-plugin)
* [`base plugins unlink [PLUGIN]`](#base-plugins-unlink-plugin)
* [`base plugins update`](#base-plugins-update)

## `base hello PERSON`

Say hello

```
USAGE
  $ base hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ base hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/Giorgiosaud/base/blob/v0.0.0/src/commands/hello/index.ts)_

## `base hello world`

Say hello world

```
USAGE
  $ base hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ base hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/Giorgiosaud/base/blob/v0.0.0/src/commands/hello/world.ts)_

## `base help [COMMAND]`

Display help for base.

```
USAGE
  $ base help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for base.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.33/src/commands/help.ts)_

## `base plugins`

List installed plugins.

```
USAGE
  $ base plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ base plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/index.ts)_

## `base plugins add PLUGIN`

Installs a plugin into base.

```
USAGE
  $ base plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into base.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the BASE_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the BASE_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ base plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ base plugins add myplugin

  Install a plugin from a github url.

    $ base plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ base plugins add someuser/someplugin
```

## `base plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ base plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ base plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/inspect.ts)_

## `base plugins install PLUGIN`

Installs a plugin into base.

```
USAGE
  $ base plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into base.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the BASE_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the BASE_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ base plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ base plugins install myplugin

  Install a plugin from a github url.

    $ base plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ base plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/install.ts)_

## `base plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ base plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ base plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/link.ts)_

## `base plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ base plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ base plugins unlink
  $ base plugins remove

EXAMPLES
  $ base plugins remove myplugin
```

## `base plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ base plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/reset.ts)_

## `base plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ base plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ base plugins unlink
  $ base plugins remove

EXAMPLES
  $ base plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/uninstall.ts)_

## `base plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ base plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ base plugins unlink
  $ base plugins remove

EXAMPLES
  $ base plugins unlink myplugin
```

## `base plugins update`

Update installed plugins.

```
USAGE
  $ base plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/update.ts)_
<!-- commandsstop -->
