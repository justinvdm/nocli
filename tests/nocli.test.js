'use strict';
let assert = require('assert');
let exec = require('shelljs').exec;


function fix(name) {
  return `${__dirname}/fixtures/${name}`;
}


function run(args) {
  let cmd = `${__dirname}/../nocli.js ${args}`;
  return exec(cmd, {silent: true}).output.trim();
}


describe(`nocli`, () => {
  it(`should support cli options`, () => {
    let result = run(`--foo bar --baz 23 ${fix('simple.js')}`);

    assert.deepEqual(result, JSON.stringify({
      foo: 'bar',
      baz: 23
    }));
  });

  it(`should support reading from a yaml config file`, () => {
    let result = run(`-c ${fix('simple.yml')} ${fix('simple.js')}`);

    assert.deepEqual(result, JSON.stringify({
      foo: ['bar', 'baz']
    }));
  });
});
