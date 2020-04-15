#!/usr/bin/env node
import clear from 'clear';
import figlet from 'figlet';
import prog from 'caporal';
import setSecret from'./commands/setSecret'
import deleteSecret from './commands/deleteSecret';

prog
.version("1.0.0")
.description("github automator")
.command('set-secret', 'Get a Widget from catalog')
.argument('[repositories...]', 'name of repositories to add secret', prog.ARRAY)
.option('--secret-name <secret-name>', 'name of secret', prog.STRING)
.option('--secret-value <secret-value>', 'value of secret', prog.STRING)
.action((args, options) => {
  clear();
  console.log(figlet.textSync('Giorgiosaud', {
    font: '4Max',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }));
  setSecret(args,options)
})
.command('delete-secret', 'Get a Widget from catalog')
.argument('[repositories...]', 'name of repositories to add secret', prog.ARRAY)
.option('--secret-name <secret-name>', 'name of secret', prog.STRING)
.action((args, options) => {
  clear();
  console.log(figlet.textSync('Giorgiosaud', {
    font: '4Max',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }));
  deleteSecret(args,options)
})

prog.parse(process.argv)
