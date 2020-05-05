git-automations
===============

Git automations Tools

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/git-automations.svg)](https://npmjs.org/package/git-automations)
[![Downloads/week](https://img.shields.io/npm/dw/git-automations.svg)](https://npmjs.org/package/git-automations)
[![License](https://img.shields.io/npm/l/git-automations.svg)](https://github.com/Giorgiosaud/git-automations/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g git-automations
$ git-automations COMMAND
running command...
$ git-automations (-v|--version|version)
git-automations/1.0.0 darwin-x64 node-v12.13.1
$ git-automations --help [COMMAND]
USAGE
  $ git-automations COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`git-automations hello [FILE]`](#git-automations-hello-file)
* [`git-automations help [COMMAND]`](#git-automations-help-command)

## `git-automations hello [FILE]`

describe the command here

```
USAGE
  $ git-automations hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ git-automations hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Giorgiosaud/git-automations/blob/v1.0.0/src/commands/hello.ts)_

## `git-automations help [COMMAND]`

display help for git-automations

```
USAGE
  $ git-automations help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
