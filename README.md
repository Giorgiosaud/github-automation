github-automation
===============

Git automations Tools

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg?style=plastic)](https://oclif.io)
[![release](https://img.shields.io/github/release-date/giorgiosaud/github-automation?style=plastic)](https://github.com/Giorgiosaud/github-automation/)

[![Version](https://img.shields.io/npm/v/github-automation?style=plastic)](https://npmjs.org/package/github-automation)
[![Downloads/week](https://img.shields.io/npm/dw/github-automation)](https://npmjs.org/package/github-automation)
[![License](https://img.shields.io/npm/l/github-automation?style=plastic)](https://github.com/Giorgiosaud/github-automation/blob/master/package.json)
[![Size](https://img.shields.io/bundlephobia/minzip/github-automation?style=plastic)](https://bundlephobia.com/result?p=github-automation@1.0.1)
[![Issues](https://img.shields.io/github/issues/giorgiosaud/github-automation?style=plastic)](https://bundlephobia.com/result?p=github-automation@1.0.1)
<img alt="GitHub stars" src="https://img.shields.io/github/stars/giorgiosaud/github-automation?style=social">
<img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/giorgiosaud?style=social">
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
github-automation/1.0.0 darwin-x64 node-v12.13.1
$ github-automation --help [COMMAND]
USAGE
  $ github-automation COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`github-automation set-secret -r REPOS -n NAMES`](#github-automation-set-secret--r-repos--n-names)
* [`github-automation help [COMMAND]`](#github-automation-help-command)
* [`github-automation set-secret -r REPOS -n NAMES -x VALUES`](#github-automation-set-secret--r-repos--n-names--x-values)

## `github-automation set-secret -r REPOS -n NAMES`

Delete Secret from repo

```
USAGE
  $ github-automation set-secret -r REPOS -n NAMES

OPTIONS
  -h, --help                       show CLI help
  -n, --secret-name=secret-name    (required) Can be multiples secret names separated by space
  -r, --repositories=repositories  (required) Can be multiples repositories with shape OWNER/REPO separated by space

EXAMPLE

       $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn --secret-name SECRET_NAME1 
  SECRET_NAME2 ... SECRET_NAME_N
       $ github-automation delete-secret OWNER/REPO_NAME1 OWNER/REPO_NAME2 ... OWNER/REPO_NAMEn -n SECRET_NAME1 
  SECRET_NAME2 ... SECRET_NAME_N
```

_See code: [src/commands/delete-secret.ts](https://github.com/Giorgiosaud/github-automation/blob/v1.0.0/src/commands/delete-secret.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.0.0/src/commands/help.ts)_

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

       $ github-automation set-secret OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn --secret-name SECRET_NAME1 SECRET_NAME2 ... 
  SECRET_NAMEN --secret-value SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
       $ github-automation set-secret OWNER/NAME1 OWNER/NAME2 ... OWNER/NAMEn -n SECRET_NAME1 SECRET_NAME2 ... 
  SECRET_NAMEN -x SECRETVALUE1 SECRETVALUE2 ... SECRETVALUEN
```

_See code: [src/commands/set-secret.ts](https://github.com/Giorgiosaud/github-automation/blob/v1.0.0/src/commands/set-secret.ts)_
<!-- commandsstop -->
