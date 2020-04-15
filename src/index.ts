#!/usr/bin/env node
const clear = require('clear');
const figlet = require('figlet');
const prog = require('caporal')
const packageDetails = require('../package.json')
import setSecret from'./commands/setSecret'
import {setSecretOptions,setSecretArguments} from './intefaces/setSecret';
import { deleteSecretArguments, deleteSecretOptions } from './intefaces/deleteSecret';
import deleteSecret from './commands/deleteSecret';

prog
.version(packageDetails.version)
.description(packageDetails.description)
.command('set-secret', 'Get a Widget from catalog')
.argument('[repositories...]', 'name of repositories to add secret', prog.Array)
.option('--secret-name <secret-name>', 'name of secret', prog.STRING)
.option('--secret-value <secret-value>', 'value of secret', prog.STRING)
.action((args:setSecretArguments, options:setSecretOptions):void => {
  clear();
  console.log(figlet.textSync('Giorgiosaud', {
    font: 'contessa',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }));
  setSecret(args,options)
})
.command('delete-secret', 'Get a Widget from catalog')
.argument('[repositories...]', 'name of repositories to add secret', prog.Array)
.option('--secret-name <secret-name>', 'name of secret', prog.STRING)
.action((args:deleteSecretArguments, options:deleteSecretOptions):void => {
  clear();
  console.log(figlet.textSync('Giorgiosaud', {
    font: 'larry3d',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }));
  deleteSecret(args,options)
})

prog.parse(process.argv)
