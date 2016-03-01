#!/usr/bin/node
'use strict';
let cli = require('yargs');
let yaml = require('js-yaml').safeLoad;
let open = require('fs').readFileSync;
let _ = require('lodash');
let extend = _.extend;
let omit = _.omit;
let relative = require('require-relative');


let args = cli
  .usage('Usage: $0 [options] module')
  .help('help')
  .demand(1)
  .option('c', {describe: 'read options from yaml config file'})
  .argv;


let opts = {};
if (args.c) extend(opts, yaml(open(args.c)));
extend(opts, omit(args, 'c', '_', 'help', '$0', 'nocli.js'));

relative(args._[0], process.cwd())(opts);
