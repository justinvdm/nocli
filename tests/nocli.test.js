const test = require('ava')
const exec = require('shelljs').exec

function fix(name) {
  return `${__dirname}/fixtures/${name}`
}

function run(args) {
  const cmd = `${__dirname}/../nocli.js ${args}`
  return exec(cmd, { silent: true }).trim()
}

test('cli args support', t => {
  const result = run(`--foo bar --baz 23 ${fix('simple.js')}`)

  t.deepEqual(JSON.parse(result), {
    foo: 'bar',
    baz: 23
  })
})

test('yaml config file support', t => {
  const result = run(`--config ${fix('simple.yml')} ${fix('simple.js')}`)

  t.deepEqual(JSON.parse(result), {
    foo: ['bar', 'baz']
  })
})

test('yaml config file support with -c shorthand', t => {
  const result = run(`-c ${fix('simple.yml')} ${fix('simple.js')}`)

  t.deepEqual(JSON.parse(result), {
    foo: ['bar', 'baz']
  })
})
