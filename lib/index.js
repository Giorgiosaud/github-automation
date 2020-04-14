#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clear = require('clear');
var figlet = require('figlet');
var prog = require('caporal');
var packageDetails = require('../package.json');
var setSecret_1 = __importDefault(require("./commands/setSecret"));
var deleteSecret_1 = __importDefault(require("./commands/deleteSecret"));
prog
    .version(packageDetails.version)
    .command('set-secret', 'Get a Widget from catalog')
    .argument('[repositories...]', 'name of repositories to add secret', prog.Array)
    .option('--secret-name <secret-name>', 'name of secret', prog.STRING)
    .option('--secret-value <secret-value>', 'value of secret', prog.STRING)
    .action(function (args, options) {
    clear();
    console.log(figlet.textSync('Setting secrets in repos', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }));
    setSecret_1.default(args, options);
})
    .command('delete-secret', 'Get a Widget from catalog')
    .argument('[repositories...]', 'name of repositories to add secret', prog.Array)
    .option('--secret-name <secret-name>', 'name of secret', prog.STRING)
    .action(function (args, options) {
    clear();
    console.log(figlet.textSync('Deleting secrets in repos', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }));
    deleteSecret_1.default(args, options);
});
prog.parse(process.argv);
