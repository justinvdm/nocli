#!/usr/bin/env node
const cli = require('yargs')
const yaml = require('js-yaml').safeLoad
const read = require('fs').readFileSync
const resolve = require('path').resolve

const args = cli
  .usage('Usage: $0 [options] module')
  .help('help')
  .demand(1)
  .option('config', {
    alias: 'c',
    describe: 'read options from yaml config file'
  }).argv

const opts = {
  ...(args.config && yaml(read(args.c))),
  ...parseArgs()
}

if (require.main === module) {
  require(resolve(process.cwd(), args._[0]))(opts)
}

function parseArgs() {
  const result = { ...args }
  delete result.config
  delete result.c
  delete result._
  delete result.config
  delete result.help
  delete result.$0
  return result
}

module.exports = opts
